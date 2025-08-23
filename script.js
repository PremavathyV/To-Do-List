const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  taskContainer.innerHTML = "";
  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const note = document.createElement("div");
    note.className = "note";
    if (task.completed) note.classList.add("completed");

    // Random sticky note color
    const colors = ["#ffeb3b", "#ffd54f", "#81d4fa", "#ffab91", "#c5e1a5"];
    note.style.background = colors[index % colors.length];

    note.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${index})">
        <span>${task.text}</span>
      </div>
      <div class="actions">
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskContainer.appendChild(note);

    if (task.completed) completedCount++;
  });

  counter.textContent = `Total: ${tasks.length} | Completed: ${completedCount}`;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => renderTasks(btn.dataset.filter));
});

renderTasks();
