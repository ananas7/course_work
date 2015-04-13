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
}

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
        var nowQuestion = document.getElementById('question ');
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
module.exports.makeQuestion = makeQuestion;

 var question = [];
 question = {
 'type' : ['A','A','A','A','B','B','B','C','C','C','J','A'],
 'number' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
 'example' : ['include iostream', 'include < iostraem >', 'int main {cout <<\'Hello, world\"}', 'inculde <iostraem>\nusing namespces std;\nint main {\nint a;\n\tcin>>a;\n\tint b=a-2;\ncuot<< b;\n}', '#include <iostream>\nusing namespace std;\nint main() {\n\tint a,b,c;\n\ta = 2;\n\tb = 3;\n\tc = a+b;\n\tcout << c;\n}', 'include <iostream>\nusing namespace std;\nint main() {\n\tint a,b,c;\n\ta = 2;\n\tb = 3;\n\tc = a+b;\n\tcout << c;\n}', '#include <iostraem>\nusing namespace std;\nint main() {\n\tint a,b,c;\n\ta = 2;\n\tb = 3;\n\tc = a+b;\n\tcout << c;\n}', '#include <iostream>\nusing namespace std;\nint main() {\nint a = 12;\nif (a < 10) {\ncout<<a;\n}else{\ncout<<a-10;\n}\n}', '#include < iostream >\nusing namespace std;\nint main (){\n\tint a=5;\nint b= 3;\n\t\tint c =2;\n\tcout<< (a+b) * c;\n}', '#include < iostream>\n\tusing namespace std;\n\tint main (){\n\tcout<<\"Hello, world!\";\n}'],
 'answer' : ['#include <iostream>', '#include <iostream>', 'int main() {\n\tcout << \"Hello, world\";\n}', '#include <iostream>\nusing namespace std;\nint main() {\n\tint a;\n\tcin >> a;\n\tint b = a - 2;\n\tcout << b;\n}', '4,7', '1,4,7', '1,4,7', '#include <iostream>\nusing namespace std;\nint main() {\n\tint a = 12;\n\tif (a < 10) {\n\t\tcout << a;\n\t} else {\n\t\tcout << a - 10;\n\t}\n}', '#include <iostream>\nusing namespace std;\nint main() {\n\tint a = 5;\n\tint b = 3;\n\tint c = 2;\n\tcout << (a + b) * c;\n}', '#include <iostream>\nusing namespace std;\nint main() {\n\tcout << \"Hello, world!\";\n}']
 };

makeQuestion();