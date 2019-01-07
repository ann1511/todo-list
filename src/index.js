const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.add-todo__input');
const buttonAddTodo = document.querySelector('.add-todo__button');

const createElement = function (tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    if (text && tag === 'input') element.value = text;
    else if (text) element.textContent = text;

    return element;

};

const createButton = function(parent, func, tag, className, text) {
    const button = createElement(tag, className, text);
    button.addEventListener('click', func);
    parent.appendChild(button);
    return button;
};


function handlerStateTODO() {// пока тыкаем в checkbox
    // console.log(event.currentTarget, 'currentTarget');
    // console.log(event.target, 'target');
    const classList = this.parentNode.parentNode.classList;  // меняем класс у li

    if (!classList.contains('finished')) {
        classList.add('finished');
        classList.remove('active');
    }
    else {
        classList.remove('finished');
        classList.add('active');
    }
}


const createEditTODO = function(parent, text) {
    const label = document.createElement('label' );
    const checkbox = createElement('input', 'todo__checkbox' );
    const p = createElement('p', 'todo__text', text);
    parent.classList.add('active');
    checkbox.type = "checkbox";

    label.appendChild(checkbox);
    label.appendChild(p);

    parent.appendChild(label);

    checkbox.addEventListener('click', handlerStateTODO); // не знаю почему обработчик срабатывает дважды для label

    return label;
};


const createListItem = function () {
    const li = document.createElement('li' );

    const todo = createEditTODO(li, todoInput.value);

    const buttonEdit = createButton(li, editText.bind(li),'button','todo__button_edit', 'Изменить' );
    const buttonDelete = createButton(li, deleteText.bind(li),'button', 'todo__button_delete', 'Удалить');

    todoInput.value = '';
    todoList.insertBefore(li, todoList.firstChild);
};

const deleteText = function () {
    this.parentNode.removeChild(this);
};

const saveText = function () {
    const input = document.querySelector('.todo__input');
    const buttonSave = document.querySelector('.todo__button_save');

    const todo = createEditTODO(input.parentNode, input.value);
    const buttonEdit = createButton(buttonSave.parentNode, editText.bind(this), 'button', 'todo__button_edit', 'Изменить');

    input.parentNode.replaceChild(todo, input);

    this.replaceChild(buttonEdit, buttonSave);

};

const editText = function () {
    const label = this.querySelector('label');

    const checkbox = this.querySelector('.todo__checkbox');
    const p = this.querySelector('p');
    const buttonEdit = this.querySelector('.todo__button_edit');

    const input = createElement('input', 'todo__input', p.textContent);
    const buttonSave = createElement('button', 'todo__button_save', 'Сохранить');

    input.classList.add('todo__text');
    label.removeChild(checkbox);
    label.parentNode.replaceChild(input, label);
    this.replaceChild(buttonSave, buttonEdit);

    input.focus(); // курсор в инпуте

    buttonSave.addEventListener('click', saveText.bind(this));
};

const onСlickEnter = function(event) { // можно не писать аргумент, он передается в функцию-обработчик по умолчанию (обязательно event)
    if (event.code === 'Enter') { // совсем не прозрачно.
        createListItem();
    }
};

buttonAddTodo.addEventListener('click', createListItem);
todoInput.addEventListener('keydown', onСlickEnter);


const handlerFilter = function () {
    const status = event.target.classList[0];
    const items = todoList.querySelectorAll('li');

    if (status === 'active') {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('finished')) {
                items[i].hidden = true;
            }
            else items[i].hidden = false
        }
    }

    else if (status === 'finished') {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('active')) {
                items[i].hidden = true;
            }
            else items[i].hidden = false
        }
    }

    else if (status === 'all') {
        for (let i = 0; i < items.length; i++) {
                items[i].hidden = false;
        }
    }
};

const filter =  document.querySelector('.filter');
filter.addEventListener('click', handlerFilter);
