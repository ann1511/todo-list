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

/**
 * @param {HTMLElement} parent
 * @param {String} tag
 * @param {Object} attributes - Объект атрибутов формата {name: value}
 *
 * @returns {HTMLElement} - Новый элемент
 */

const body = document.querySelector('body');

const main = function () {

    const todoBox = createHTMLElem(body, 'div', {class: bem({name: 'todo-box', mod: 'bg', value: 'gray'})});

    const mod_input = bem({name: 'todo-box', elem: 'input'});
    const mod_addTodo = bem({name: 'todo-box', elem: 'add-todo'});

    const todoBox__form = createHTMLElem(todoBox, 'form', {class: bem({name: 'todo-box', elem: 'form'})});
    const todoBox__addTodo = createHTMLElem(todoBox__form, 'input',
        {class: mod_addTodo + ' ' + mod_input,
                'autofocus': 'autofocus', 'placeholder': 'Введите текст'});
    // autofocus невозможно установить средствами css - ?? TODO: сделать через класс

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
    const input = document.querySelector('.todo-box__add-todo')
    const todoBox__item = createHTMLElem(null,'li', {class: bem({name: 'todo-box', elem: 'item'})});
    todoBox__item.textContent = input.value; // TODO: сделать через createHTMLElem

    list.insertBefore(todoBox__item, list.firstChild);
};

main();
