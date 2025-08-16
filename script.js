const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addBtn");

// بارگذاری کارها از localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((t) => createTask(t.text, t.completed));
};

// وصل کردن دکمه Add Task
addButton.addEventListener("click", addTask);

// تابع اضافه کردن کار
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    createTask(text, false);
    taskInput.value = "";
    saveTasks();
  }
}

// ساخت آیتم کار
function createTask(text, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.classList.add("completed");

  const check = document.createElement("span");
  check.textContent = "✔";
  check.className = "icons";
  check.onclick = () => {
    span.classList.toggle("completed");
    saveTasks();
  };

  const del = document.createElement("span");
  del.textContent = "🗑️";
  del.className = "icons";
  del.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.append(span, check, del);
  taskList.appendChild(li);
}

// ذخیره کارها در localStorage
function saveTasks() {
  const tasks = [...taskList.children].map((li) => {
    const textSpan = li.querySelector("span:first-child");
    return {
      text: textSpan.textContent,
      completed: textSpan.classList.contains("completed"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
