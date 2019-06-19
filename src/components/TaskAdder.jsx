import {connect} from 'react-redux';
import {useState} from 'react';

function TaskAdder(props) {
    const {createTask} = props;

    const [taskText,setText] = useState("");
    const [difficulty,setDifficulty] = useState(1);

    return (
        <div id="task-adder">
            <h3>Add New Task</h3>
            <input 
                onChange={(event) => {
                    setText(event.target.value);
                }}
                placeholder="Add text here"
            />
            <select onChange={(event)=>{
                const {value} = event.target;
                switch(value) {
                    case 'normal':
                        setDifficulty(2);
                        break;
                    case 'hard':
                        setDifficulty(3);
                        break;
                    default:
                        setDifficulty(1);
                }
            }}>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={() => {
                createTask(taskText,difficulty,'no-project')
            }}>Create</button>
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