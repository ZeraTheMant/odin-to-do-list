import workingAreaController from './working-area-controller';
import tasksController from './tasks-controller';
import localStorageController from './local-storage-controller';

const sideBarController = (() => {
    const projectsHolder = document.querySelector('#sidebar ul');
    
    const setClickHandlers = () => {
        const projects = document.querySelectorAll('#sidebar li:not(#new-project-view-btn)');
        projects.forEach((e) => {
            e.addEventListener('click', handleClick);
        });

        const newProject = document.querySelector('#sidebar li#new-project-view-btn');    
        newProject.addEventListener('click', switchToNewProject);
    }
    
    const switchToNewProject = () => {
        workingAreaController.hideCreatedProjectArea();
        workingAreaController.showNewProjectArea();
        workingAreaController.setHeaderHTML(`
            <h2>Create new Project</h2>
        `);
    };
 
    const handleClick = (e) => {
        const project = localStorageController.getProject(e.target.textContent);
        workingAreaController.hideNewProjectArea();
        workingAreaController.setHeaderHTML(`
            <h2>${ e.target.textContent }</h2>
        `);
        workingAreaController.showCreatedProjectArea();
        tasksController.populateProjectTasks(project.name);
    };
    
    const createProjectDOM = (project) => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;
        projectsHolder.appendChild(listItem); 
    }
    
    const populateProjects = () => {
        let projects = localStorageController.getLatestLocalStorageArray();
     
        projects.forEach(project => {
            createProjectDOM(project);
        });   

        setClickHandlers();
    };
    
    const addProjectToSideBar = (project) => {
        createProjectDOM(project);
        setClickHandlers();
    }
    
    setClickHandlers();
    
    return {
        populateProjects,
        addProjectToSideBar
    }
})();

export default sideBarController;