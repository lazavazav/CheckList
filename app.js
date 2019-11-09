// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// create the function for loading event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  //now go below and create the function removeTask

  // clear all tasks
  clearBtn.addEventListener('click', clearAll);
  //going below and creating the clearAll function

}

//get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task) {
  const li = document.createElement('li');

  // next statement creates class so it looks good with materialize and matches other list item styling
  li.className = 'collection-item';

  //create text node and append to li
  li.appendChild(document.createTextNode(task));

  // create new link element
  const link = document.createElement('a');

  // add class so looks good with materialize
  link.className = 'delete-item secondary-content';

  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);
  });
}

//function for add task
function addTask(e) {
  if(taskInput.value === '') {
alert('Add a task');
  }
  //create li element
  const li = document.createElement('li');

  // next statement creates class so it looks good with materialize and matches other list item styling
  li.className = 'collection-item';

  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element
  const link = document.createElement('a');

  // add class so looks good with materialize
  link.className = 'delete-item secondary-content';

  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  //clear the input
  taskInput.value = '';

  //prevents default behavior for submits in forms
  e.preventDefault();
}

// Function to store in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task by clicking x button
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// creating function removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks
function clearAll(e) {
 taskList.innerHTML = '';
 //or we could do a while loop which is faster
// while (taskList.firstChild) {
// taskList.removeChild(taskList.firstChild);
// }

 //clear from Local Storage
 clearTasksFromLocalStorage();
}

//creating function clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}



