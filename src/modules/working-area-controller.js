import tasksController from './tasks-controller';

const workingAreaController = (() => {
    const newProjectArea = document.querySelector('#new-project-area');
    const workingAreaHeader = document.querySelector('#working-area-header');
    
    const createdProjectArea = document.querySelector('.created-project-area');
    
    const setHeaderHTML = (html) => {
        workingAreaHeader.innerHTML = html;
    };
    const hideNewProjectArea = () => newProjectArea.classList.add('hidden');
    const showNewProjectArea = () => newProjectArea.classList.remove('hidden');
    const hideCreatedProjectArea = () => createdProjectArea.classList.add('hidden');
    const showCreatedProjectArea = () => createdProjectArea.classList.remove('hidden');
    
    return {
        hideNewProjectArea,
        showNewProjectArea,
        hideCreatedProjectArea,
        showCreatedProjectArea,
        setHeaderHTML
    }
})();

export default workingAreaController;