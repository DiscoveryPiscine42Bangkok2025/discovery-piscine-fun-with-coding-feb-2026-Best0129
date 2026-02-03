const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

loadTodos();

newBtn.addEventListener("click", () => {

  const text = prompt("Enter a new TO DO:");

  if (!text || text.trim() === "") {
    return;
  }

  addTodo(text);
  saveTodos();
});

function addTodo(text) {

  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", () => {

    const confirmDelete = confirm("Do you want to delete this TO DO?");

    if (confirmDelete) {
      div.remove();
      saveTodos();
    }

  });

  list.prepend(div);
}

function saveTodos() {

  const todos = [];

  document.querySelectorAll(".todo").forEach(todo => {
    todos.push(todo.textContent);
  });

  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {

  const cookies = document.cookie.split("; ");

  for (let cookie of cookies) {

    if (cookie.startsWith("todos=")) {

      const data = cookie.substring(6);
      const todos = JSON.parse(decodeURIComponent(data));

      todos.forEach(todo => {
        addTodo(todo);
      });
    }
  }
}
