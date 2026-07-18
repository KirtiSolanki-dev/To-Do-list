const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("task-container");

addTaskBtn.addEventListener("click", () => {
    if (taskInput.value === "") {
        return;
    }

    const taskText = taskInput.value;

    const task = document.createElement("div");
    task.classList.add("task");

    const taskContent = document.createElement("label");
    taskContent.classList.add("task-content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    taskContent.append(checkbox);
    taskContent.append(taskSpan);

    checkbox.addEventListener("change", () => {

    if (checkbox.checked) {
        taskSpan.style.textDecoration = "line-through";
    } else {
        taskSpan.style.textDecoration = "none";
    }

});

    task.append(taskContent);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    taskActions.append(editBtn);
    taskActions.append(deleteBtn);

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    task.append(taskActions);

    taskInput.value = "";

     taskContainer.append(task);

     deleteBtn.addEventListener("click", ()=>{
     task.remove();

});
  
editBtn.addEventListener("click", () => {

    if (editBtn.textContent === "Edit") {

        taskSpan.contentEditable = true;
        taskSpan.focus();
        checkbox.disabled= true;
        editBtn.textContent = "Save";

    } else {

        taskSpan.contentEditable = false;
        editBtn.textContent = "Edit";
         checkbox.disabled= false;
    }

});

});

