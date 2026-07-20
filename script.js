const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("task-container");
const totalTasks = document.getElementById("total-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const themeToggle = document.getElementById("theme-toggle");

function createTask(taskText) {
    const task = document.createElement("div");
    task.classList.add("task");

    const taskContent = document.createElement("label");
    taskContent.classList.add("task-content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskText.completed;

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText.text;

    if (taskText.completed) {
        taskSpan.style.textDecoration = "line-through";
    }

    taskContent.append(checkbox);
    taskContent.append(taskSpan);

    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {
            taskSpan.style.textDecoration = "line-through";
        } else {
            taskSpan.style.textDecoration = "none";

        }
        taskText.completed = checkbox.checked;

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        updateCounters()

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

    taskContainer.append(task);
    updateCounters();

    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t !== taskText);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        task.remove();
        updateCounters()

    });

    editBtn.addEventListener("click", () => {

        if (editBtn.textContent === "Edit") {

            taskSpan.contentEditable = true;
            taskSpan.focus();
            checkbox.disabled = true;
            editBtn.textContent = "Save";

        } else {

            taskSpan.contentEditable = false;
            editBtn.textContent = "Edit";
            taskText.text = taskSpan.textContent;

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            checkbox.disabled = false;
        }


    });

}


function updateCounters() {
    const total = document.querySelectorAll(".task").length
    const completed = document.querySelectorAll(".task input[type = 'checkbox']:checked").length

    const pending = total - completed

    totalTasks.textContent = total;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;
}

tasks.forEach((task) => {
    createTask(task);
});



addTaskBtn.addEventListener("click", () => {
    if (taskInput.value === "") {
        return;
    }

    const taskText = taskInput.value;

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    createTask(newTask);

    taskInput.value = "";
    updateCounters();


});


 const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");
    }
});
