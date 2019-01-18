

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

export { createElement };

