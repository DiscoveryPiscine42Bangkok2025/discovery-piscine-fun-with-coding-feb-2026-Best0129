$(document).ready(function() {

  loadTodos();

  $("#newBtn").click(function() {

    const text = prompt("Enter a new TO DO:");

    if (!text || text.trim() === "") {
      return;
    }

    addTodo(text);
    saveTodos();

  });

  function addTodo(text) {

    const $div = $("<div></div>");
    $div.addClass("todo");
    $div.text(text);

    $div.click(function() {

      const confirmDelete = confirm("Do you want to delete this TO DO?");

      if (confirmDelete) {
        $(this).remove();
        saveTodos();
      }

    });

    $("#ft_list").prepend($div);
  }

  function saveTodos() {

    const todos = [];

    $(".todo").each(function() {
      todos.push($(this).text());
    });

    document.cookie =
      "todos=" +
      encodeURIComponent(JSON.stringify(todos)) +
      "; path=/";
  }

  function loadTodos() {

    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {

      if (cookie.startsWith("todos=")) {

        const data = cookie.substring(6);
        const todos = JSON.parse(decodeURIComponent(data));

        $.each(todos, function(index, todo) {
          addTodo(todo);
        });
      }
    }
  }

});
