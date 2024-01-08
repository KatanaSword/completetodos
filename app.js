const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const clear = document.getElementById("clear");
const taskContainer = document.getElementById("task-container");
let initialValue;

function addItem() {
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

  if (!inputTask.value.trim()) {
    alert("It's empty please type a task");
  } else {
    taskContainer.appendChild(taskList);
    taskContainer.insertBefore(taskList, taskContainer.children[0]);
  }
  inputTask.value = "";

  checkBox.addEventListener("click", completeItem);
  task.addEventListener("click", editItem);
  deleteIcon.addEventListener("click", deleteItem);
}
addTask.addEventListener("click", addItem);

function completeItem(e) {
  const target = e.target;
  if (target.previousSibling.style.textDecoration === "line-through") {
    target.previousSibling.style.textDecoration = "none";
    target.previousElementSibling.style.color = "#000";
  } else {
    target.previousSibling.style.textDecoration = "line-through";
    target.previousElementSibling.style.color = "#6b7280";
  }
}

function editItem(e) {
  const target = e.target;
  const item = target.innerHTML;
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = item;
  initialValue = item;
  editInput.classList.add("edit");
  editInput.select();
  target.replaceWith(editInput);
  editInput.addEventListener("dblclick", saveItem);
  editInput.addEventListener("keyup", saveItem);
}

function saveItem(e) {
  const target = e.target;
  if (target.value.length > 0 && (e.key === "Enter" || e.type === "dblclick")) {
    const div = document.createElement("div");
    div.innerText = target.value;
    target.replaceWith(div);
    div.addEventListener("click", editItem);
  } else if (
    target.value.length === 0 &&
    (e.key === "Enter" || e.type === "dblclick")
  ) {
    const div = document.createElement("div");
    div.innerText = target.value;
    div.innerText = initialValue;
    target.replaceWith(div);
    div.addEventListener("click", editItem);
  }
}

function deleteItem(e) {
  const target = e.target;
  target.parentElement.remove();
}

// add local storage
// add sort
// add Priority levels
