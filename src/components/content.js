import { tasks, createTask, removeTask, changePrio, loadInfo } from '../helpers/tasks';

export default function content() {
  let main = document.createElement('div');
  let formDiv = document.createElement('div');
  let titleInput = document.createElement('input');
  let descInput = document.createElement('input');
  let dateInput = document.createElement('input');
  let taskFormBtn = document.createElement('button');
  let tasksParentDiv = document.createElement('div');
  let project = document.querySelector('.project-selection').value;
  loadTasks();

  titleInput.placeholder = 'title'
  descInput.placeholder = 'description'
  dateInput.setAttribute('type', 'date')

  document.querySelector('.project-selection').addEventListener('change', () => {
    loadTasks()
  })

  taskFormBtn.setAttribute('type', 'button');
  taskFormBtn.innerHTML = 'Add To-do';
  taskFormBtn.addEventListener('click', () => {
    project = document.querySelector('.project-selection').value;
    createTask(titleInput.value, descInput.value, dateInput.value, project);
    loadTasks();
  })
  
  tasksParentDiv.classList.add('task-parent-div')
  main.classList.add('content-main');
  formDiv.classList.add('content-form-div')

  formDiv.appendChild(titleInput);
  formDiv.appendChild(descInput);
  formDiv.appendChild(dateInput);
  formDiv.appendChild(taskFormBtn);
  main.appendChild(formDiv);
  main.appendChild(tasksParentDiv);
  document.body.appendChild(main);

  function loadTasks() {
    loadInfo();
    tasksParentDiv.innerHTML = '';
    tasks.forEach(task => {
      project = document.querySelector('.project-selection').value;
      if (task.project == project) {
        let taskDiv = document.createElement('div');
        let taskDivTitle = document.createElement('div');
        let taskDivInfo = document.createElement('div');
        let taskDesc = document.createElement('div');
        let taskDate = document.createElement('div');
        let edit = document.createElement('button');
        let prioritize = document.createElement('div');
        
        taskDiv.classList.add('task-div');
        taskDivTitle.classList.add('task-div-title')
        taskDesc.classList.add('task-desc');
        taskDate.classList.add('task-date');
        taskDivInfo.classList.add('task-info')
        if (task.priority == true){
          prioritize.innerHTML = 'IMPORTANT'
          prioritize.classList = ('priority')
        }
          
        else {
          prioritize.innerHTML = 'NORMAL'
          prioritize.classList = ('priority-none')
        }

        taskDivTitle.innerHTML = task.title;
        taskDesc.innerHTML = task.description;
        taskDate.innerHTML = task.date;
        edit.innerHTML = 'clear';
        edit.addEventListener('click', (task) => {
          removeTask(task);
          loadTasks();
        })
        prioritize.addEventListener('click', () => {
          changePrio(task);
          loadTasks();
        })

        
        taskDiv.appendChild(taskDivTitle)
        taskDivInfo.appendChild(prioritize)
        taskDivInfo.appendChild(taskDesc)
        taskDivInfo.appendChild(taskDate)
        taskDivInfo.appendChild(edit)
        taskDiv.appendChild(taskDivInfo)
        tasksParentDiv.appendChild(taskDiv)
    }})
}
}

