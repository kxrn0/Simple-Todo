export function create_todo_dom(todoObj, extInterface) {
    const todo = document.createElement("div");
    const grab = document.createElement("button");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const date = document.createElement("div");
    const dateLabel = document.createElement("label");
    const dateInput = document.createElement("input");
    const controls = document.createElement("div");
    const checkmark = document.createElement("div");
    const checkInput = document.createElement("input");
    const checkLabel = document.createElement("label");
    const deleteButton = document.createElement("button");

    todo.append(grab);
    todo.append(title);
    todo.append(description);
    todo.append(date);
    date.append(dateLabel);
    date.append(dateInput);
    todo.append(controls);
    controls.append(checkmark);
    checkmark.append(checkInput);
    checkmark.append(checkLabel);
    controls.append(deleteButton);

    todo.classList.add("todo");
    todo.classList.add(todoObj.checked ? "checked" : "unchecked");
    grab.classList.add("grab");
    date.classList.add("date");
    controls.classList.add("controls");
    checkmark.classList.add("checkmark");
    deleteButton.classList.add("delete");

    title.innerText = todoObj.name;
    description.innerText = todoObj.description;
    dateLabel.innerText = "Due Date"
    dateLabel.setAttribute("for", `date-${todoObj.id}`);
    dateInput.setAttribute("name", `date-${todoObj.id}`);
    dateInput.setAttribute("type", "date");
    dateInput.value = todoObj.duedate;
    checkLabel.innerText = "Done!";
    checkLabel.setAttribute("for", `check-${todoObj.id}`);
    checkInput.setAttribute("name", `check-${todoObj.id}`);
    checkInput.id = `check-${todoObj.id}`;
    checkInput.checked = todoObj.checked;
    checkInput.setAttribute("type", "checkbox");

    checkInput.addEventListener("click", () => {
        todo.classList.toggle("checked");
        todo.classList.toggle("unchecked");
        todoObj.checked = checkInput.checked;

        if (checkInput.checked) {
            extInterface.unchecked.removeChild(todo);
            extInterface.checked.append(todo);
        }
        else {
            extInterface.checked.removeChild(todo);
            extInterface.unchecked.append(todo);
        }
        localStorage.setItem(extInterface.userDataString, JSON.stringify(extInterface.array));
        todo.scrollIntoView({ behavior: "smooth" });
    });

    dateInput.addEventListener("change", () => {
        todoObj.duedate = dateInput.value;
        localStorage.setItem(extInterface.userDataString, JSON.stringify(extInterface.array));
    });

    deleteButton.addEventListener("click", () => {
        let name, deleteWarning, cancelWarning;

        name = extInterface.warning.querySelector(".warning-info p");
        name.innerText = todoObj.name;
        extInterface.warning.style.display = "flex";

        deleteWarning = extInterface.warning.querySelector(".warning-delete");
        cancelWarning = extInterface.warning.querySelector(".warning-cancel");
        
        deleteWarning.addEventListener("click", delete_todo);

        cancelWarning.addEventListener("click", hide);

        function delete_todo() {
            let index;

            index = extInterface.array.findIndex(todo => todo.id == todoObj.id);
            extInterface.array.splice(index, 1);
            todo.parentElement.removeChild(todo);
            localStorage.setItem(extInterface.userDataString, JSON.stringify(extInterface.array));
            hide();
        }

        function hide() {
            extInterface.warning.style.display = "none";
            deleteWarning.removeEventListener("click", delete_todo);
            cancelWarning.removeEventListener("click", hide);
        }
    });

    return todo;
}