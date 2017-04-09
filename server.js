const config = require('./config.json');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

var speech_to_text = new SpeechToTextV1({
    username: config.WATSON_USER,
    password: config.WATSON_PASS
});

var params = {
    // From file 
    audio: fs.createReadStream('./recording.wav'),
    content_type: 'audio/l16; rate=44100'
};

// speech_to_text.recognize(params, function(err, res) {
//     if (err)
//         console.log(err);
//     else
//         console.log(JSON.stringify(res, null, 2));
// });

app.get('/', (request, response) => {
    response.send('Hello from Express!')
});

app.post('/present', (request, response) => {
	response.send(request.body);
});


// fs.createReadStream('./recording.wav')
//     .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
//     .pipe(fs.createWriteStream('./transcription.txt'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});