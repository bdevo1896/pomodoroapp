import {connect} from 'react-redux';
import {getTaskIndexFromID} from '../util/HelperFunctions';

const ArchiveTask = ({text,date,onClick}) => (
    <div>
        <p>{text}</p>
        <small>{date}</small>
        <button onClick={onClick}>Restore</button>
    </div>
)

function Archive(props) {
    const {list,restoreTask} = props;
    return (
        <div id="archive-container">
        <h2>Archive</h2>
        <ul>
        {
            Object.values(list).map((task)=> {
                return (
                    <ArchiveTask 
                        key={task.id}
                        text={task.text}
                        date={task.date}
                        onClick={() => restoreTask(task.id)}
                    />
                )
            })
        }
        </ul>
        </div>
    )
}

const mapState = state => ({
    list: state.taskList.archive
})

const mapDispatch = ({taskList: {restoreTask}}) => ({
    restoreTask: (id) => restoreTask({id: id})
})

const ArchiveView = connect(mapState,mapDispatch)(Archive);

export default ArchiveView;
