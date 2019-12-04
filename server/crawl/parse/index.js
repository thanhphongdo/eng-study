const courseParse = require('./create_course');
const lessonParse = require('./create_lesson');
const wordParse = require('./create_word');
// courseParse.createCourse().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });
// lessonParse.createLesson('word_6000').then(obj => {
//     console.log(obj);
// }).catch(err => {
//     console.log(err);
// });
wordParse.createWord('word_6000').then(obj => {
    console.log(obj);
}).catch(err => {
    console.log(err);
});