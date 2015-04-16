/**
 * Created by lomtev on 25.03.15.
 */
var http = require('http'), fs = require('fs'), express = require('express'), app = express(), engines = require('consolidate');
var co = require('co');
var question = {
    'type' : [],
    'number' : [],
    'example' : [],
    'answer' : []
};
fs.readFile('tests/all.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var text = data.toString();
    text = text.split('<>\n');
    text.forEach(function(el) {
        el = el.split('.');
        question.number.push(el[0]);
        question.type.push(el[1]);
        question.example.push(el[2]);
        question.answer.push(el[3]);
    });
});

app.use(express.static(__dirname + '/public'));

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

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/testB', function (req, res){
    k = req.body.ques;
    answers = req.body.selectLine;
    var userAnswer = req.body.answer;
    if (questionAllocated.indexOf(question.type[k])) {
        if (userAnswer == question.answer[k]) {
            res.send("right");
        } else {
            res.send("wrong");
        }
    } else {
        var nums = [];
        correct = question.answer[k].split(',');
        /*answers.forEach(function (a, i) {
            if (a) nums.push(i);
        });*/
        for (var i = 0; i < answers.length; ++i) {
            if (answers.indexOf(i)) nums.push(i);
        }
        res.send(nums.join(',') == correct.join(',') ? "right" : "wrong");
    }
});

app.post('/testA', function (req, res){
    k = req.body.ques;
    var userAnswer = req.body.answer;
    answers = req.body.selectLine;
    if (questionAllocated.indexOf(question.type[k])) {
        if (userAnswer == question.answer[k]) {
            ++assessment;
        }
    } else {
        var nums = [];
        correct = question.answer[k].split(',');
        /*answers.forEach(function (a, i) {
            if (a) nums.push(i);
        });*/
        for (var i = 0; i < answers.length; ++i) {
            if (answers.indexOf(i)) nums.push(i);
        }
        if (nums.join(',') == correct.join(',')) {
            ++assessment;
        }
    }
});

app.post('/assessment', function (req, res){
    res.send(JSON.stringify(assessment));
});

app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('index.html', 'html');

app.listen(process.env.PORT || 3000);