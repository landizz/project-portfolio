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

Saving a task in local memory storage:
    Need to create a object based on Window.localStorage
    .setItem() take key value pairs, and strings only.
    Need to save user data, due date, the priority as well as the position in document.
    Thinking if I can save it nested, with a key value of 1,2,3,4,5...
    for each corresponding position in the document.

    The nested keys and values would then be input, date, priority. 

    {1, {"input":"Task text","date":"2024-06-06","priority", "High Priority"}}
    This could then later be used to repopulate the document with add task.
/*
Deleting a task:


Editing a task:


*/


addTaskButton = document.getElementById("add-task-button");

//Event listener to repopulate the tasks when user loads website
addEventListener("DOMContentLoaded", (e) => {
    for (let i=0; localStorage.length>=i; i++){
        console.log(localStorage.getItem(i.toString()));
        storedObject = JSON.parse(localStorage.getItem(i.toString()));
        AddTask(storedObject.data, storedObject.date, storedObject.priority);
    }
    
})

addTaskButton.addEventListener("click", () => {
    taskData = document.getElementById("task-text-field").value;
    taskDate = document.getElementById("date-field").value;
    taskPriority = document.getElementById("priority-list").value;

    AddTask(taskData, taskDate, taskPriority);
    SaveTask(taskData, taskDate, taskPriority);
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
    dateNode = document.createTextNode(`Due date: ${date}`);
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

    //Handles the priority level and modifies the border based on it.
    switch (priority){
        case "High priority":
            taskContainer.style.border = "1px solid red";
            break;

        case "Medium priority":
            taskContainer.style.border = "1px solid yellow";
            break;

        case "Low priority":
            taskContainer.style.border = "1px solid green";
            break;
    }
}


function SaveTask(data, date, priority){
    dataObj = {"data":data, "date":date, "priority":priority};
    dataObjStr = JSON.stringify(dataObj);
    index = localStorage.length.toString();

    try {
        localStorage.setItem(index, dataObjStr);
        console.log(`Added ${dataObjStr} to index ${index} at localStorage`);
    }
    catch (e){
        console.log(e);
    }
}