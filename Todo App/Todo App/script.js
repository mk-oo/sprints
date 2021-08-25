//"use strict";
let tasks = [];
var nameField ;
var editInput ;
var editBtn ;
const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const getPriorityNumber = function (priority) {

  if (priority == 'High' || priority =='high'){
    return "1";
  }

  if (priority == 'Medium' || priority =='medium'){
    return "2";
  }

  if (priority == 'Low' || priority =='low'){
    return "3";
  } 
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};


editTable = function(i){
  let oldData = document.querySelector("#tasks_tbody").children[0].children[1];
  let oldPriority = document.querySelector("#tasks_tbody").children[0].children[2];

  let  save = document.querySelector('#save-button');
  let cancel = document.querySelector('#cancel-button');

  save.style.display = "block";
  cancel.style.display = "block";

  let editInput = document.createElement('input');
  let editInputPriority = document.createElement('input');


  oldData.append(editInput);
  oldPriority.append(editInputPriority);

  document.addEventListener('click',function(event){

    if(event.target.id == 'save-button'){
      
      oldData.textContent = editInput.value;
      oldPriority.textContent = editInputPriority.value;
      tasks.splice(i,1,{
        name:oldData.textContent,
        priority: getPriorityNumber(oldPriority.textContent)
      });
      renderTable();
    }
  })

  document.addEventListener('click',function(event){

    if(event.target.id == 'cancel-button'){
      renderTable();
    }
  })
}


const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td id ="td-name">${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td id ="action-buttons">
        <button class="btn btn-primary btn-sm" id = "edit-button" onclick = "editTable(${i})" >Edit</button>
        <button class="btn btn-success btn-sm" style = 'display:none' id = "save-button" >Save</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        <button class="btn btn-danger btn-sm" style = 'display:none' id = "cancel-button">Cancel</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};


const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

// Enter key to add task
document.addEventListener('keypress',function(event){

  if(event.keyCode == 13){
    addTask();
  }
})


document.querySelector("#add").addEventListener("click", addTask);
var name = "Test3";
var age = 22;
const calcFunction = () => {
  console.log(this);
  console.log(`My name is ${this.name} I'm ${this.age} years old`);
};
const obj = {
  name: "Test",
  age: 35,
  cal: calcFunction,
};

const obj2 = {
  name: "Test2",
  age: 22,
  cal: calcFunction,
};

function thisTest() {
  let obj1 = "Ramy";
  var obj2 = "Ahmed";
  console.log(this);
  const x = () => {
    console.log(this);
  };
  x();
}