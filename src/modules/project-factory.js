const projectFactory = (name) => {
    let todoTasks = [];
    const addTask = (task) => todoTasks.push(task);
    
    return { 
        todoTasks,
        addTask, 
        name 
    };
};

export default projectFactory;