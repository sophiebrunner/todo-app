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

  if (toDo.done === true) {
    toDoLi.style.textDecoration = "line-through";
  }

  const toDoCheckbox = document.createElement("input");
  toDoCheckbox.type = "checkbox";
  toDoCheckbox.checked = toDo.done;

  toDoCheckbox.addEventListener("change", () => {
    toDo.done = !toDo.done;
    updateLocalStorage();
  });

  toDoLi.appendChild(toDoCheckbox);

  toDoList.appendChild(toDoLi);

  const editInput = document.createElement("input");

  editInput.value = toDo.description;
  editInput.style.width = "min-content";
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

      if (editInput.value.length < 5) {
        alert("Please insert more than 5 characters.");
        editInput.readOnly = false;
        editBtn.textContent = "Save";
      } else {
        updateLocalStorage();
        renderToDoApp();
      }
    }
  });

  toDoLi.appendChild(editInput);

  toDoList.appendChild(editBtn);

  if (toDoCheckbox.checked === true) {
    toDoCheckbox.nextElementSibling.style.textDecoration = "line-through";
  } else {
    toDoCheckbox.nextElementSibling.style.textDecoration = "none";
  }
}

const addToDoWithButton = document.querySelector("#add-todo");
addToDoWithButton.addEventListener("click", addToDo);

const addToDoWithEnter = document.querySelector("#new-todo");
addToDoWithEnter.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToDo();
  }
});

function addToDo() {
  const newToDoInput = document.querySelector("#new-todo");
  const newToDo = {
    description: newToDoInput.value,
    done: false,
  };
  if (newToDoInput.value.length < 5) {
    alert("Please insert at least 5 characters.");
  } else {
    toDos.push(newToDo);
    updateLocalStorage();

    newToDoInput.value = "";
    renderToDoApp();
  }
}

renderToDoApp();
updateLocalStorage();

const toDoFilters = document.querySelector("#filter");
toDoFilters.addEventListener("change", (e) => {
  renderToDoApp();
});

function getCurrentFilter() {
  return document.querySelector('input[name="filter"]:checked').value;
}

renderToDoApp();

const btnDeleteAll = document.querySelector("#btn-delete-all");
btnDeleteAll.addEventListener("click", (e) => {
  toDos = toDos.filter((toDo) => !toDo.done);
  updateLocalStorage();
  renderToDoApp();
});

function changeDoneStyle(e) {
  if (e.target.checked === true) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
  } else {
    e.target.nextElementSibling.style.textDecoration = "none";
  }
}

const toDoList = document.querySelector("#todo-list");
toDoList.addEventListener("change", changeDoneStyle);

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
