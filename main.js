import { create_id, kill_many } from "./utilities.js";
import { create_todo_dom } from "./todom.js";
import { create_todo } from "./todo.js";

const unchecked = document.querySelector(".to-check");
const checked = document.querySelector(".to-checked");
const clear = document.querySelector(".clear-div");
const pop = document.querySelector(".add-todo");
const closeModal = document.querySelector(".create-todo-modal .close");
const cancel = document.querySelector(".create-todo-modal .cancel");
const modal = document.querySelector(".create-todo-modal");
const addTodo = document.querySelector(".create-todo-modal .modal-content");
const warningModal = document.querySelector(".warning-modal");
const userDataString = "_todo_user_data_";
const todos = localStorage.getItem(userDataString) ? JSON.parse(localStorage.getItem(userDataString)) : [];
const extInterface = {
    array : todos,
    warning : warningModal,
    userDataString, 
    checked, 
    unchecked
};

clear.addEventListener("click", () => {
    kill_many(todos, todo => todo.checked);
    checked.innerHTML = '';
});

addTodo.addEventListener("submit", event => {
    event.preventDefault();
    let todo;

    todo = create_todo(addTodo["new-title"].value, addTodo["new-description"].value, addTodo["new-date"].value, create_id(25), false);
    todos.push(todo);
    unchecked.append(create_todo_dom(todo, checked, unchecked, todos));
    //unchecked.append(create_todo_dom(todo, extInterface));
    close_modal();
});

pop.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", close_modal);

cancel.addEventListener("click", close_modal);

function close_modal() {
    modal.style.display = "none";
    addTodo.reset();
}