function bem(blockName) {
    return {
        block: function() {
            return blockName;
        },

        elem: function(elem) {
            return `${blockName}__${elem}`;
        },

        mod: function(modName) {
            return `${blockName}_${modName}`;
        },

        elemMods: function(elem, modName, modVal) {
            return `${blockName}__${elem}_${modName}_${modVal}`;
        }

    }
}

const createHTMLElem = function (parent, tag, attributes) {
    if (parent === undefined || !tag) {
        console.log("Unknown tag or parent"); // обработать нормально ошибки
    }

    const elemHTML = document.createElement(tag);

    if (attributes) {
        Object.entries(attributes).forEach((item) => elemHTML.setAttribute(item[0], item[1]));
    }

    if (parent !== null) parent.appendChild(elemHTML);

    return elemHTML;

};

const body = document.querySelector('body');

const main = function () {
    const bl = bem('todo-box');

    const box = createHTMLElem(body, 'div', {class: bl.mod('bg_gray') + ' ' + bl.block()});

    const form = createHTMLElem(box, 'form', {class: bl.elem('form')});
    const input = createHTMLElem(form, 'input',
        {class: bl.elem('add-todo') + ' ' + bl.elem('input'), 'placeholder': 'Введите текст'});
    input.focus();
    const list = createHTMLElem(box, 'ul', {class: bl.elem('list')});

    const addTODO = function (event) {
        event.preventDefault();
        const todoItem = createTodoItem(input.value, false);
        list.insertBefore(todoItem, list.firstChild);
        input.value = '';
    };

    form.addEventListener('submit', addTODO);
};

const createTodoItem = function(value, completed) {
    const bl = bem('todo-item');
    const blButton = bem('button');

    const todoItem = createHTMLElem(null, 'li', { class: bl.block() });
    const todoItemContent = createHTMLElem(todoItem, 'div', { class: bl.elem('content') });

    const label = createHTMLElem(todoItemContent, 'label', { class: bl.elem('label')});
    const checkbox = createHTMLElem(label, 'input', {
        class: bl.elem('checkbox'),
        type: 'checkbox',
        checked: completed
    });

    checkbox.addEventListener('change', handlerTodoStateChange);

    const text = createHTMLElem(label, 'p', { class: bl.elem('text')});
    text.textContent = value;

    const editButton = createHTMLElem(todoItemContent, 'button',
        { class: bl.elemMods('button', 'type', 'edit') + ' ' + blButton.block()});
    editButton.textContent = 'Изменить';
    editButton.addEventListener('click', handlerTodoStartEdit);

    const deleteButton = createHTMLElem(todoItemContent, 'button',
        { class: bl.elemMods('button', 'type', 'delete') + ' ' + blButton.block()});
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', handlerTodoDelete);

    return todoItem;
};

const handlerTodoStateChange = function(e) {
    const bl = bem('todo-item');
    e.target.closest('.' + bl.block()).classList.toggle(bl.mod('completed'));
};

const handlerTodoStartEdit = function(e) {
    const bl = bem('todo-item');

    const todoItem = e.target.closest('.' + bl.block());
    const value = todoItem.querySelector('.' + bl.elem('text')).textContent;

    const form = createTodoItemEditForm(value);

    todoItem.appendChild(form);

    todoItem.classList.toggle(bl.mod('edit'));
};

const handlerTodoDelete = function (event) {
    const bl = bem('todo-item');
    const todoItem = event.target.closest('.' + bl.block());
    todoItem.remove();
};

const createTodoItemEditForm = function(value) {
    const bl = bem('todo-item');
    const blButton = bem('button');

    const form = createHTMLElem(null, 'form', { class: bl.elem('form') });

    const input = createHTMLElem(form, 'input', {
        class: bl.elem('input'),
        value: value
    });

    const saveButton = createHTMLElem(form, 'button',
        { class: bl.elemMods('button', 'type', 'save') + ' ' + blButton.block()});
    saveButton.textContent = 'Сохранить';

    form.addEventListener('submit', handlerTodoEndEdit);

    return form;
};


const handlerTodoEndEdit = function(e) {
    e.preventDefault();

    const bl = bem('todo-item');
    const form = e.target;
    const todoItem = form.closest('.' + bl.block());
    const value = form.querySelector('.' + bl.elem('input')).value;

    todoItem.classList.toggle(bl.mod('edit'));
    todoItem.querySelector('.' + bl.elem('text')).textContent = value;

    form.remove();
};


main();
