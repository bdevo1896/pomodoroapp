import TaskListView from '../components/TaskListView';
import TaskAdder from '../components/TaskAdder';
import Archive from '../components/ArchiveView';
import {connect} from 'react-redux';

function TaskContainer(props) {
    const {taskList} = props;
    return (
        <div id="tasks-container">
            <TaskAdder />
            <TaskListView />
            <Archive />
        </div>
    )
}

const mapState = state => ({taskList: state.taskList});

const TaskContainerView = connect(mapState)(TaskContainer);

export default TaskContainerView;