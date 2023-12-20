const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");

addTask.addEventListener("click", function() {
    const taskList = document.createElement("div");
    taskList.classList.add("taskList");

    const task = document.createElement("div");
    task.classList.add("task");
    taskList.appendChild(task);
    task.innerText = inputTask.value;

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "checkTask");
    taskList.appendChild(checkBox);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash-can");
    taskList.appendChild(deleteIcon);

    if(inputTask.value.trim() === "") {
        alert("It's empty please type a task");
    } else {
        taskContainer.appendChild(taskList);
        taskContainer.insertBefore(taskList, taskContainer.children[0]);
    };
    inputTask.value = "";

    checkBox.addEventListener("click", function() {
        if(checkBox.parentElement.style.textDecoration === "line-through") {
            checkBox.parentElement.style.textDecoration = "none";
        } else {
            checkBox.parentElement.style.textDecoration = "line-through";
            /* add color */
            checkBox.parentElement.style.color = "";
        };
    });
    
    deleteIcon.addEventListener("click", function(e) {
        const target = e.target;
        target.parentElement.remove();
    });
});

// add local storage