const localStorageController = (() => {
    const getLatestLocalStorageArray = () => {
        return (!localStorage.getItem('projects')) ? [] : JSON.parse(localStorage.getItem('projects'));
    };  
    
    const addProjectToLocalStorage = (project) => {
        let projects = getLatestLocalStorageArray();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));        
    };
    
    const addTaskToLocalStorage = (project, task) => {
        let projects = getLatestLocalStorageArray();
        const projectIndex = projects.findIndex(proj => proj.name == project.name);
        projects[projectIndex].todoTasks.push(task);
        localStorage.setItem('projects', JSON.stringify(projects)); 
    };
    
    const getProject = (projectName) => {
        let projects = getLatestLocalStorageArray();
        return projects.find(proj => proj.name.toLowerCase() == projectName);
    };
    
    const getTask = (project, taskName) => {
        return project.todoTasks.find(task => name.toLowerCase() == taskName);
    };
    
    const taskNameExists = (project, taskName) => {
        let taskExists = getTask(project, taskName);
        return (taskExists) ? true : false;
    };
    
    const projectNameExists = (projectName) => {
       let projectExists = getProject(projectName);
       return (projectExists) ? true : false;
    }
    
    
    return {
        getProject,
        getTask,
        projectNameExists,
        taskNameExists,
        addProjectToLocalStorage,
        addTaskToLocalStorage,
        getLatestLocalStorageArray        
    }
})();

export default localStorageController;