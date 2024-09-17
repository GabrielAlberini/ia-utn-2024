document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  const startListeningButton = document.querySelector("#record");
  const tasksList = document.querySelector(".tasks");
  const filterPriority = document.querySelector("#filter-priority");
  const filterStatus = document.querySelector("#filter-status");

  let tasks = [];
  let recognizing = false;
  let editingTaskId = null;

  recognition.continuous = true;
  recognition.lang = "es";

  startListeningButton.addEventListener("click", toggleSpeechRecognition);

  filterPriority.addEventListener("change", renderTasks);
  filterStatus.addEventListener("change", renderTasks);

  function toggleSpeechRecognition() {
    if (recognizing) {
      recognizing = false;
      startListeningButton.innerHTML = '<i class="bx bx-microphone"></i>';
      startListeningButton.classList.remove("recording");
      recognition.stop();
    } else {
      recognizing = true;
      startListeningButton.innerHTML = '<i class="bx bx-loader bx-spin"></i>';
      startListeningButton.classList.add("recording");
      recognition.start();
    }
  }

  recognition.onresult = (event) => {
    const taskText = event.results[event.results.length - 1][0].transcript;
    if (editingTaskId) {
      editTask(taskText);
    } else {
      console.log(taskText);
      addTask(taskText);
    }
  };

  function addTask(taskText) {
    let priority = null;

    if (taskText.includes("prioridad alta")) {
      priority = "alta";
      taskText = taskText.replace("prioridad alta", "- 🔥").trim();
    } else if (taskText.includes("prioridad media")) {
      priority = "media";
      taskText = taskText.replace("prioridad media", "- 🧊").trim();
    } else if (taskText.includes("prioridad baja")) {
      priority = "baja";
      taskText = taskText.replace("prioridad baja", "- 🌿").trim();
    } else {
      priority = "baja";
    }

    // Crea la tarea
    const task = {
      id: crypto.randomUUID(),
      text: taskText.charAt(0).toUpperCase() + taskText.slice(1),
      done: false,
      priority,
    };

    tasks.unshift(task);
    saveTasksToLocalStorage();
    renderTasks();
  }

  function editTask(newText) {
    const task = tasks.find((task) => task.id === editingTaskId);
    if (task) {
      task.text = newText.charAt(0).toUpperCase() + newText.slice(1) + ".";
      editingTaskId = null;
      saveTasksToLocalStorage();
      renderTasks();
    }
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }

    tasksList.innerHTML = "";

    const selectedPriority = filterPriority.value;
    const selectedStatus = filterStatus.value;

    const filteredTasks = tasks.filter((task) => {
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "completed" && task.done) ||
        (selectedStatus === "pending" && !task.done);
      return matchesPriority && matchesStatus;
    });

    filteredTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task");
      taskItem.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""} />
        <span class="${task.done ? "task-done" : ""}">${task.text}</span>
        <button class="edit-task"><i class="bx bx-edit"></i></button>
        <button class="delete-task"><i class="bx bx-trash"></i></button>
      `;

      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        toggleTaskDone(task.id, checkbox.checked);
      });

      taskItem.querySelector(".edit-task").addEventListener("click", () => {
        editingTaskId = task.id;
        toggleSpeechRecognition();
      });

      taskItem.querySelector(".delete-task").addEventListener("click", () => {
        deleteTask(task.id);
      });

      tasksList.appendChild(taskItem);
    });
  }

  // function renderTasks() {
  //   const savedTasks = localStorage.getItem("tasks");
  //   if (savedTasks) {
  //     tasks = JSON.parse(savedTasks);
  //   }

  //   tasksList.innerHTML = "";

  //   tasks.forEach((task) => {
  //     const taskItem = document.createElement("li");
  //     taskItem.classList.add("task");
  //     taskItem.innerHTML = `
  //       <input type="checkbox" ${task.done ? "checked" : ""} />
  //       <span class="${task.done ? "task-done" : ""}">${task.text}</span>
  //       <button class="edit-task"><i class="bx bx-edit"></i></button>
  //       <button class="delete-task"><i class="bx bx-trash"></i></button>
  //     `;

  //     const checkbox = taskItem.querySelector("input[type='checkbox']");
  //     checkbox.addEventListener("change", () => {
  //       toggleTaskDone(task.id, checkbox.checked);
  //     });

  //     taskItem.querySelector(".edit-task").addEventListener("click", () => {
  //       editingTaskId = task.id;
  //       toggleSpeechRecognition(); // Activar reconocimiento de voz para la edición
  //     });

  //     taskItem.querySelector(".delete-task").addEventListener("click", () => {
  //       deleteTask(task.id);
  //     });

  //     tasksList.appendChild(taskItem);
  //   });
  // }

  function toggleTaskDone(taskId, isChecked) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.done = isChecked;
      saveTasksToLocalStorage();
      renderTasks();
    }
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
  }

  renderTasks();
});
