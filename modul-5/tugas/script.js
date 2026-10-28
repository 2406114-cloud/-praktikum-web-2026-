document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil elemen DOM
  const todoForm = document.querySelector("#todoForm");
  const taskInput = document.querySelector("#taskInput");
  const inputError = document.querySelector("#inputError");
  const todoList = document.querySelector("#todoList");
  const taskCounter = document.querySelector("#taskCounter");
  const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

  // 2. Fungsi LocalStorage
  const getTasks = () => {
    try {
      return JSON.parse(localStorage.getItem("todo_tasks")) || [];
    } catch (error) {
      return [];
    }
  };

  const saveTasks = (tasks) => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  };

  // 3. Fitur 1: Task Counter
  const updateCounter = (tasks) => {
    const total = tasks.length;
    const selesai = tasks.filter((task) => task.completed).length;
    const belumSelesai = total - selesai;

    taskCounter.textContent =
      `Total: ${total} Tugas | Selesai: ${selesai} | Belum Selesai: ${belumSelesai}`;
  };

  // 4. Render daftar tugas
  const renderTasks = () => {
    const tasks = getTasks();
    todoList.innerHTML = "";
    updateCounter(tasks);

    if (tasks.length === 0) {
      const p = document.createElement("p");
      p.className = "empty-message";
      p.textContent = "Belum ada tugas tersimpan.";
      todoList.appendChild(p);
      return;
    }

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `todo-item ${task.completed ? "completed" : ""}`;

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = task.text;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const completeBtn = document.createElement("button");
      completeBtn.type = "button";
      completeBtn.className = "action-btn complete-btn";
      completeBtn.dataset.index = index;
      completeBtn.textContent = task.completed ? "Batal" : "Selesai";

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.dataset.index = index;
      deleteBtn.textContent = "Hapus";

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);

      todoList.appendChild(li);
    });
  };

  // 5. Tambah tugas
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    // Validasi input
    if (taskText.length < 3) {
      taskInput.classList.add("error");
      inputError.style.display = "block";
      return;
    }

    taskInput.classList.remove("error");
    inputError.style.display = "none";

    const tasks = getTasks();
    tasks.push({
      text: taskText,
      completed: false
    });

    saveTasks(tasks);
    taskInput.value = "";
    renderTasks();
  });

  // 6. Event delegation untuk tombol Selesai/Batal dan Hapus
  todoList.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const index = Number(button.dataset.index);
    if (Number.isNaN(index)) return;

    const tasks = getTasks();
    if (!tasks[index]) return;

    // Tombol Selesai / Batal
    if (button.classList.contains("complete-btn")) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      renderTasks();
      return;
    }

    // Fitur 3: Konfirmasi sebelum menghapus
    if (button.classList.contains("delete-btn")) {
      const yakin = confirm("Apakah Anda yakin ingin menghapus tugas ini?");

      if (!yakin) {
        return; // Cancel: tugas batal dihapus
      }

      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    }
  });

  // 7. Fitur 2: Bersihkan hanya tugas completed: true
  clearCompletedBtn.addEventListener("click", () => {
    const tasks = getTasks();
    const tugasBelumSelesai = tasks.filter((task) => !task.completed);

    saveTasks(tugasBelumSelesai);
    renderTasks();
  });

  // 8. Hilangkan error saat input sudah valid
  taskInput.addEventListener("input", () => {
    if (taskInput.value.trim().length >= 3) {
      taskInput.classList.remove("error");
      inputError.style.display = "none";
    }
  });

  // 9. Render awal
  renderTasks();
});