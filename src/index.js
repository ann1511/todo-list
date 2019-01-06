const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.add-todo__input');
const buttonAddTodo = document.querySelector('.add-todo__button');

buttonAddTodo.textContent = 'Добавить';

const createTodo = function () {
    const li = document.createElement('li' );


    const input = document.createElement('input' );
    const label = document.createElement('label' );
    input.type = 'checkbox';
    label.textContent = todoInput.value;

    // text.setAttribute('class', 'done');
    li.appendChild(input);
    li.appendChild(label);

    const buttonEdit = document.createElement('button' );
    buttonEdit.textContent = "Изменить";
    li.appendChild(buttonEdit);

    const buttonDelete = document.createElement('button' );
    buttonDelete.textContent = "Удалить";
    li.appendChild(buttonDelete);
    input.addEventListener('click', editText.bind(li));
    todoInput.value = '';
    todoList.appendChild(li);
};

const editText = function () {
    // const p = this.getElementsByTagName('p')[0];
    // console.log(this.innerHTML);
    // p.textContent = 'flkgjkfml,de';
}
buttonAddTodo.addEventListener('click', createTodo);

