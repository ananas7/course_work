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
    $(".progress-bar").css("width", ((k + 1)*(100/23)) + "%");
    document.getElementById("bar").innerHTML = k + 1 + "/23";
};
function testA() {
    $.ajax({
        url: '/testA',
        type: 'POST',
        crossDomain: true,
        data: { ques: k, answer: editor.getValue(), selectLine: answers },
        success: function(data){},
        error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
}

function testB() {
    console.log(answers);
    $.ajax({
        url: '/testB',
        type: 'POST',
        crossDomain: true,
        data: { ques: k, answer: editor.getValue(), selectLine: answers },
        success: function(data) {
            alert(data);
        },
        error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
}

function makeQuestion() {
    if (k >= 0 && k < 22) {
        testA();
    }
    if (k == 22) {
        $.ajax({
            url: '/assessment',
            type: 'POST',
            crossDomain: true,
            data: { },
            success: function(data){
                var nowQuestion = document.getElementById('question');
                nowQuestion.innerHTML = "Поздравляем, вы завершили тест!";
                editor.getDoc().setValue("Всего правильных заданий: "  + JSON.parse(data));
                editor.setOption("readOnly", true);
                canvas = document.getElementById('surprise');
                context = canvas.getContext("2d");
                var img = new Image();
                canvas.clientWidth = img.width * 0.5;
                canvas.clientHeight = img.height * 0.5;
                img.src = "../img/nichosi.png";
                img.onload = function() {
                    context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
                };
            },
            error: function(jqXHR, textStatus, err){
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
            makeQuestion();
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
});
editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    matchBrackets: true,
    mode: 'text/x-c++src',
    indentUnit: 4,
    indentWithTabs: true,
    theme: 'ambiance'
});