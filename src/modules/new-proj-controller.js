import projectFactory from './project-factory';

const newProjController = (() => {
    const newProjectName = document.querySelector('#proj-name');    
    const newProjBtn = document.querySelector('#new-project-btn');    

    const confirmValidSubmission = () => {
        const newProjectNameContent = newProjectName.value.trim();
        if (newProjectNameContent != '') {
            createNewProjectAndClearInput(newProjectNameContent);
        } else {
            alert("Please enter a valid project name.");
        }
    };
    
    newProjBtn.addEventListener('click', confirmValidSubmission);
    
    const createNewProjectAndClearInput = (projName) => {
        const newProject = projectFactory(projName);
        pushToLocalStorage(newProject);
        newProjectName.value = '';
    };

    const getLocalStorageArray = () => {
        return (!localStorage.getItem('projects')) ? [] : JSON.parse(localStorage.getItem('projects'));
    };

    const pushToLocalStorage = (newProject) => {
        let projects = getLocalStorageArray();
        projects.push(newProject);
        alert(JSON.stringify(projects))
        localStorage.setItem('projects', JSON.stringify(projects));
    };    
})();

export default newProjController;