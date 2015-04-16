var answers = [], k = -1, questionAllocated = "BDEFKI";
var textQuestion = {
    'A': "Найти и иcправить ошибку в коде" ,
    'B': "Отметить строку с ошибкой (ответов может быть несколько)",
    'C': "Расставить правильно табулатуру и пробелы",
    'D': "Найти и отметить строчки с неправильной расстоновкой табулатуры или пробелов (ответов может быть несколько)",
    'E': "Найти и отметить строчки с синтаксическими ошибками (ответов может быть несколько)",
    'F': "Указать строчки где инициализированы глобальные переменные (ответов может быть несколько)",
    'G': "Найти и исправить ошибку инициализации переменных",
    'K': "Найти и отметить строчки с неправильной расстоновкой фигурных скобок (ответов может быть несколько)",
    'I': "Найти и отметить строчки, где будут указаны ошибки при компиляции (ответов может быть несколько)",
    'J': "Инициализируйте необходимые в приведенном коде переменные",
    'H': "Найти и исправить ошибки (ХарДкорный мод)"
};
var editor;
var loadingProgBar = function(){
    $(".progress-bar").css("width", (k + 5) + "%");
    document.getElementById("bar").innerHTML = (k + 1) + "/100";
};
function testA() {
    $.ajax({
        url: '/testA',
        type: 'POST',
        cache: false,
        data: { ques: k, answer: editor.getValue(), selectLine: answers },
        success: function(data){}
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
}

function testB() {
    $.ajax({
        url: '/testB',
        type: 'POST',
        cache: false,
        data: { ques: k, answer: editor.getValue(), selectLine: answers },
        success: function(data){
            alert(data);
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
}

function makeQuestion() {
    if (k > 0) {
        testA();
    }
    if (k == 9) {
        $.ajax({
            url: '/assessment',
            type: 'POST',
            cache: false,
            data: { },
            success: function(data){
                alert("Пока это все, вы дали " + JSON.parse(data) + " правильных ответов");
                console.log(JSON.parse(data));
            }
            , error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    } else {
        ++k;
        var nowQuestion = document.getElementById('question');
        nowQuestion.innerHTML = textQuestion[question.type[k]];
        editor.getDoc().setValue(question.example[k]);
        if (!questionAllocated.indexOf(question.type[k])) {
            $(editor.getWrapperElement()).find('.CodeMirror-linenumber').click(function(){
                $(this).toggleClass("highlightLine");
                answers[$(this).text()] ^= 1;
            });
        }
    }
    answers = [];
    loadingProgBar();
}

var question = [];
$(window).bind("load", function() {
    $.ajax({
        url: '/ajax',
        type: 'POST',
        cache: false,
        data: {},
        success: function(data){
            question = JSON.parse(data);
            editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                lineNumbers: true,
                matchBrackets: true,
                value: question.example[0],
                mode: 'text/x-c++src',
                indentUnit: 4,
                indentWithTabs: true
            });
            makeQuestion();
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
});