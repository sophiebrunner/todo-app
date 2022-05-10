let toDos = [];

function updateLocalStorage() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function syncToDos() {
  const toDosFromLocalStorage = localStorage.getItem("toDos");

  if (toDosFromLocalStorage) {
    toDos = JSON.parse(toDosFromLocalStorage);
  }
}

syncToDos();

//initial sync
//addToLocalStorage();

function renderToDoApp() {
  const toDoList = document.querySelector("#todo-list");
  toDoList.innerHTML = "";

  const filteredToDos = toDos.filter(checkFilterForToDo);
  filteredToDos.forEach((toDo) => renderSingleToDo(toDo));
}

function checkFilterForToDo(toDo) {
  const filter = getCurrentFilter();

  return (
    filter === "all" ||
    (filter === "open" && toDo.done === false) ||
    (filter === "done" && toDo.done === true)
  );
}

function renderSingleToDo(toDo) {
  const toDoList = document.querySelector("#todo-list");

  const toDoLi = document.createElement("li");

  const toDoCheckbox = document.createElement("input");
  toDoCheckbox.type = "checkbox";
  toDoCheckbox.checked = toDo.done;

  toDoCheckbox.addEventListener("change", () => {
    toDo.done = !toDo.done;
    updateLocalStorage();
    renderToDoApp();
  });

  toDoLi.appendChild(toDoCheckbox);

  toDoList.appendChild(toDoLi);

  const editInput = document.createElement("input");
  editInput.value = toDo.description;
  editInput.style.width = "100%";
  editInput.readOnly = true;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      editInput.readOnly = false;
      editBtn.textContent = "Save";
    } else if (editBtn.textContent === "Save") {
      editBtn.textContent = "Edit";
      editInput.readOnly = true;

      toDo.description = editInput.value;

      updateLocalStorage();
      renderToDoApp();
    }
  });

  toDoList.appendChild(editInput);

  toDoList.appendChild(editBtn);
  /*
  const toDoTextNode = document.createTextNode(toDo.description);
  toDoLi.appendChild(toDoTextNode);*/
}

const addToDoButton = document.querySelector("#add-todo");
addToDoButton.addEventListener("click", () => {
  const newToDoInput = document.querySelector("#new-todo");
  const newToDo = {
    description: newToDoInput.value,
    done: false,
  };

  toDos.push(newToDo);
  updateLocalStorage();

  newToDoInput.value = "";
  renderToDoApp();
});

renderToDoApp();

const toDoFilters = document.querySelector("#filter");
toDoFilters.addEventListener("change", (e) => {
  renderToDoApp();
});

function getCurrentFilter() {
  return document.querySelector('input[name="filter"]:checked').value;
}

const btnDeleteAll = document.querySelector("#btn-delete-all");
btnDeleteAll.addEventListener("click", (e) => {
  toDos = toDos.filter((toDo) => !toDo.done);
  updateLocalStorage();

  renderToDoApp();
});
//Another option
/*
function renderToDos() {
  const toDoList = document.querySelector("#todo-list");
  toDoList.innerHTML = "";

  todos.forEach((todo) => {
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
*/
