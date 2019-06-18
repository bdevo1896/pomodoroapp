import {connect} from 'react-redux';
import {getTaskIndexFromID} from '../util/HelperFunctions';

const QueueTask = ({text,onShiftUp,onShiftDown,onRemove}) => (
    <div>
        <p>{text}</p>
        <button onClick={onShiftUp}>Up</button>
        <button onClick={onShiftDown}>Down</button>
        <button onClick={onRemove}>Remove</button>
    </div>
)

function TaskQueue(props) {
    const {queue,list,removeTaskFromQueue,shiftTaskDown,shiftTaskUp} = props;
    return (
        <div id="task-queue-container">
        <h2>Task Queue</h2>
        <ul>
        {
            queue.map(({id})=> {
                    const task = list[id];
                    return (
                        <QueueTask 
                            key={task.text}
                            text={task.text}
                            onRemove={() => removeTaskFromQueue(id)}
                            onShiftUp={() => shiftTaskUp(id)}
                            onShiftDown={()=>shiftTaskDown(id)}
                        />
                    )
            })
        }
        </ul>
        <style jsx>{`
            #task-queue-container {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
            }
        `}</style>
        </div>
    )
}

const mapState = state => ({
    queue: state.taskList.queue,
    list: state.taskList.list
})

const mapDispatch = ({taskList: {removeTaskFromQueue,shiftTaskUp,shiftTaskDown}}) => ({
    removeTaskFromQueue: (id) => removeTaskFromQueue({id:id}),
    shiftTaskUp: (id) => shiftTaskUp({id:id}),
    shiftTaskDown: (id) => shiftTaskDown({id:id})
})

const TaskQueueView = connect(mapState,mapDispatch)(TaskQueue);

export default TaskQueueView;