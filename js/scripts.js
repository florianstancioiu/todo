'use strict';

const input = document.querySelector('.todo-input');
const addTodoBtn = document.querySelector('.todo-add-btn');
const todoBody = document.querySelector('.todo-body');
const template = document.querySelector('#todo-item-template');

const renderTodosHTML = () => {
  if (!localStorage.getItem('todos')) {
    return;
  }

  // clear the todo body
  todoBody.innerHTML = '';

  const todos = JSON.parse(localStorage.getItem('todos'));

  todos.forEach((todo, index) => {
    const templateClone = template.content.cloneNode(true);
    const todoItem = templateClone.querySelector('.todo-item');
    const title = templateClone.querySelector('.todo-title');
    title.textContent = todo.title;
    todoItem.setAttribute('data-index', index);

    if (todo.isCompleted) {
      todoItem.classList.add('todo-completed');
    }

    todoBody.appendChild(templateClone);
  });
};

// Task 1
const addTodo = () => {
  // dont allow empty todos
  if (input.value.trim() === '') {
    return;
  }

  // Task 6
  const editableTodoItem = document.querySelector('.todo-item.todo-editable');
  if (editableTodoItem) {
    const editableTodoIndex = parseInt(
      editableTodoItem.getAttribute('data-index')
    );

    // retrive the data from localstorage
    const todos = JSON.parse(localStorage.getItem('todos'));

    // create a new array using map with the right data
    const newTodos = todos.map((todo, index) => {
      if (index === editableTodoIndex) {
        return {
          ...todo,
          title: input.value,
        };
      }

      return todo;
    });

    // set the data back in localstorage
    localStorage.setItem('todos', JSON.stringify(newTodos));

    // render the html
    renderTodosHTML();

    // clear the input
    input.value = '';

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

  let todos = [];
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const newTodo = {
    title: input.value,
    isCompleted: false,
  };

  todos.push(newTodo);

  const stringifiedTodos = JSON.stringify(todos);

  localStorage.setItem('todos', stringifiedTodos);

  renderTodosHTML();

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

  const currentTodo = currentTarget.closest('.todo-item');
  const currentTodoIndex = parseInt(currentTodo.getAttribute('data-index'));

  const todos = JSON.parse(localStorage.getItem('todos'));

  const newTodos = todos.filter((todo, index) => {
    // make sure that the currently clicked todo is not part of newTodos
    if (index === currentTodoIndex) {
      return false;
    }

    // make sure that the rest of the elements are inside the array
    return true;
  });

  // set the localstorage data
  localStorage.setItem('todos', JSON.stringify(newTodos));

  // render the html
  renderTodosHTML();
};

// Task 4
const toggleTodo = (event) => {
  const currentTarget = event.target;

  if (!currentTarget.closest('.todo-title')) {
    return;
  }

  const currentTodo = currentTarget.closest('.todo-item');
  const currentTodoIndex = parseInt(currentTodo.getAttribute('data-index'));

  // retrieve the data from localstorage
  const todos = JSON.parse(localStorage.getItem('todos'));

  // create a new array with the right data
  const newTodos = todos.map((todo, index) => {
    if (index === currentTodoIndex) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    }

    return todo;
  });

  // set the new data to localstorage
  localStorage.setItem('todos', JSON.stringify(newTodos));

  // render the html
  renderTodosHTML();
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
    todo.classList.remove('todo-editable');
  });

  todoItem.classList.add('todo-editable');

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

  const droppedIndex = parseInt(droppedOnTodo.getAttribute('data-index'));
  const activeIndex = parseInt(activeDraggedTodo.getAttribute('data-index'));

  // retrieve the localstorage data
  const todos = JSON.parse(localStorage.getItem('todos'));

  // retrive the active todo object from todos array
  const activeTodo = todos[activeIndex];

  // update the existing todos array using splice

  // remove the active todo object from todos array
  todos.splice(activeIndex, 1);

  // push the active todo object in the todos array at the right location
  todos.splice(droppedIndex, 0, activeTodo);

  // set the localstorage data back in
  localStorage.setItem('todos', JSON.stringify(todos));

  // render the html
  renderTodosHTML();

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

renderTodosHTML();
