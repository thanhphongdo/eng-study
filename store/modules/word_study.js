import ParseService from '../../services/parse.service';
const Parse = new ParseService();
export default {
    namespaced: true,
    state: () => ({
        courseName: 'WORD_COURSE',
        courseId: '',
        lessonKey: '',
        wordKey: '',
        lesson: [],
        word: []
    }),
    getters: {
        lessonForWordCourse(state) {
            return state.lesson;
        },
        wordByLessonForWordCourse(state) {
            return lessonId => {
                return state.word.filter(item => {
                    return item.get('lesson').id == lessonId;
                });
            }
        }
    },
    mutations: {
        setCourseForWordCourse(state, courseId) {
            state.courseId = courseId;
            state.lessonKey = 'LESSON_' + state.courseName + '_' + state.courseId;
            state.wordKey = 'WORD_' + state.courseName + '_' + state.courseId;
        },
        fetchLessonForWordCourse(state, { callback, error }) {
            let lessonQuery = Parse.createQuery('Lesson');
            let courseQuery = Parse.createQuery('Course');
            courseQuery.equalTo('objId', state.courseId);
            lessonQuery.matchesQuery('course', courseQuery);
            lessonQuery.limit(1000);
            lessonQuery.find().then(data => {
                data.forEach(item => {
                    state.lesson.push(item);
                });
                if (callback) {
                    callback(data);
                }
            }).catch(err => {
                if (error) {
                    error(err);
                }
            });
        },
        fetchWordForWordCourse(state, { callback, error }) {
            let wordQuery = Parse.createQuery('Word');
            let lessonQuery = Parse.createQuery('Lesson');
            let courseQuery = Parse.createQuery('Course');
            courseQuery.equalTo('objId', state.courseId);
            lessonQuery.matchesQuery('course', courseQuery);
            wordQuery.matchesQuery('lesson', lessonQuery);
            wordQuery.limit(100000);
            wordQuery.find().then(data => {
                data.forEach(item => {
                    state.word.push(item);
                });
                if (callback) {
                    callback(data);
                }
            }).catch(err => {
                if (error) {
                    error(err);
                }
            });
        }
    }
}