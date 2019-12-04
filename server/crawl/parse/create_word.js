const Promise = require('bluebird');
const ParseBase = require('../services/parse');
const Parse = new ParseBase();
const words = require('../../../static/course/lesson_6000_vocabulary.json');
module.exports = {
    createWord: function (courseObjId) {
        // console.log(words);
        let courseQuery = Parse.createQuery('Course');
        courseQuery.equalTo('objId', courseObjId);
        // return courseQuery.first({ useMasterKey: true }).then(courseObj => {
        //     if (!courseObj) return Promise.reject({ msg: 'course not found' });
        let lessonQuery = Parse.createQuery('Lesson');
        // lessonQuery.equalTo('course', courseObj);
        lessonQuery.matchesQuery('course', courseQuery);
        lessonQuery.limit(10000);
        return lessonQuery.find({ useMasterKey: true }).then(lessons => {
            let WordParseSavePromise = [];
            let lessonObj = {};
            lessons.forEach(item => {
                lessonObj[item.get('objId')] = item;
            });
            words.forEach(lesson => {
                let wordParseObjList = [];
                let lessonParseObj = lessonObj[lesson.id];
                lesson.words.forEach(wordItem => {
                    wordParseObjList.push(Parse.create('Word', {
                        objId: wordItem.id,
                        textEN: wordItem.textEN,
                        textVN: wordItem.textVN,
                        voiceEN: wordItem.voiceEN,
                        transcript: wordItem.transcript,
                        wordClass: wordItem.wordClass,
                        example: wordItem.example,
                        lesson: lessonParseObj
                    }, true));
                });
                WordParseSavePromise.push(Parse.saveAll(wordParseObjList));
            });
            return Promise.all(WordParseSavePromise);
        }).catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
        // }).catch(err => {
        //     console.log(err);
        //     return Promise.reject(err);
        // });
    }
}