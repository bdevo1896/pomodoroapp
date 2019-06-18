import TaskListView from '../components/TaskListView';
import TaskAdder from '../components/TaskAdder';
import Archive from '../components/ArchiveView';
import {connect} from 'react-redux';
import AccomplishmentArchive from '../components/AccomplishmentArchive';

function TaskContainer(props) {
    const {taskList} = props;
    return (
        <div id="tasks-container">
            <TaskAdder />
            <TaskListView />
            <Archive />
            <AccomplishmentArchive />
            <style jsx>{`
                #tasks-container {
                    overflow-y: scroll;
                    height: 100%;
                }
            `}</style>
        </div>
    )
}

const mapState = state => ({taskList: state.taskList});

const TaskContainerView = connect(mapState)(TaskContainer);

export default TaskContainerView;