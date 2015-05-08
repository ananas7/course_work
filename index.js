/**
 * Created by lomtev on 25.03.15.
 */
var http = require('http'), fs = require('fs'), express = require('express'), app = express(), engines = require('consolidate');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'd2n|n@r',
    database: 'isop'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});
connection.query('SELECT * FROM users', function(err, result) {
    if (err) throw err;

    console.log(result);
});
/*var fu = {
    firstname: 'a',
    lastname: 'a',
    institution: 'a',
    login: 'admin',
    password: 'admin'
};
connection.query('INSERT INTO users SET ?', fu, function(err, result) {
    if (err) throw err;

    console.log(result.insertId);
});*/

var question = {
    'type' : [],
    'number' : [],
    'example' : [],
    'answer' : []
};
fs.readFile('tests/all.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var text = data.toString();
    text = text.split('\<question\>\n');
    text.forEach(function(el) {
        el = el.split('\<part\>');
        question.number.push(el[0]);
        question.type.push(el[1]);
        question.example.push(el[2]);
        question.answer.push(el[3]);
    });
});

app.post('/ajax', function (req, res){
    var q = {
        'type': [],
        'example': []
    };
    q.type = question.type;
    q.example = question.example;
    res.send(JSON.stringify(q));

});

var answers = [], correct = [], k, assessment = 0, questionAllocated = "BDEFKI";

app.post('/testB', function (req, res){
    k = req.body.ques;
    answers = req.body.selectLine;
    var userAnswer = req.body.answer;
    if (questionAllocated.indexOf(question.type[k]) == -1) {
        if (userAnswer == question.answer[k]) {
            res.send("right");
        } else {
            res.send("wrong");
        }
    } else {
        var nums = [];
        correct = question.answer[k].split(',');
        if (answers != undefined) {
            for (var i = 0; i < answers.length; ++i) {
                if (answers[i] == 1) nums.push(i);
            }
        }
        res.send(nums.join(',') == correct.join(',') ? "right" : "wrong");
    }
});

app.post('/testA', function (req, res){
    k = req.body.ques;
    var userAnswer = req.body.answer;
    answers = req.body.selectLine;
    if (questionAllocated.indexOf(question.type[k]) == -1) {
        if (userAnswer == question.answer[k]) {
            ++assessment;
        }
    } else {
        var nums = [];
        correct = question.answer[k].split(',');
        if (answers != undefined) {
            for (var i = 0; i < answers.length; ++i) {
                if (answers[i] == 1) nums.push(i);
            }
            if (nums.join(',') == correct.join(',')) {
                ++assessment;
            }
        }
    }
    res.send();
});

app.post('/assessment', function (req, res){
    res.send(JSON.stringify(assessment));
});

app.use(express.static(__dirname + '/public/html/'));
app.use(express.static(__dirname + '/public'));
var indexHtml;
var registrHtml;
var testHtml;
fs.readFile ('public/html/index.html', 'utf8', function(err, data) {
    if (err) throw err;
    indexHtml = data;
});
fs.readFile ('public/html/registr.html', 'utf8', function(err, data) {
    if (err) throw err;
    registrHtml = data;
});
fs.readFile ('public/html/test.html', 'utf8', function(err, data) {
    if (err) throw err;
    testHtml = data;
});
app.get('/', function (req, res) {
    res.end(indexHtml);
});
app.get('/registr', function (req, res) {
    res.end(registrHtml);
});
app.get('/test', function (req, res) {
    res.end(testHtml);
});

function logSuccess() {

};
app.listen(process.env.PORT || 3000);