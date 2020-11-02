const taskFactory = (name) => {
    let description;
    let dueDate;
    let priority;
    let notes;
    let isComplete = false;
    
    return { 
        name,
        description, 
        dueDate,
        priority,
        notes,
        isComplete
    };
};

export default taskFactory;