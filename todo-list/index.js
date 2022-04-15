const todo = new Todo();
//console.log(todo);
const todoInput = document.querySelector("#getTodoInput");
const todolistContainer = document.querySelector("#todolistContainer");
function addTodo() {
  const inputvalue = todoInput.value;
  if (inputvalue === "") {
    alert("enter valid todo");
    return;
  }
  todo.addTodo(inputvalue);
  console.log(todo.todos);
  emptyInput();
  renderList();
}
/*
 <li>
          <div class="inputBox">
            <input
              type="text"
              class="input"
              placeholder="Enter a to do list item"
            />
            <span class="cross-icon">X</span>
          </div>
        </li>
*/

const emptyNode = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const renderList = () => {
  emptyNode(todolistContainer);
  todo.getToDos().map((todo) => {
    const LI = document.createElement("li");
    const DIV = document.createElement("div");
    const INPUT = document.createElement("input");
    const SPAN = document.createElement("span");
    DIV.classList.add("inputBox");
    INPUT.type = "text";
    INPUT.value = todo.value;
    INPUT.setAttribute("disabled", "");
    INPUT.setAttribute("id", "input" + todo.id);
    INPUT.setAttribute("onKeyUp", "onInputEdit(event)");
    SPAN.classList.add("cross-icon");
    SPAN.innerText = "X";
    SPAN.setAttribute("id", todo.id);
    DIV.appendChild(INPUT);
    DIV.appendChild(SPAN);
    LI.appendChild(DIV);
    todolistContainer.appendChild(LI);
  });
};
function onInputEdit(e) {
  if (e.key !== "Enter") {
    return;
  }
  const id = e.target.id.slice(5);
  if (!id) return;
  const inputBoxValue = e.target.value;
  todo.updateTodo(id, inputBoxValue);
  renderList();
}
function handleClick(e) {
  if (e && e.target && e.target.id && e.target.nodeName === "SPAN") {
    todo.deleteTodo(e.target.id);
    renderList();
  }
}

function handleDoubleClick(e) {
  const id = e.target.id;
  if (!id) {
    return;
  }
  const inputBox = document.querySelector("#" + id);
  inputBox.removeAttribute("disabled");
}

function emptyInput() {
  todoInput.value = "";
}
