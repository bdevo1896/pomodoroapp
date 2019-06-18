import WorkView from '../src/containers/WorkView';
import TaskContainer from '../src/containers/TaskContainer';
import {Fragment} from 'react';

const Home = () => (
    <Fragment>
        <TaskContainer />
        <WorkView />
    </Fragment>
)

export default Home;