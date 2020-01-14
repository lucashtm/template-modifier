let templates = [
    'templates/t1/index.html',
    'templates/t2/index.html'
];

buildTemplateSelect();

let editPanel = $('#edit-panel');

// Hide edit panel and its children
editPanel.hide();
$('#text-field').hide();
$('#color-picker').hide();
$('#background-color-picker').hide();
$('#form-action').hide();

document.getElementById('load-template').onclick = function(){
    $('#template').load(document.getElementById('templates').value);
}

// On click function to copy template content to clipboard
document.getElementById('clipboard').onclick = function(){
    computedStyleToInlineStyle(document.getElementsByClassName('template')[0], {
        recursive: true
    });
    hiddenInput = document.getElementById('html-text');
    hiddenInput.value = document.getElementById('template').innerHTML;
    console.log(hiddenInput.select());
    document.execCommand("copy");
}

// On click function to apply modifications of selected element
document.getElementById('apply-edit').onclick = function(){
    if($(selectedElement).hasClass('text')){
        selectedElement.innerHTML = document.getElementById('text-field-input').value;
    }
    if($(selectedElement).hasClass('color')){
        $(selectedElement).css('color', document.getElementById('color-picker-input').value);
    }
    if($(selectedElement).hasClass('background-color')){
        $(selectedElement).css('background-color', document.getElementById('background-color-picker-input').value);
    }
    if($(selectedElement).hasClass('url')){
        selectedElement.action = document.getElementById('form-action-input').value;
    }
}

let currentElement = null;
let selectedElement = null;

// This event sets closest element to mouse position
$(document).mousemove(function(e){
    currentElement = document.elementFromPoint(e.pageX, e.pageY);
});

// This event toggles edit panel for mutable elements
$(document).click(function(){
    if(forbbidenElement(currentElement)){
        return;
    }
    if($(currentElement).hasClass('mutable')){
        selectedElement = currentElement;
        showEditPanel(selectedElement);
    }else{
        selectedElement = null;
        hideEditPanel();
    }
});

function showEditPanel(el) {
    editPanel.show();
    if($(el).hasClass('text')){
        $('#text-field').show();
        document.getElementById('text-field').value = selectedElement.innerHTML;
    }else{
        document.getElementById('text-field').value = '';
        $('#text-field').hide();
    }
    if($(el).hasClass('color')){
        $('#color-picker').show();
        document.getElementById('color-picker').value = $(selectedElement).css( 'color');
    }else{
        $('#color-picker').hide();
    }
    if($(el).hasClass('background-color')){
        $('#background-color-picker').show();
        document.getElementById('background-color-picker').value = $(selectedElement).css('background-color');
    }else{
        $('#background-color-picker').hide();
    }
    if($(el).hasClass('url')){
        $('#form-action').show();
    }else{
        $('#form-action').hide();
    }
}

function hideEditPanel() {
    $('#edit-panel').hide();
}

// Checks if given element is eligible for toggling edit panel
function forbbidenElement(el){
    editElement = editPanel.has(el).length || $(el).hasClass('edit-panel');
    pageElement = $(el).is('html') || $(el).is('body');
    return editElement || pageElement;
}

function buildTemplateSelect(){
    for(i=0;i<templates.length;i++){
        document.getElementById('templates').innerHTML += `<option value="${templates[i]}">${templates[i]}</option>`;
    }
}