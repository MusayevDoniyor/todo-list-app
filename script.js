const container = document.getElementById("tasksWrapper");
const tasksContainer = document.getElementById("tasks");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: 1,
    title: "Learn Coding",
    done: false,
  },

  {
    id: 2,
    title: "Upload homework",
    done: false,
  },

  {
    id: 3,
    title: "Edit video",
    done: true,
  },
];

let messageData = {
  type: "",
  text: "",
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";

  if (messageData.text) {
    const message = document.createElement("p");

    if (messageData.type) {
      message.innerHTML = messageData.text;
    }

    if (messageData.type === "updated" || messageData.type === "added") {
      message.style.color = "green";
    } else if (messageData.type === "deleted") {
      message.style.color = "red";
    }

    tasksContainer.append(message);

    setTimeout(() => {
      message.remove();
      messageData.text = "";
      messageData.type = "";
    }, 2500);
  }

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
    <h3 class="fs-4">${task.title}</h3>
    
    <div class="d-flex gap-1">
        <button onclick="changeTaskDone(${task.id})" class="btn">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button onclick="deleteTask(${task.id})" class="btn">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
  `;

      if (task.done) taskItem.classList.add("text-decoration-line-through");

      taskItem.classList.add(
        "d-flex",
        "justify-content-between",
        "rounded-2",
        "p-1"
      );

      tasksContainer.append(taskItem);
    });
  } else {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.classList.add("text-center", "text-muted", "fs-5");
    noTasksMessage.textContent = "No Tasks Available";
    tasksContainer.append(noTasksMessage);
  }
};

const addTask = () => {
  const newTask = {
    id: tasks.length * Math.random(),
    title: taskInput.value.trim(),
    done: false,
  };

  if (newTask.title !== "") {
    tasks.push(newTask);
    taskInput.value = "";

    console.log(tasks);
    messageData.type = "added";
    messageData.text = "Todo item Added Successfully.";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  } else {
    messageData.text = "Please enter a task title.";
  }
};

const changeTaskDone = (taskId) => {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.done = !task.done;
    messageData.type = "updated";
    messageData.text = "Todo item Updated Successfully.";
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
  }
};

const deleteTask = (taskId) => {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    tasks = tasks.filter((t) => t.id !== task.id);
    messageData.type = "deleted";
    messageData.text = "Todo item Deleted Successfully.";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
};

addTaskBtn.addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
