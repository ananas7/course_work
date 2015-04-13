/**
 * Created by lomtev on 25.03.15.
 */
var http = require('http'), fs = require('fs'), url = require('url'), mime = require('mime'), mq = require('./public/code.js');
var question = {
    'type' : [],
    'number' : [],
    'example' : [],
    'answer' : []
};

fs.readFile('public/tests/all.txt', 'utf8', function(err, data) {
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

http.createServer(function (req, res) {
    fileName = '/public/index.htm';
    switch (req.url) {
        case '/':
            sendFile('index.htm');
            var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                lineNumbers: true,
                matchBrackets: true,
                value: question.example[0],
                mode: 'text/x-c++src',
                indentUnit: 4,
                indentWithTabs: true
            });
            mq();
            break;
        case '/javascript.js':
            sendFile('javascript.js');
            break;
        case '/codemirror/lib/codemirror.js':
            sendFile('codemirror/lib/codemirror.js');
            break;
        case '/codemirror/mode/clike/clike.js':
            sendFile('codemirror/mode/clike/clike.js');
            break;
        case '/jquery.js':
            sendFile('jquery.js');
            break;
        case '/js/modernizr.js':
            sendFile('js/modernizr.js');
            break;
        case '/code.js':
            sendFile('code.js');
            break;
        case '/main.css':
            sendFile('main.css');
            break;
        case '/codemirror/lib/codemirror.css':
            sendFile('/codemirror/lib/codemirror.css');
            break;
        case '/codemirror/theme/default.css':
            sendFile('/codemirror/theme/default.css');
            break;
        default :
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Bolt");
            break;
    }
    function sendFile (fileName) {
        fs.readFile('public/'+fileName, 'utf8', function(err, data){
            res.writeHead(200, {"Content-Type": mime.lookup(fileName)});
            res.end(data);
        });
    };
}).listen(8888);