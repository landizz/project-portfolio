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
    indexList = localStorage.getItem("0");
    for (index of indexList.split(",")){
        console.log(localStorage.getItem(index));
        storedObject = JSON.parse(localStorage.getItem(index));
        AddTask(storedObject.index, storedObject.data, storedObject.date, storedObject.priority);
    }
});

document.getElementById("remove-all-tasks").addEventListener("click", () =>{
    console.log("Local Storage cleared");
    localStorage.clear();
})

addTaskButton.addEventListener("click", () => {
    taskData = document.getElementById("task-text-field").value;
    //Added data index so when editing tasks, it will be saved over the old data index.
    dataIndex = document.getElementById("task-text-field").getAttribute("data-index");
    taskDate = document.getElementById("date-field").value;
    taskPriority = document.getElementById("priority-list").value;

    //Clean all input, also making sure to remove data-index.
    document.getElementById("task-text-field").value = "";
    document.getElementById("task-text-field").setAttribute("data-index", "");
    document.getElementById("date-field").value = "";
    //Priority list get set to default priority which is high.
    document.getElementById("priority-list").value = "High priority";


    taskIndex = SaveTask(dataIndex, taskData, taskDate, taskPriority);
    AddTask(taskIndex, taskData, taskDate, taskPriority);
    
});

document.getElementById("task-list-container").addEventListener("click", () => {
    //Sets a general listener event on root div for task containers.
    //Based on the active elements id, two different functions are called
    //with the active element object.
    switch (document.activeElement.id){
        case "delete-task-button":
            console.log(`${document.activeElement}, calling delete function`);
            DeleteTask(document.activeElement);
            break;
        case "edit-task-button":
            console.log(`${document.activeElement.parentElement.parentElement.innerHTML}, calling edit function`);
            EditTask(document.activeElement);
            break;
    }
});

//Takes active element
//Inputs data from active element into text and date field
//Also updates the priority
function EditTask(buttonObj){
    taskData = document.getElementById("task-text-field");
    taskDate = document.getElementById("date-field");
    taskPriority = document.getElementById("priority-list");

    //date element will always be second child of taskRootElement.
    taskRootElement = buttonObj.parentElement.parentElement;
    //Sets the data-index of input to the index of the task being edited.
    taskData.setAttribute("data-index", taskRootElement.getAttribute("data-index"));
    
    rootData = taskRootElement.firstChild.innerText;
    rootDate = taskRootElement.children[1].innerText;

    rootDate = rootDate.replace("Due date: ", "")
    taskData.value = rootData;
    taskDate.value = rootDate;

    //Need to check if a style exists, before attempting to alter the it.
    if (rootPriority = taskRootElement.getAttribute("style")){
        rootPriority = rootPriority.replace("border: 1px solid ", "");

        switch (rootPriority){
            case "red;":
                taskPriority.value = "High priority";
                break;
            case "yellow;":
                taskPriority.value = "Medium priority";
                break;
            case "green;":
                taskPriority.value = "Low priority";
                break;
        }
    }
    else {
        taskPriority.value = "No priority";
    }


}


//Takes the active element object
//First makes sure that the object exists in storage before trying to delete it, otherwise raise error.
//If it exists, it deletes it from localStorage first
//Then removes the appropriate index in the indexList.
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
            //Removing actual index data
            console.log(`Removing ${localStorage.getItem(taskIndex)}`);
            localStorage.removeItem(taskIndex);
            //Removing the index in index list
            indexList = localStorage.getItem("0").split(",");
            indexListTask = indexList.indexOf(taskIndex);
            indexList = indexList.toSpliced(indexListTask, 1);
            localStorage.setItem("0", indexList.join(","));
            console.log(`${localStorage.getItem("0")}`);

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
    elementCollection = rootContainer.children;
    for (element of elementCollection){
        if (element.getAttribute("data-index") == index){
            dataElement = element.firstElementChild;
            console.log(`First child is ${dataElement}`);
            dataElement.value = data;

            dateElement = dataElement.nextElementSibling;
            console.log(`Second child is ${dateElement}`);
            dateElement.value = `Due date: ${date}`;
            switch (priority){
                case "High priority":
                    element.style.border = "1px solid red";
                    break;
        
                case "Medium priority":
                    element.style.border = "1px solid yellow";
                    break;
        
                case "Low priority":
                    element.style.border = "1px solid green";
                    break;
                case "No priority":
                    element.style.border = "";
                    break;
            }
            return console.log(`Task index ${index} updated`);
        }

    }

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
    //I store a list of indexes at with key value "0" separated by a ","
    //This should make me able to repopulate the task list.
    //Index starts from "1" and increments based on the data-index of last child
    if (!index){
        if(!document.getElementById("task-list-container").lastElementChild){
            index = "1";
            console.log(`No tasks exists. Creating new index`);
            try {
                localStorage.setItem("0", index);
                console.log(`Index ${index} added to index list`);
            }
            catch (e){
                console.log(`${e}`);
            }
        }
        else {
            indexString = parseInt(document.getElementById("task-list-container").lastElementChild.getAttribute("data-index")) + 1;
            index = indexString.toString();
            indexList = localStorage.getItem("0");
            try {
                localStorage.setItem("0", indexList+","+index);
                console.log(`Index ${index} added to index list`);
            }
            catch (e){
                console.log(`${e}`);
            }
        }
    }
    
    dataObj = {"index":index, "data":data, "date":date, "priority":priority};
    dataObjStr = JSON.stringify(dataObj);
   
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