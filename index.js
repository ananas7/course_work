/**
 * Created by lomtev on 25.03.15.
 */
var http = require('http'), fs = require('fs'), express = require('express'), app = express(), engines = require('consolidate');

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

    res.send(JSON.stringify(question));

});

app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('index.html', 'html');

app.listen(process.env.PORT || 3000);