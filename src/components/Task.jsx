function Task ({text,difficulty,onAddClick,onDeleteClick}){
    let difficultyText = 'Easy';
    switch(difficulty) {
        case 2:
            difficultyText = 'Normal';
            break;
        case 3:
            difficultyText = 'Hard';
            break;
        default:
            difficultyText = 'Easy';
    }
    return (
    <li>
        <p>{text}</p>
        <small>{difficultyText}</small>
        <br />
        <button onClick={onAddClick}>Add</button>
        <button onClick={onDeleteClick}>Delete</button>
        <span></span>
    </li>
    )
}

export default Task;