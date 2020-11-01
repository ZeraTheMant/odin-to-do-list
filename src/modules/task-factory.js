const taskFactory = (name) => {
    let description;
    let dueDate;
    let priority;
    let notes;
    
    return { 
        name,
        description, 
        dueDate,
        priority,
        notes
    };
};

export default taskFactory;