module.exports = class Lesson {
    id = '';
    title = '';
    thumbnail = '';
    link = '';
    words = [];
    constructor(lesson) {
        this.id = lesson.id;
        this.title = lesson.title;
        this.thumbnail = lesson.thumbnail;
        this.link = lesson.link;
        this.words = lesson.words || [];
    }
}