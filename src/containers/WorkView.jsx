import Timer from '../components/Timer';
import TaskQueue from '../components/TaskQueue';

const WorkView = () => (
    <div id="work-view-container">
        <Timer difficulty={1}/>
        <TaskQueue />
        <style jsx>{`
            #work-view-container {
                position: relative;
            }
        `}</style>
    </div>
)

export default WorkView;