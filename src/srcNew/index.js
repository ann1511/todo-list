/**
 * @returns {String} - string
 */
const bem = function (block) {
    if (!block.name) {
        block.name = 'todo-box';
    }
    if(!block.mod) {
        return block.name + '__' + block.elem;
    }
    if (!block.elem) {
        return block.name + '_' + block.mod + '_' + block.value;
    }
    else return block.name + '__' + block.elem + '_'+ block.mod + '_' + block.value;
};

const createHTMLElem = function (parent, tag, attributes) {
    if (parent === undefined || !tag) {
        console.log("Unknown tag or parent"); // обработать нормально ошибки
    };

    const elemHTML = document.createElement(tag);

    if (attributes) {
        Object.entries(attributes).forEach( (item) => elemHTML.setAttribute(item[0], item[1]));
    };
    if (parent !== null) parent.appendChild(elemHTML);

    return elemHTML;

};

const createButton = function(parent, tag, attributes, func) {
    const button = createHTMLElem(parent, tag, attributes);
    button.addEventListener('click', func);
    parent.appendChild(button);
    return button;
};

const body = document.querySelector('body');

const main = function () {

    const todoBox = createHTMLElem(body, 'div', {class: bem({name: 'todo-box', mod: 'bg', value: 'gray'})});

    const mod_input = bem({name: 'todo-box', elem: 'input'});
    const mod_addTodo = bem({name: 'todo-box', elem: 'add-todo'});

    const todoBox__form = createHTMLElem(todoBox, 'form', {class: bem({name: 'todo-box', elem: 'form'})});
    const todoBox__addTodo = createHTMLElem(todoBox__form, 'input',
        {class: mod_addTodo + ' ' + mod_input, 'placeholder': 'Введите текст'});
    todoBox__addTodo.focus();
    const todoList = createHTMLElem(todoBox, 'ul', {class: bem({name: 'todo-box', elem: 'list'})});

    const addTODO = function(event) {
        event.preventDefault();
        createTODO();
        todoBox__addTodo.value = '';
    };

    todoBox__form.addEventListener('submit', addTODO);
};

const createTODO = function () {
    const list = document.querySelector('.todo-box__list');
    const todoBox__input = document.querySelector('.todo-box__add-todo');
    if (todoBox__input.value === '') {
        alert('Введите текст')
        return;
    }
    const todoBox__item = createHTMLElem(null,'li', {class: bem({name: 'todo-box', elem: 'item'})});

    const todoBox__label = createHTMLElem(todoBox__item,'label',
        {class: bem({name: 'todo-box', elem: 'label'})});


    const mod_checkbox = bem({name: 'todo-box', elem: 'checkbox'});


    const todoBox__checbox = createHTMLElem(todoBox__label,'input', {class: mod_checkbox, type: 'checkbox'});
    todoBox__checbox.addEventListener('change', handlerStateTODO);

    const todoBox__text = createHTMLElem(todoBox__label,'p',
        {class: bem({name: 'todo-box', elem: 'text'}), type: ''});

    todoBox__text.innerHTML = todoBox__input.value;

    const mod_edit = bem({name: 'todo-box', elem: 'button'}) + ' ' + bem({name: 'todo-box', elem: 'button-edit'});
    createButton(todoBox__item,  'button',
        {class: mod_edit}, handlerEditTODO).innerText = 'Изменить';

    const mod_delete = bem({name: 'todo-box', elem: 'button'}) + ' ' + bem({name: 'todo-box', elem: 'button-delete'});
    createButton(todoBox__item,  'button',
        {class: mod_delete}, handlerDeleteTODO).innerText = 'Удалить';

    createHTMLElem(todoBox__item,'hr'); // временное решение для разделителя

    list.insertBefore(todoBox__item, list.firstChild);
};

const handlerDeleteTODO = function(event) {
    const li = event.target.closest('.todo-box__item');
    li.parentNode.removeChild(li);
};

function handlerStateTODO(event) {
    event.target.closest('.todo-box__item').classList.toggle("todo-box__item_completed");
}

const handlerEditTODO = function (event) {  // стоит прятать кнопку 'удалить'?
    const todoBox__item = event.target.closest('.todo-box__item');
    const todoBox__label = todoBox__item.querySelector('.todo-box__label');
    const todoBox__buttonEdit = todoBox__item.querySelector('.todo-box__button-edit');

    const todoBox__text = todoBox__item.querySelector('.todo-box__text');

    // такое чувство, что input & button не на одной строчке
    const mod_input = bem({name: 'todo-box', elem: 'input'});

    const todoBox__form = createHTMLElem(todoBox__item, 'form', {class: bem({name: 'todo-box', elem: 'form'})});
    const todoBox__input = createHTMLElem(todoBox__form, 'input',
        {class: mod_input});
    todoBox__input.value = todoBox__text.innerHTML;

    const mod_save = bem({name: 'todo-box', elem: 'button'}) + ' ' + bem({name: 'todo-box', elem: 'button-save'});
    const todoBox__buttonSave = createButton(todoBox__item,  'button',
        {class: mod_save}, handlerSaveTODO);
    todoBox__buttonSave.innerText = 'Сохранить';

    todoBox__item.replaceChild(todoBox__input, todoBox__label);
    todoBox__item.replaceChild(todoBox__buttonSave, todoBox__buttonEdit);
    todoBox__input.focus();
};

const handlerSaveTODO = function() {
    const todoBox__item = event.target.closest('.todo-box__item');
    const todoBox__buttonSave = todoBox__item.querySelector('.todo-box__button-save');
    const todoBox__input = todoBox__item.querySelector('.todo-box__input');

    const mod_edit = bem({name: 'todo-box', elem: 'button'}) + ' ' + bem({name: 'todo-box', elem: 'button-edit'});
    const todoBox__buttonEdit = createButton(todoBox__item,  'button',
        {class: mod_edit}, handlerEditTODO);
    todoBox__buttonEdit.innerText = 'Изменить';

    const todoBox__label = createHTMLElem(todoBox__item,'label',
        {class: bem({name: 'todo-box', elem: 'label'})});
    todoBox__label.addEventListener('change', handlerStateTODO); // класс устанавливается на checkbox

    const mod_checkbox = bem({name: 'todo-box', elem: 'checkbox'});
    const todoBox__checbox = createHTMLElem(todoBox__label,'input', {class: mod_checkbox, type: 'checkbox'});

    const todoBox__text = createHTMLElem(todoBox__label,'p',
        {class: bem({name: 'todo-box', elem: 'text'}), type: ''});

    todoBox__text.innerHTML = todoBox__input.value;

    todoBox__item.replaceChild(todoBox__buttonEdit, todoBox__buttonSave);
    todoBox__item.replaceChild(todoBox__label, todoBox__input);

}

main();
