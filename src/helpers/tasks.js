const task = (title, description, date, project) => {
  return {
    title,
    description,
    date,
    project,
    priority: false
  }
}

export let tasks = [];
export let projects = [];

window.onload = (event) => {
  loadInfo();
}

export function loadInfo() {
  if (localStorage.tasks != null)
    tasks = JSON.parse(localStorage.tasks);
  if (localStorage.projects != null)
    projects = JSON.parse(localStorage.projects);
}



export function createProject(project) {
  if (! projects.includes(project))
    projects.push(project);
  storeTasks();
}


export function createTask(title, description, date, project) {
  let newTask = task(title, description, date, project)
  tasks.push(newTask);
  storeTasks();
}

export function removeTask(task) {
  tasks.splice(tasks.indexOf(task), 1)

  storeTasks();
}

export function changePrio(task) {
  if (task.priority == true)
    task.priority = false;
  else 
    task.priority = true;

  storeTasks();
}

function storeTasks() {
  localStorage.tasks = JSON.stringify(tasks);
  localStorage.projects = JSON.stringify(projects)
}
