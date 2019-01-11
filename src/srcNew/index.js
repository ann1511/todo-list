const body = document.querySelector('body');

const createElement = function (parent, tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        const classes = className.split(' ');
        classes.forEach( (item) => element.classList.add(item));
    };

    if (text && tag === 'input') element.value = text;
    else if (text) element.textContent = text;

    parent.appendChild(element);

    return element;
};

const main = function () {
    const list__input = createElement(body,'input', 'input list__input');
    list__input.setAttribute('autofocus', 'autofocus'); // можно так
    list__input.placeholder = 'Введите текст'; // а еще можно так

    createElement(body,'ul', 'list');
    createElement(body,'footer', 'filter');

    const onСlickEnter = function(event) { // можно не писать аргумент, он передается в функцию-обработчик по умолчанию (обязательно event)
        if (event.code === 'Enter') {
            createTODO();
        }
    };

    list__input.addEventListener('keydown', onСlickEnter);
};

const createTODO = function () {
    const list__input = document.querySelector('.list__input');
    const list = document.querySelector('.list');
    const todo = createElement(list ,'li', 'list__item todo');
    const container = createElement(todo ,'label', 'container'); //
    const checkbox = createElement(container ,'input', 'checkbox');
    checkbox.type = 'checkbox';
    container.appendChild(document.createTextNode(list__input.value));  // сложное добавление текста в todo
    list__input.value = '';

    checkbox.addEventListener('click', function () {
        container.classList.toggle('checked'); // так наверное не делают, но с моей архитектурой хз, как сделать лучше
    });

    list.insertBefore(todo, list.firstChild);
};

main();
