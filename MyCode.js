$(function () {
	// example 1
	var ex1 = document.getElementById("example1");
	var cm1 = CodeMirror.fromTextArea(ex1, {
		mode: "text/x-c++src",
		//theme: "pastel-on-dark",
		lineNumbers: true,
		indentUnit: 4,
		indentWithTabs: true,
		lineWrapping: true,
		showCursorWhenSelecting: true
	});
	cm1.setSize(250, 50);
	// example 2
	var ex2 = document.getElementById("example2");
	var cm2 = CodeMirror.fromTextArea(ex2, {
		mode: "text/x-c++src",
		//theme: "pastel-on-dark",
		lineNumbers: true,
		indentUnit: 4,
		indentWithTabs: true,
		lineWrapping: true,
		showCursorWhenSelecting: true
	});
	cm2.setSize(250, 50);
	// example 2
	var ex3 = document.getElementById("example3");
	var cm3 = CodeMirror.fromTextArea(ex3, {
		mode: "text/x-c++src",
		//theme: "pastel-on-dark",
		lineNumbers: true,
		indentUnit: 4,
		indentWithTabs: true,
		lineWrapping: true,
		showCursorWhenSelecting: true
	});
	cm3.setSize(250, 100);
});

// 1 задание
var myTextArea1 = document.getElementById("1exercies");
var right = "#include<iostream>\nusing namespace std;\nint main() {\n\tint a = 0;\n\ta = 4 + 5;\n\tcout << a;\n}";//
var myCodeMirror1 = CodeMirror.fromTextArea(myTextArea1, {
	extraKeys: {
		"Ctr+Space": "autocomplete"
		//"Ctr+E":
	},
	mode: "text/x-c++src",
	//theme: "pastel-on-dark",
	lineNumbers: true,
	indentUnit: 4,
	indentWithTabs: true,
	lineWrapping: true,
	showCursorWhenSelecting: true
});
function isRight() {
	if (myCodeMirror1.getValue() == right)
		alert("you right!");
	else	
		alert("sorry, can replay?");	
};
// 2 задание
var myTextArea2 = document.getElementById("2exercies");
var myCodeMirror2 = CodeMirror.fromTextArea(myTextArea2, {
	extraKeys: {
		"Ctrl+Space": "autocomplete",
		"Ctrl+1": function() {
		}
	},
	mode: "text/x-c++src",
	lineNumbers: true,
	indentUnit: 4,
	indentWithTabs: true,
	lineWrapping: true,
	showCursorWhenSelecting: true
});
var answers = [], correct = [5];
$(myCodeMirror2.getWrapperElement()).find('.CodeMirror-linenumber').click(function(){
	$(this).toggleClass("highlightLine");
	answers[$(this).text()] ^= 1;
});
function highlight() {
	var nums = [];
	answers.forEach(function (a, i) {
		if (a) nums.push(i);
	});
	console.log(nums);
	alert(nums.join(',') == correct.join(',') ? "right" : "wrong");
}
// функция перемещивания массива.
function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
var question = [
	{
		type_job: isRight,
		job: "Исправьте все ошибки в коде.",
		text_job: "#include<iostream>\nusing namespace std;\nint main() {\n\tint a = 0;\n\ta = 4 + 5;\n\tcout << a;\n}"
	},
	{ 		
		type_job: highlight,
		job: "Выделите те строки, где есть ошибки.",
		text_job: "#include<iostream>\nusing namespace std;\nint main() {\n\tint a = 0;\na = 4 + 5;\n\tcout << a;\n}"
	}
];
var question_num = 0;
question = shuffle(question);
function make_question() {
	var q = question[question_num];
	document.getElementById('job').innerHTML = q.job;
	document.getElementById('text_job').value = q.text_job;
	++question_num;
}