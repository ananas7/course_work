/**
 * Created by lomtev on 18.04.15.
 */
editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    matchBrackets: true,
    mode: 'text/x-c++src',
    indentUnit: 4,
    indentWithTabs: true,
    theme: 'ambiance'
});