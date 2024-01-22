const input = document.querySelector('.todo-input');
const addTodoBtn = document.querySelector('.todo-add-btn');
const todoBody = document.querySelector('.todo-body');
const template = document.querySelector('#todo-item-template');

// Task 1
const addTodo = () => {
  // dont allow empty todos
  if (input.value.trim() === '') {
    return;
  }

  // Task 6
  const editableTodoItem = document.querySelector('.todo-item.active');
  if (editableTodoItem) {
    const title = editableTodoItem.querySelector('.todo-title');
    title.textContent = input.value;

    // clear the input
    input.value = '';

    // remove active class from todo item
    editableTodoItem.classList.remove('active');

    // reset the add button name
    addTodoBtn.textContent = 'Add Item';

    return;
  }

  // Task 6 edge case
  if (addTodoBtn.textContent === 'Edit Item' && !editableTodoItem) {
    // reset the add button name
    addTodoBtn.textContent = 'Add Item';

    return;
  }

  // create a clone of the template content
  // fill it with the title of the todo
  // append it inside the container
  const inputValue = input.value;
  const templateClone = template.content.cloneNode(true);
  const templateCloneTitle = templateClone.querySelector('.todo-title');
  templateCloneTitle.textContent = inputValue;
  todoBody.appendChild(templateClone);

  // clear the input value
  input.value = '';
};

// Task 2
const addTodoOnEnter = (event) => {
  if (event.keyCode === 13) {
    addTodo();
  }
};

// Task 3
const deleteTodo = (event) => {
  const currentTarget = event.target;

  if (!currentTarget.closest('.todo-delete')) {
    return;
  }

  currentTarget.closest('.todo-item').remove();
};

// Task 4
const toggleTodo = (event) => {
  const currentTarget = event.target;

  if (!currentTarget.closest('.todo-title')) {
    return;
  }

  currentTarget.closest('.todo-item').classList.toggle('completed');
};

// Task 5
const editTodo = (event) => {
  const currentTarget = event.target;

  if (!currentTarget.closest('.todo-edit')) {
    return;
  }

  const todoItem = currentTarget.closest('.todo-item');
  const title = todoItem.querySelector('.todo-title');

  const todoItems = document.querySelectorAll('.todo-item');

  todoItems.forEach((todo) => {
    todo.classList.remove('active');
  });

  todoItem.classList.add('active');

  input.value = title.textContent;

  addTodoBtn.textContent = 'Edit Item';
};

// Task 7
const dragStartTodo = (event) => {
  const currentTarget = event.target;

  const todoItem = currentTarget.closest('.todo-item');

  todoItem.classList.add('active-drag');
};

const dragOverTodoBody = (event) => {
  event.preventDefault();
};

const dropTodo = (event) => {
  const currentTarget = event.target;

  const droppedOnTodo = currentTarget.closest('.todo-item');
  const activeDraggedTodo = document.querySelector('.todo-item.active-drag');

  todoBody.insertBefore(activeDraggedTodo, droppedOnTodo);

  activeDraggedTodo.classList.remove('active-drag');
};

addTodoBtn.addEventListener('click', addTodo);
input.addEventListener('keyup', addTodoOnEnter);
todoBody.addEventListener('click', deleteTodo);
todoBody.addEventListener('dblclick', toggleTodo);
todoBody.addEventListener('click', editTodo);

todoBody.addEventListener('dragstart', dragStartTodo);
todoBody.addEventListener('dragover', dragOverTodoBody);
todoBody.addEventListener('drop', dropTodo);
