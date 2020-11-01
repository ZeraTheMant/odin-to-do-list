import localStorageController from './local-storage-controller';
import taskFactory from './task-factory';

const tasksController = (() => {
    const newTaskBtn = document.querySelector('.new-to-do-btn');
    const newTaskInput = document.querySelector('.to-do-task');
    const tasksContainer = document.querySelector('.tasks-container');
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
            editBtns[i].addEventListener('click', editTask);
        }
    };
    
    const editTask = (e) => {
        alert(e.target.parentNode.previousElementSibling.firstElementChild.textContent);
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