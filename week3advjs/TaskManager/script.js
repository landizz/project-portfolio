/*
Adding a new task:
    Create objects of text field, date field and select list.
    Add listen event on button "Add task" for click, id="add-task-button"
    When clicked retrieve text field input, date field input and select list input
    Create a div in "task-list-container" with class "task-container"
    Text data presented in <p> of "task-list-container"
    Priority presented by border color, red for highest green for lowest, no priority is black.
    Date presented before text data.

    Add sub div with delete and edit button to task div, class="task-mod-buttons"
    Save tasks to local storage memory.
*/

/*
Deleting a task:


Editing a task:


*/


addTaskButton = document.getElementById("add-task-button");


addTaskButton.addEventListener("click", () => {
    taskData = document.getElementById("task-text-field").value;
    taskDate = document.getElementById("date-field").value;
    taskPriority = document.getElementById("priority-list").value;

    AddTask(taskData, taskDate, taskPriority);
});

function AddTask(data, date, priority){
    //Creates all necessary elements with their associated classes or id's, along with values, types etc..
    rootContainer = document.getElementById("task-list-container");

    taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task-container");
    rootContainer.appendChild(taskContainer);

    dataElement = document.createElement("p");
    textNode = document.createTextNode(data);
    dataElement.appendChild(textNode);
    taskContainer.appendChild(dataElement);

    dateElement = document.createElement("p");
    dateNode = document.createTextNode("Due date:"+date);
    dateElement.appendChild(dateNode);
    dateElement.setAttribute("class", "task-date");
    taskContainer.appendChild(dateElement);

    subTaskContainer = document.createElement("div");
    subTaskContainer.setAttribute("class", "task-mod-buttons");
    taskContainer.appendChild(subTaskContainer);

    editTaskButton = document.createElement("input");
    editTaskButton.setAttribute("type", "button");
    editTaskButton.setAttribute("id", "edit-task-button");
    editTaskButton.setAttribute("value", "Edit Task");
    subTaskContainer.appendChild(editTaskButton);

    deleteTaskButton = document.createElement("input");
    deleteTaskButton.setAttribute("type", "button");
    deleteTaskButton.setAttribute("id", "delete-task-button");
    deleteTaskButton.setAttribute("value", "Delete Task");
    subTaskContainer.appendChild(deleteTaskButton);
}