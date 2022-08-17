import { projects, createProject, loadInfo } from "../helpers/tasks";

export default function header() {
  let main = document.createElement('div');
  let title = document.createElement('div');
  let dropdown = document.createElement('div');
  let projectSelection = document.createElement('select');
  let projectInput = document.createElement('input');
  let projectAddBtn = document.createElement('button');
  loadProjects();


  main.classList.add('header-main');
  title.classList.add('header-title');
  dropdown.classList.add('header-dropdown');
  projectSelection.classList.add('project-selection')

  title.innerHTML = 'Retro Todo List';
  projectAddBtn.innerHTML = 'add';
  projectInput.placeholder = 'new project'
  

  projectAddBtn.addEventListener('click', () => {
    createProject(projectInput.value)
    loadProjects();
  })

  function loadProjects() {
    loadInfo();
    if (localStorage.length == 0 || projects == null){
      let project = createProject('default')
      let option = document.createElement('option')
      option.setAttribute('selected', 'selected')
      option.innerHTML = project
      option.value = project
      projectSelection.appendChild(option)
      loadProjects();
    }
    projects.forEach(project => {
      let option = document.createElement('option')
      option.innerHTML = project
      option.value = project
      projectSelection.appendChild(option);
    })
}

  dropdown.appendChild(projectSelection);
  dropdown.appendChild(projectInput);
  dropdown.appendChild(projectAddBtn);
  main.appendChild(title);
  main.appendChild(dropdown);
  document.body.appendChild(main);
}