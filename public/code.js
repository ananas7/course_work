var answers = [], correct = [], k = -1, assessment = 0, questionAllocated = "BDEFKI";
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
    if (questionAllocated.indexOf(question.type[k])) {
        if (editor.getValue() == question.answer[k]) {
            ++assessment;
        }
    } else {
        var nums = [];
        answers.forEach(function (a, i) {
            if (a) nums.push(i);
        });
        if (nums.join(',') == correct.join(',')) {
            ++assessment;
        }
    }
}

function testB() {
    if (questionAllocated.indexOf(question.type[k])) {
        if (editor.getValue() == question.answer[k]) {
            alert("Right");
        } else {
            alert("Wrong");
        }
    } else {
        var nums = [];
        answers.forEach(function (a, i) {
            if (a) nums.push(i);
        });
        alert(nums.join(',') == correct.join(',') ? "right" : "wrong");
    }
}

function makeQuestion() {
    if (k > 0) {
        testA();
    }
    if (k == 9) {
        alert("Пока это все, вы дали " + assessment + " правильных ответов");
    } else {
        ++k;
        var nowQuestion = document.getElementById('question');
        nowQuestion.innerHTML = textQuestion[question.type[k]];
        editor.getDoc().setValue(question.example[k]);
        if (!questionAllocated.indexOf(question.type[k])) {
            correct = question.answer[k].split(',');
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
        data: { field1: 1, field2: 2 },
        success: function(data){
            question = JSON.parse(data);
            editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                lineNumbers: true,
                matchBrackets: true,
                value: question.example[0],
                mode: 'text/x-c++src',
                indentUnit: 4,
                indentWithTabs: true,
            });
            makeQuestion();
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err);
        }
    })
});