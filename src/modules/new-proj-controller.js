import projectFactory from './project-factory';
import localStorageController from './local-storage-controller';
import sideBarController from './sidebar-controller';

const newProjController = (() => {
    const newProjectName = document.querySelector('#proj-name');    
    const newProjBtn = document.querySelector('#new-project-btn');    

    const confirmValidSubmission = () => {
        const newProjectNameContent = newProjectName.value.trim();
        if (newProjectNameContent != '') {
            if (localStorageController.projectNameExists(newProjectName.value.toLowerCase().trim())) {
                alert("A project with the same name already exists. Please choose a different name.");
                newProjectName.value = '';
            } else {
                createNewProjectAndClearInput(newProjectNameContent);        
            }
        } else {
            alert("Please enter a valid project name.");
        }
    };
    
    newProjBtn.addEventListener('click', confirmValidSubmission);
    
    const createNewProjectAndClearInput = (projName) => {
        const newProject = projectFactory(projName);
        alert("New project added successfully.");
        newProjectName.value = '';
        localStorageController.addProjectToLocalStorage(newProject);
        sideBarController.addProjectToSideBar(newProject);
    };   
})();

export default newProjController;