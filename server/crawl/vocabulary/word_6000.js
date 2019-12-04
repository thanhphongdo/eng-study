const Load = require('../services/load');
const Promise = require('bluebird');
const Model = require('../model/index');
const fs = require('fs');
module.exports = class Word6000 {
    constructor() {
        let self = this;
        this.url = 'https://www.tienganh123.com/6000-tu-tieng-anh-thong-dung';
        this.loader = new Load();
    }
    getAllLesson() {
        let self = this;
        return this.loader.load(this.url).then($ => {
            let allLesson = [];
            let getAllLessonOfPagePromise = [];
            $('.lng_pagi').find('a').each((index, item) => {
                // if (index == 8)
                getAllLessonOfPagePromise.push(self.getAllLessonOfPage($(item).attr('href'), index * 20));
            });
            return Promise.all(getAllLessonOfPagePromise).then(data => {
                data.forEach(item => {
                    allLesson = allLesson.concat(item);
                });
                return allLesson;
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    getAllLessonOfPage(url, fromIndex) {
        let self = this;
        return this.loader.load(url).then($ => {
            let lessons = [];
            $('.tca_item').each((index, item) => {
                lessons.push(
                    new Model.Lesson({
                        id: fromIndex + index + 1,
                        title: $(item).find('.tcb2_item_te').text().trim(),
                        thumbnail: $(item).find('img').attr('src'),
                        link: $(item).parent().attr('href')
                    })
                );
            });
            let getLessonDetailPromise = [];
            lessons.forEach((item, index) => {
                getLessonDetailPromise.push(self.getLessonDetail(item.link, fromIndex + index + 1));
            });
            return Promise.all(getLessonDetailPromise).then(wordList => {
                lessons.map((item, index) => {
                    item.words = wordList[index];
                    return item;
                });
                return lessons;
            }).catch(err => {
                return Promise.reject(err);
            })
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    getExampleSentenceVI(url, lessonIndex) {
        let funcCode = '';
        return this.loader.loadResponse(url).then(code => {
            // if (lessonIndex == 172) {
            //     console.log(111);
            // }
            code = code.replace(/= \"/g, "= `").replace(/\"\;/g, "`;");
            let varName = 'dich' + lessonIndex;
            funcCode = `(function(){${code} return ${varName}})()`.replace(/\s+/g, ' ');
            let textVNList = eval(`(function(){${code} return ${varName}})()`);
            return textVNList;
        }).catch(err => {
            console.log(funcCode);
            console.log(url);
            return Promise.reject(err);
        });
    }
    getLessonDetail(url, lessonIndex) {
        return this.loader.load(url).then($ => {
            let exampleSentenceVIUrl = `https://noidung.tienganh123.com/file/baihoc/vocabulary/6000/bai${lessonIndex}/bai_${lessonIndex}.js`;
            return this.getExampleSentenceVI(exampleSentenceVIUrl, lessonIndex).then(textVNList => {
                let words = [];
                let countExample = 0;
                $('.vcab_content').first().find('table').first().find('tr').each((wordIndex, item) => {
                    if (wordIndex > 0) {
                        let word = new Model.Word({
                            id: `${lessonIndex}_${wordIndex}`,
                            textEN: $(item).children().eq(1).text().trim(),
                            textVN: $(item).children().eq(5).text().trim(),
                            voiceEN: $(item).children().eq(4).find('.uba_audioButton').attr('media-url'),
                            transcript: $(item).children().eq(2).text().trim(),
                            wordClass: $(item).children().eq(3).find('.vcab_show_box').text().trim().replace(/\n/g, '').replace(/\t/g, '')
                        });
                        let line = $('.vocab_examples').find('table').eq(wordIndex - 1).find('tr');
                        line.each((exIndex, item) => {
                            let lastTD = $(item).find('td').last();
                            let textEN = lastTD.text().trim().replace(/\s+/g, ' ');
                            if (textEN) {
                                let voiceEN = lastTD.find('.uba_audioButton').first().attr('media-url');
                                word.example.push(new Model.Sentence({
                                    id: `${lessonIndex}_${wordIndex}_${exIndex}`,
                                    textEN: textEN,
                                    textVN: textVNList[countExample],
                                    voiceEN: voiceEN,
                                }));
                                countExample++;
                            }
                        });
                        words.push(word);
                    }
                });
                return words;
            }).catch(err => {
                return Promise.reject(err);
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    getData() {
        let self = this;
        return this.getAllLesson().then(lesson => {
            // fs.writeFileSync(
            //     'static/course/lesson_6000_vocabulary.json',
            //     JSON.stringify(lesson).replace(/\s+/g, ' ').replace(/-\s/g, '')
            // );
            let lessonIndexData = {
                count: lesson.length,
                lesson: []
            };
            lesson.forEach(item => {
                lessonIndexData.lesson.push({
                    id: item.id,
                    title: item.title,
                    thumbnail: item.thumbnail,
                    dataUrl: `data/word_6000/lesson_${item.id}.json`
                });
                fs.writeFileSync(
                    `static/course/word_6000/lesson_${item.id}.json`,
                    JSON.stringify(item).replace(/\s+/g, ' ').replace(/-\s/g, '')
                );
            });
            fs.writeFileSync(
                `static/course/word_6000/index.json`,
                JSON.stringify(lessonIndexData)
            );
            return lesson;
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}