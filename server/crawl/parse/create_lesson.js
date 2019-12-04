const Promise = require('bluebird');
const ParseBase = require('../services/parse');
const Parse = new ParseBase();
const lesson = require('../../../static/course/word_6000/index.json').lesson;
// import someObject from ('../../../static/course/word_6000/index.json')
module.exports = {
    createLesson: function (courseObjId) {
        let courseQuery = Parse.createQuery('Course');
        courseQuery.equalTo('objId', courseObjId);
        return courseQuery.first({ useMasterKey: true }).then(courseObj => {
            if (!courseObj) return Promise.reject({ msg: 'course not found' });
            let lessonParseObjList = [];
            lesson.forEach(lessonItem => {
                lessonParseObjList.push(Parse.create('Lesson', {
                    objId: lessonItem.id + '',
                    title: lessonItem.title,
                    thumbnail: lessonItem.thumbnail,
                    course: courseObj
                }, true));
            });
            return Parse.saveAll(lessonParseObjList);
        }).catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
    }
}