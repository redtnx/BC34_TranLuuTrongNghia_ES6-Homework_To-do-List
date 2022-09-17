let btnAddItem = document.getElementById("addItem");
let taskName = document.getElementById("newTask");

let tasks = getDataFromLocalStorage();
renderTaskList(tasks);

btnAddItem.addEventListener("click", function () {
  if (!taskName.value) {
    alert("What is your task?");
    return false;
  }

  let taskID = this.getAttribute("id");
  let tasks = getDataFromLocalStorage();
  let task = { name: taskName.value };

  if (taskID == 0 || taskID) {
    tasks[taskID] = task;
    this.removeAttribute("id");
    document.querySelector(".icon").innerHTML = "<i class='fa fa-plus'></i>";
  } else {
    tasks.push(task);
  }

  taskName.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskList(tasks);
});

// Edit task
function editTask(id) {
  let tasks = getDataFromLocalStorage();
  if (tasks.length > 0) {
    taskName.value = tasks[id].name;
    btnAddItem.setAttribute("id", id);
  }
  document.querySelector(".icon").innerHTML = "<i class='fa fa-heart'></i>";
}

// Delete task
function deleteTask(id) {
  if (confirm("Are you sure ?")) {
    let tasks = getDataFromLocalStorage();
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList(getDataFromLocalStorage());
  }
}

// Render task list
function renderTaskList(tasks = []) {
  let content = "";
  tasks.forEach((tasks, index) => {
    content += `
    <li>
    <div>${tasks.name}
    </div>
    <div>
    <i class="fa fa-check" onClick="completeTask(${index})"></i>
    <i class="fa fa-edit" onClick="editTask(${index})"></i>
    <i class="fa fa-trash" onClick="deleteTask(${index})"></i>
    </div>
    </li>
    `;
  });

  document.getElementById("todo").innerHTML = content;
}

function getDataFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
