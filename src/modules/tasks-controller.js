const tasksController = (() => {
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
    
    setCompleteHandler();
})();

export default tasksController;