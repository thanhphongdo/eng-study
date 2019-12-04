const Promise = require('bluebird');
const ParseBase = require('../services/parse');
const Parse = new ParseBase();
const listCourse = [
    {
        id: 'word_6000',
        title: '6000 từ vựng tiếng anh',
        thumbnail: '/course/word_6000/word_6000.png',
        url: '/course/word_6000/'
    },
    {
        id: 'word_1000',
        title: '1000 từ vựng tiếng anh',
        thumbnail: '/course/word_1000/word_1000.png',
        url: '/course/word_1000/'
    }
];

module.exports = {
    createCourse: function () {
        let courseListParseObj = []
        listCourse.forEach(item => {
            courseListParseObj.push(Parse.create('Course', {
                objId: item.id,
                title: item.title,
                thumbnail: item.thumbnail
            }, true));
        });
        return Parse.saveAll(courseListParseObj).then(objs => {
            console.log(objs);
            return objs;
        }).catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
    }
}