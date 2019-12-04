module.exports = class Word {
    id = '';
    textEN = '';
    textVN = '';
    voiceEN = '';
    transcript = '';
    wordClass = '';
    example = [];
    constructor(word){
        this.id = word.id;
        this.textEN = word.textEN;
        this.textVN = word.textVN;
        this.voiceEN = word.voiceEN;
        this.transcript = word.transcript;
        this.wordClass = word.wordClass;
        this.example = word.example || [];
    }
}