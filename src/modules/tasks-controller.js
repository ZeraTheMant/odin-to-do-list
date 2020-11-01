import localStorageController from './local-storage-controller';
import workingAreaController from './working-area-controller';
import taskFactory from './task-factory';

const tasksController = (() => {
    const editTaskArea = document.querySelector('#edit-task-area');
    const newTaskBtn = document.querySelector('.new-to-do-btn');
    const newTaskInput = document.querySelector('.to-do-task');
    const tasksContainer = document.querySelector('.tasks-container');
    
    const showEditTaskArea = () => editTaskArea.classList.remove('hidden');
    const getAllCurrentTasks = () => document.querySelectorAll('.todo-task-item:not(.completed)');    
    const setCompleteHandler = () => {
        const tasks = getAllCurrentTasks();
        tasks.forEach(task => {
            const completeBtn = task.firstElementChild.firstElementChild;
            completeBtn.addEventListener('click', completeTask);
        });
    };
    const completeTask = (e) => {
        const task = e.target.parentNode.parentNode;
        
    };
    
    const confirmValidSubmission = (e) => {
        const workingAreaText = document.querySelector('#working-area-header h2');
        const project = localStorageController.getProject(workingAreaText.textContent);
        const projectTasks = project.todoTasks;
        
        const newTaskNameContent = newTaskInput.value.trim();
        
        if (newTaskNameContent != '') {
            if (localStorageController.taskNameExists(project, newTaskNameContent.toLowerCase())) {
                alert("A task with the same name already exists.");
            } else {
                createNewTaskAndClearInput(project, newTaskNameContent);
            }
        } else {
            alert('Please enter a valid task name.');
        }
    };
    
    const createNewTaskAndClearInput = (project, newTaskName) => {
        const newTask = taskFactory(newTaskName);
        alert("New task added successfully.");
        newTaskInput.value = '';
        localStorageController.addTaskToLocalStorage(project, newTask);
        addTask(newTask);
    };
    
    const loadEditTaskView = (currentProject, currentTask) => {
        workingAreaController.hideCreatedProjectArea();
        showEditTaskArea();
    };
    
    const populateProjectTasks = (projectName) => {
        const project = localStorageController.getProject(projectName);
        project.todoTasks.forEach(task => {
            populateTask(task);
            setEditBtnHandlers();
        });
    };
    
    const setEditBtnHandlers = () => {
        const editBtns = document.querySelectorAll('.edit');
        for (let i=0; i<editBtns.length; i++) {
            editBtns[i].addEventListener('click', editTaskInit);
        }
    };
    
    const editTaskInit = (e) => {
        const taskName = e.target.parentNode.previousElementSibling.firstElementChild.textContent;
        const projectName = document.querySelector('#working-area-header h2').textContent;
        const currentProject = localStorageController.getProject(projectName);
        const currentTask = localStorageController.getTask(currentProject, taskName);
        loadEditTaskView(currentProject, currentTask);
        workingAreaController.setHeaderHTML(`
            <h2><div id="circle">&#8249;</div> <span>${ taskName }</span></h2>
        `);
    };
    
    const addTask = (task) => {
        populateTask(task);
        setEditBtnHandlers();
    }
    
    const populateTask = (task) => {
        const container = document.createElement('div');
        container.classList.add('todo-task-item');    
        container.classList.add('default');        

        const checkBoxContainer = document.createElement('div');   
        const checkBox = document.createElement('input');       
        checkBox.type = 'checkbox';
        checkBox.classList.add('complete-task');     
        checkBoxContainer.appendChild(checkBox);
        
        const taskInfoContainer = document.createElement('div'); 
        const taskName = document.createElement('p'); 
        taskName.textContent = task.name;
        taskName.classList.add('todo-task-item-name');
        const date = document.createElement('p'); 
        date.classList.add('date');
        date.classList.add('hidden');
        taskInfoContainer.appendChild(taskName);
        taskInfoContainer.appendChild(date);
        
        const editContainer = document.createElement('div'); 
        editContainer.classList.add('edit-container');  
        const editBtn = document.createElement('span');  
        editBtn.classList.add('edit');   
        editBtn.innerHTML = `&#9998;`;
        editContainer.appendChild(editBtn);
        
        container.appendChild(checkBoxContainer);
        container.appendChild(taskInfoContainer);
        container.appendChild(editContainer);
        
        tasksContainer.appendChild(container);    
    };  
    
    newTaskBtn.addEventListener('click', confirmValidSubmission)
    setCompleteHandler();
    
    return {
        populateProjectTasks
    }
})();

export default tasksController;