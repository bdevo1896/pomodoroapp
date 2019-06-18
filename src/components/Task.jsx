function Task ({text,difficulty,onAddClick,onDeleteClick}){
    return (
    <li>
        <p>{text}</p>
        <button onClick={onAddClick}>Add</button>
        <button onClick={onDeleteClick}>Delete</button>
        <span></span>
    </li>
    )
}

export default Task;