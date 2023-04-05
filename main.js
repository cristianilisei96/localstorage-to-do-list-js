const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions

function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();

  // Check if input it's empty
  if (todoInput.value == "") {
    alert("Please fill your to do field");
  } else {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("h4");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item", "mb-0");
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos({ todo: todoInput.value, completed: false });
    // Create div for buttons
    const divForButtons = document.createElement("div");
    todoDiv.appendChild(divForButtons);

    // Check Mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    completedButton.classList.add("btn", "btn-success", "complete-btn");
    divForButtons.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    trashButton.classList.add("trash-btn");
    trashButton.classList.add("btn", "btn-danger", "trash-btn");
    divForButtons.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  e.preventDefault();
  // const target
  // console.log(e.target);
  const item = e.target;
  // Delete Todo
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement.parentElement;

    removeLocalTodos(todo);
    todo.remove();
  }

  // Check Mark
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
    e.target.classList.toggle("d-none");
  }
}

function saveLocalTodos(todo) {
  // Check if I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // console.log(JSON.parse(localStorage.getItem("todos")));
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
  } else {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
  }
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create h4
    const newTodo = document.createElement("h4");
    newTodo.innerText = todo.todo;
    newTodo.classList.add("todo-item", "mb-0");
    todoDiv.appendChild(newTodo);

    // Create div for buttons
    const divForButtons = document.createElement("div");
    todoDiv.appendChild(divForButtons);

    // Check Mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    completedButton.classList.add("btn", "btn-success", "complete-btn");
    divForButtons.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    trashButton.classList.add("trash-btn");
    trashButton.classList.add("btn", "btn-danger", "trash-btn");
    divForButtons.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check if I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
