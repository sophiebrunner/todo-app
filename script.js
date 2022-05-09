const state = {
  todos: [
    { description: "Learn HTML", done: true },
    { description: "Learn CSS", done: false },
    { description: "Learn JavaScript", done: false },
  ],
};

//First option
/*
function renderToDos() {
  const toDoList = document.querySelector("#todo-list");
  toDoList.innerHTML = "";

  state.todos.forEach((todo) => {
    const toDoLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", (e) => {
      const newToDoDoneState = e.target.checked;
      todo.done = newToDoDoneState;
    });

    toDoLi.appendChild(checkbox);

    const toDoText = document.createTextNode(todo.description);
    toDoLi.appendChild(toDoText);

    toDoList.appendChild(toDoLi);
  });
}
*/

//Second option
function renderToDos() {
  const toDoList = document.querySelector("#todo-list");
  toDoList.innerHTML = "";

  state.todos.forEach((todo) => {
    const toDoLi = document.createElement("li");

    toDoLi.toDoObj = todo;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    toDoLi.appendChild(checkbox);

    const toDoText = document.createTextNode(todo.description);
    toDoLi.appendChild(toDoText);

    toDoList.appendChild(toDoLi);
  });
}

renderToDos();

const toDoList = document.querySelector("#todo-list");
toDoList.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.toDoObj;

  todo.done = checkbox.checked;
});
