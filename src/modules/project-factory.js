const projectFactory = (name) => {
    let todoTasks = [];
    const addTask = (task) => todoTasks.push(task);
    const getName = () => name;
    
    return { 
        addTask, 
        name 
    };
};

export default projectFactory;