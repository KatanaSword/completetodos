const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const clear = document.getElementById("clear");
const taskContainer = document.getElementById("task-container");
let initialValue;

function addTodos(e) {
  const localTodos = JSON.parse(localStorage.getItem("item")) || [];
  const todos = [inputTask.value, ...localTodos];

  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  const task = document.createElement("div");
  task.classList.add("task");
  taskList.appendChild(task);
  task.innerText = inputTask.value;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("check-task");
  taskList.appendChild(checkBox);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  taskList.appendChild(deleteIcon);

  if (inputTask.value.trim()) {
    taskContainer.appendChild(taskList);
    taskContainer.insertBefore(taskList, taskContainer.children[0]);
    localStorage.setItem("item", JSON.stringify(todos));
  }
  inputTask.value = "";

  checkBox.addEventListener("click", completeTodos);
  task.addEventListener("click", editTodos);
  deleteIcon.addEventListener("click", deleteTodo);
}

function completeTodos(e) {
  const target = e.target;

  if (target.previousSibling.style.textDecoration === "line-through") {
    target.previousSibling.style.textDecoration = "none";
    target.previousElementSibling.style.color = "#000";
    target.previousElementSibling.style.backgroundColor = "#d68f84";
    target.parentElement.style.backgroundColor = "#d68f84";
  } else {
    target.previousSibling.style.textDecoration = "line-through";
    target.previousElementSibling.style.color = "#6b7280";
    target.previousElementSibling.style.backgroundColor = "#4ade80";
    target.parentElement.style.backgroundColor = "#4ade80";
  }
}

function editTodos(e) {
  const target = e.target;
  const item = target.innerHTML;
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = item;
  initialValue = item;
  editInput.classList.add("edit");
  editInput.select();
  target.replaceWith(editInput);

  editInput.parentElement.style.backgroundColor = "#67e8f9";
  editInput.style.backgroundColor = "#67e8f9";

  editInput.addEventListener("dblclick", saveTodos);
  editInput.addEventListener("keyup", saveTodos);
}

function saveTodos(e) {
  const target = e.target;
  const div = document.createElement("div");
  div.classList.add("edited-todo");

  if (target.value.length > 0 && (e.key === "Enter" || e.type === "dblclick")) {
    div.innerText = target.value;
    target.replaceWith(div);
    div.parentElement.style.backgroundColor = "#d68f84";
    div.style.backgroundColor = "#d68f84";
  } else if (
    target.value.length === 0 &&
    (e.key === "Enter" || e.type === "dblclick")
  ) {
    div.innerText = initialValue;
    target.replaceWith(div);
    div.parentElement.style.backgroundColor = "#d68f84";
    div.style.backgroundColor = "#d68f84";
  }
  div.addEventListener("click", editTodos);
}

function deleteTodo(e) {
  const target = e.target.parentElement;
  target.remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  const taskElements = Array.from(document.querySelectorAll(".task"));
  const todos = taskElements.map((taskElement) => taskElement.innerText);
  localStorage.setItem("item", JSON.stringify(todos));
}

function clearTodos() {
  taskContainer.innerHTML = "";
  localStorage.clear();
}

function loadLocalStorage() {
  const localTodos = JSON.parse(localStorage.getItem("item")) || [];
  localTodos.forEach((todo) => {
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    const task = document.createElement("div");
    task.classList.add("task");
    taskList.appendChild(task);
    task.innerText = todo;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("check-task");
    taskList.appendChild(checkBox);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    taskList.appendChild(deleteIcon);

    taskContainer.appendChild(taskList);

    checkBox.addEventListener("click", completeTodos);
    task.addEventListener("click", editTodos);
    deleteIcon.addEventListener("click", deleteTodo);
  });
}
window.addEventListener("load", loadLocalStorage);
clear.addEventListener("click", clearTodos);
addTask.addEventListener("click", addTodos);
