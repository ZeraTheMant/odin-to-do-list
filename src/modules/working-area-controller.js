import newProjController from './new-proj-controller';
import localStorageController from './local-storage-controller';

const workingAreaController = (() => {
    const newProjectArea = document.querySelector('#new-project-area');
    const workingAreaHeader = document.querySelector('#working-area-header');
    const tasksContainer = document.querySelector('.tasks-container');
    
    const createdProjectArea = document.querySelector('.created-project-area');
    
    const setHeaderHTML = (html) => {
        workingAreaHeader.innerHTML = html;
    };
    const hideNewProjectArea = () => newProjectArea.classList.add('hidden');
    const showNewProjectArea = () => newProjectArea.classList.remove('hidden');
    const hideCreatedProjectArea = () => createdProjectArea.classList.add('hidden');
    const showCreatedProjectArea = () => {
        createdProjectArea.classList.remove('hidden')
        tasksContainer.innerHTML = '';
    };
    const getHeaderTextContent = () => {

        return document.querySelector('#working-area-header h2').textContent;
    };
    
    return {
        hideNewProjectArea,
        showNewProjectArea,
        hideCreatedProjectArea,
        showCreatedProjectArea,
        setHeaderHTML,
        getHeaderTextContent
    }
})();

export default workingAreaController;