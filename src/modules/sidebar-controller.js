import workingAreaController from './working-area-controller';

const sideBarController = (() => {
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
        //document.querySelector
        workingAreaController.hideNewProjectArea();
        workingAreaController.setHeaderHTML(`
            <h2>${ e.target.textContent }</h2>
        `);
        workingAreaController.showCreatedProjectArea();
    };
    
    setClickHandlers();
})();

export default sideBarController;