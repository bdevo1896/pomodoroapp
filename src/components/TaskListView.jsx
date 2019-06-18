import {connect} from 'react-redux';
import Task from '../components/Task';

function TaskList (props) {
    const {addTaskToQueue,deleteTask,updateTask,list} = props;

    return (
        <div id="tasks-list">
            <h2>Tasks</h2>
            <ul>
                {
                    Object.values(list).map((task) => {
                        return (
                            <Task
                                key={task.id}
                                text={task.text}
                                difficulty={task.difficulty}
                                onAddClick={() => addTaskToQueue(task.id)}
                                onDeleteClick={() => deleteTask(task.id)}
                                onUpdate={() => updateTask(task.id)}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = state => ({
    list: state.taskList.list
})

const mapDispatch = ({taskList: {updateTask,addTaskToQueue,deleteTask}}) => ({
    updateTask: (id) => updateTask({id:id}),
    addTaskToQueue: (id) => addTaskToQueue({id:id}),
    deleteTask: (id) => deleteTask({id:id})
})

const TaskListView = connect(mapState,mapDispatch)(TaskList);

export default TaskListView;