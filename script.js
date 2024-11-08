const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
}

function createTaskElement(taskText, completed = false) {
  const taskItem = document.createElement("li");
  if (completed) taskItem.classList.add("completed");
  
  taskItem.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;
  
  taskList.appendChild(taskItem);
}

function toggleComplete(taskElement) {
  const taskItem = taskElement.parentElement;
  taskItem.classList.toggle("completed");
  updateLocalStorage();
}

function deleteTask(buttonElement) {
  const taskItem = buttonElement.parentElement;
  taskList.removeChild(taskItem);
  updateLocalStorage();
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map(task => ({
    text: task.querySelector("span").innerText,
    completed: task.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
