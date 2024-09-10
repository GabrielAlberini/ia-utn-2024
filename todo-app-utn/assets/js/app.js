document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  const startListeningButton = document.querySelector("#record");
  const tasksList = document.querySelector(".tasks");

  let tasks = [];

  let recognizing = false;

  recognition.continuous = true;
  recognition.lang = "es";

  startListeningButton.addEventListener("click", toggleSpeechRecognition);

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
    addTask(taskText);
  };

  function addTask(taskText) {
    const task = {
      id: crypto.randomUUID(),
      text: taskText.charAt(0).toUpperCase() + taskText.slice(1) + ".",
      done: false,
    };

    tasks.unshift(task);
    saveTasksToLocalStorage();
    renderTasks();
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    // Recuperar las tareas del localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }

    // Vaciar la lista de tareas actual
    tasksList.innerHTML = "";

    // Iterar sobre las tareas y crear el HTML correspondiente
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task");
      taskItem.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""} />
        <span class="${task.done ? "task-done" : ""}">${task.text}</span>
        <button class="delete-task">
          <i class="bx bx-trash"></i>
        </button>
      `;

      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        toggleTaskDone(task.id, checkbox.checked);
      });

      taskItem.querySelector(".delete-task").addEventListener("click", () => {
        deleteTask(task.id);
      });

      tasksList.appendChild(taskItem);
    });
  }

  function toggleTaskDone(taskId, isChecked) {
    // Buscar la tarea por ID y actualizar su propiedad 'done'
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.done = isChecked;
      saveTasksToLocalStorage();
      renderTasks();
    }
  }

  function deleteTask(taskId) {
    // Filtrar la lista de tareas para eliminar la tarea con el ID especificado
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
  }

  renderTasks();
});
