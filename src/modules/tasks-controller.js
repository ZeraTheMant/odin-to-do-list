import localStorageController from './local-storage-controller';
import workingAreaController from './working-area-controller';
import taskFactory from './task-factory';
import moment from 'moment';

const tasksController = (() => {
    let currentProject;
    let currentTask;
    const taskNameDOM = document.querySelector('#task-name');
    const taskNotesDOM = document.querySelector('#task-notes');
    const taskDateDOM = document.querySelector('#task-date');
    taskDateDOM.setAttribute('min', moment().format('YYYY-MM-DD').toString())
    const taskPriorityDOM = document.querySelector('#task-priority');
    const editTaskForm = document.querySelector('#edit-task-form');
    const deleteTaskBtn = document.querySelector('#delete-task-btn');
    
    const editTaskArea = document.querySelector('#edit-task-area');
    const newTaskBtn = document.querySelector('.new-to-do-btn');
    const newTaskInput = document.querySelector('.to-do-task');
    const tasksContainer = document.querySelector('.tasks-container');
    
    const showEditTaskArea = () => {
        editTaskArea.classList.remove('hidden');
        taskNotesDOM.value = '';
        taskPriorityDOM.value = 'Normal';
        taskDateDOM.value = moment().format('YYYY-MM-DD').toString();
    };
    const hideEditTaskArea = () => editTaskArea.classList.add('hidden');
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
    const deleteTask = (e) => {
        const confirmDelete = confirm("Delete this task?");
        if (confirmDelete) {
            localStorageController.deleteTaskFromProject(currentProject, currentTask);
            returnToWorkingArea();           
        }
    };
    deleteTaskBtn.addEventListener('click', deleteTask);
    
    const saveTaskEdit = (e) => {
        e.preventDefault();
        currentTask.notes = taskNotesDOM.value;
        currentTask.dueDate = taskDateDOM.value;
        currentTask.priority = taskPriorityDOM.value;
        localStorageController.editProjectTask(currentProject, currentTask);
        alert("Task info successfully updated.");
        returnToWorkingArea();
    };
    editTaskForm.addEventListener('submit', saveTaskEdit);
    
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
        
        taskNameDOM.value = currentTask.name
        if (currentTask.notes && currentTask.dueDate && currentTask.priority) {
            taskNotesDOM.value = currentTask.notes;
            taskDateDOM.value = currentTask.dueDate;
            taskPriorityDOM.value = currentTask.priority;            
        }
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

        currentProject = localStorageController.getProject(projectName);
        currentTask = localStorageController.getTask(currentProject, taskName);
        loadEditTaskView(currentProject, currentTask);
        workingAreaController.setHeaderHTML(`
            <h2><div id="circle">&#8249;</div> <span>${ taskName }</span></h2>
        `);
        document.querySelector("#circle").addEventListener('click', returnToWorkingArea);
    };
    
    const returnToWorkingArea = () => {
        workingAreaController.setHeaderHTML(`
            <h2>${ currentProject.name }</h2>
        `);
        hideEditTaskArea();
        workingAreaController.showCreatedProjectArea();
        populateProjectTasks(currentProject.name);
    };
    
    const addTask = (task) => {
        populateTask(task);
        setEditBtnHandlers();
    }
    
    const populateTask = (task) => {
        const container = document.createElement('div');
        container.classList.add('todo-task-item'); 

        if (!task.priority) {
            container.classList.add('default');         
        } else if (task.priority == 'High') {
            container.classList.add('high'); 
        } else if (task.priority == 'Normal') {
            container.classList.add('normal'); 
        } else {
            container.classList.add('low'); 
        }     

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

        if (!task.dueDate) {
            date.classList.add('hidden');       
        } else {
            date.innerHTML = `&#128197; ${ moment(task.dueDate).format('MMMM Do YYYY') }`;
        }

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
        populateProjectTasks,
        hideEditTaskArea
    }
})();

export default tasksController;