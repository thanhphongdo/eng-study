module.exports = class Sentence {
    id = '';
    textEN = '';
    textVN = '';
    voiceEN = '';
    constructor(sentence){
        this.id = sentence.id;
        this.textEN = sentence.textEN;
        this.textVN = sentence.textVN;
        this.voiceEN = sentence.voiceEN;
    }
}