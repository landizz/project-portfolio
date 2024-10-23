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
    Listen for button click
    Parent element of parent element of button click
    replacechildren and the task-container element
    Remove from localStorage

Editing a task:


*/


addTaskButton = document.getElementById("add-task-button");

//Event listener to repopulate the tasks when user loads website
addEventListener("DOMContentLoaded", (e) => {
    for (let i=0; localStorage.length>i; i++){
        console.log(localStorage.getItem(i.toString()));
        storedObject = JSON.parse(localStorage.getItem(i.toString()));
        AddTask(storedObject.index, storedObject.data, storedObject.date, storedObject.priority);
    }
});

document.getElementById("remove-all-tasks").addEventListener("click", () =>{
    console.log("Local Storage cleared");
    localStorage.clear();
})

addTaskButton.addEventListener("click", () => {
    taskData = document.getElementById("task-text-field").value;
    taskDate = document.getElementById("date-field").value;
    taskPriority = document.getElementById("priority-list").value;

    taskIndex = SaveTask(null, taskData, taskDate, taskPriority);
    AddTask(taskIndex, taskData, taskDate, taskPriority);
    
});

document.getElementById("task-list-container").addEventListener("click", () => {
    //Sets a general listener event on root div for task containers.
    //Based on the active elements id, two different functions are called
    //with the active element object.
    switch (document.activeElement.id){
        case "delete-task-button":
            console.log(`Button with id: ${document.activeElement.id}, calling delete function`);
            DeleteTask(document.activeElement);
            break;
        case "edit-task-button":
            console.log(`Button with id: ${document.activeElement.id}, calling edit function`);
            EditTask(document.activeElement);
            break;
    }
});


//Takes the active element object
//First makes sure that the object exists in storage before trying to delete it, otherwise raise error.
//If it exists, it deletes it from localStorage first
//Then removes all children of the element, and finally the element itself.
function DeleteTask(buttonObj){
    taskRootElement = buttonObj.parentElement.parentElement;
    taskIndex = taskRootElement.getAttribute("data-index").toString();
    console.log(localStorage.getItem(taskIndex));

    try {
        if (!localStorage.getItem(taskIndex)){
            throw error;
        }
        else {
            console.log(`Removing ${localStorage.getItem(taskIndex)}`);
            localStorage.removeItem(taskIndex);
            console.log(`${localStorage.getItem(taskIndex)}`);
            while (taskRootElement.hasChildNodes()){
                console.log(`${taskRootElement} has child ${taskRootElement.firstChild}. Removing child...`);
                taskRootElement.removeChild(taskRootElement.firstChild);
                
            }
            taskRootElement.remove();
        }
    }
    catch {
        console.log(`${error}, item ${taskRootElement} does not exist in localStorage`);
    }
}

function AddTask(index, data, date, priority){
    //Creates all necessary elements with their associated classes or id's, along with values, types etc..
    rootContainer = document.getElementById("task-list-container");

    taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task-container");
    taskContainer.setAttribute("data-index", index);
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

function SaveTask(index, data, date, priority){
    //Data can only be stored as strings in a key:value pair for localStorage.
    //To nest data I need to create an object, stringify it
    //and then store it.
    //I use the length to create indexes for the tasks
    //This allow me to keep track of the original order of user input.
    if (!index){
        index = localStorage.length.toString();
        console.log(`Storage length: ${localStorage.length}, ${localStorage.getItem("")}`);
    }
    dataObj = {"index":index, "data":data, "date":date, "priority":priority};
    dataObjStr = JSON.stringify(dataObj);
    console.log(`What type is ${typeof(localStorage)}`);

    try {
        if (!localStorage.getItem(index)){
            localStorage.setItem(index, dataObjStr);
            console.log(`Added ${dataObjStr} to index ${index} at localStorage`);
            return index;
        }
        else {
            console.log(`Item exists at ${index} item is ${localStorage.getItem(index)}`);
            localStorage.setItem(index, dataObjStr);
            console.log(`Index ${index} updated to ${localStorage.getItem(index)}`);
            return index;
        }
        
    }
    catch (e){
        console.log(e);
    }
    
}