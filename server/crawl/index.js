const Word6000 = require('./vocabulary/word_6000');
const Word1000 = require('./vocabulary/word_1000');
new Word6000().getData().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
// new Word1000().getData().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });
