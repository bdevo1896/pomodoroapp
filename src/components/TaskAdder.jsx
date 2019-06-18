import {connect} from 'react-redux';
import {useState} from 'react';

function TaskAdder(props) {
    const {createTask} = props;

    const [taskText,setText] = useState("");

    return (
        <div id="task-adder">
            <h3>Add New Task</h3>
            <input 
                onChange={(event) => {
                    setText(event.target.value);
                }}
                placeholder="Add text here"
            />
            <button onClick={() => createTask(taskText,1,'no-project')}>Create</button>
        </div>
    )
}

const mapState = state => ({
    list: state.taskList.list
})

const mapDispatch = ({taskList: {createTask}}) => ({
    createTask: (text,difficulty,date,projectId) => createTask({text: text,difficulty: difficulty,date:date,projectId:projectId})
})

const TaskAdderView = connect(mapState,mapDispatch)(TaskAdder);

export default TaskAdderView;