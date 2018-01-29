const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config.json');
const Questions = require('../src/dao/question')

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(
    cors({
        exposedHeaders: config.corsHeaders
    })
);

app.use(
    bodyParser.json({
        limit: config.bodyLimit
    })
);

app.set('port', process.env.PORT || config.port);

app.get('/', (req, res) => {
    res.send({
        ready: new Date()
    });
});

app.post('/questions', (req, res) =>{
    Questions.createQuestion(req.body)
    .then(question => res.status(200).send({
        data: question
    }).end())
    .catch(error => res.status(500).send({
        error
    }).end());
});

app.get('/questions', (req, res) => {
    Questions.getQuestions()
        .then(questions => res.status(200).send({
            data: questions
        }).end())
        .catch(error => res.status(500).send({
            error
        }).end());
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;