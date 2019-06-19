import {CircleChart} from './CircleChart';
import {Component} from 'react';
import {connect} from 'react-redux';

function TimeView ({currentTime}) {
    let minutes = Math.floor(currentTime/60);
    let seconds = currentTime - (minutes * 60);
    return <h2 className="timeView">{`${minutes} : ${seconds < 10 ? '0'+seconds : seconds}`}</h2>
}

const EASY_TIME = 15 * 60;
const NORMAL_TIME = 25 * 60;
const HARD_TIME = 50 * 60;

const EASY_BREAK_TIME = 2.5 * 60;
const NORMAL_BREAK_TIME = 5 * 60;
const HARD_BREAK_TIME = 15 * 60;

const FATIGUE_BREAK = 30 * 60;

const TIMER_MILLISECONDS = 10;

function getTimeValue(fatigue,difficulty,workSessionDone) {
    let timeValue = 0;
    if(fatigue < 4) {
        if(!workSessionDone) {
            switch(difficulty) {
            case 3:
                timeValue = HARD_TIME;
                break;
            case 2:
                timeValue = NORMAL_TIME;
                break;
            default:
                timeValue = EASY_TIME;
                break;
            }
        }else {
            switch(difficulty) {
                case 3:
                    timeValue = HARD_BREAK_TIME;
                    break;
                case 2:
                    timeValue = NORMAL_BREAK_TIME;
                    break;
                default:
                    timeValue = EASY_BREAK_TIME;
                    break;
            }
        }
    }else {
        timeValue = FATIGUE_BREAK;
    }

    return timeValue;
}


class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerValue: 0,
            originalTimerValue: 0,
            timer: null,
            isRunning: false,
            taskDifficulty: 0,
            workSessionDone: false,
            fatigue: 0,
            currentTaskId: ''
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
    }

    componentDidMount() {
        const {queue,list} = this.props;

        if(queue.length > 0 && list.length > 0) {
            let newDifficulty = nextProps.list[queue[0].id].difficulty;
            this.setState({taskDifficulty: newDifficulty,currentTaskId: queue[0].id});        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {queue,list} = nextProps;
        const {fatigue,workSessionDone,currentTaskId} = prevState;

        if(queue.length > 0 && Object.values(list).length > 0) {
            if(nextProps.queue[0].id !== currentTaskId){
                let newDifficulty = nextProps.list[queue[0].id].difficulty;
                let timeValue = getTimeValue(fatigue,newDifficulty,workSessionDone);
                return { timerValue: timeValue,originalTimerValue: timeValue,currentTaskId: (fatigue < 4 && !workSessionDone) ? nextProps.queue[0].id : '',taskDifficulty: newDifficulty};
            }
        }

        else return { timerValue: 0,originalTimerValue: 0,currentTaskId: '',workSessionDone: false};
    }

    decrementTime() {
        const {timerValue,fatigue,taskDifficulty,workSessionDone,currentTaskId} = this.state;
        const {completeTask} = this.props;
        this.setState({timerValue: timerValue -1},()=>{
            if(this.state.timerValue <= 0) {
                if(!workSessionDone) {
                    let newFatigue = fatigue;
                    switch(taskDifficulty) {
                        case 3:
                            newFatigue += 2;
                            break;
                        case 2:
                            newFatigue += 1;
                            break;
                        default:
                            newFatigue += 0.5;
                    }
                    this.stopTimer();
                    if(currentTaskId != '') {
                        completeTask(currentTaskId);
                    }
                    this.setState({workSessionDone: true,taskDifficulty: 0,fatigue: newFatigue < 4 ? newFatigue : 0})
                }
            }
        });
    }

    stopTimer() {
        clearInterval(this.state.timer);
        this.setState({timer: null,isRunning: false});
    }

    startTimer(timerValue) {
        const {timer} = this.state;
        if(timerValue != 0 && timer == null) {
            this.setState({timer: setInterval(this.decrementTime(),TIMER_MILLISECONDS),isRunning: true})
        }
    }

    resetTimer() {
        clearInterval(this.state.timer);
        this.setState({timer: null,timerValue: 0,isRunning: false,workSessionDone: false});
    }

    render() {
        const {timerValue,originalTimerValue,isRunning,currentTaskId} = this.state;
        const {queue,list} = this.props;

        return (
            <div id="timer-container">
                <CircleChart 
                    percentage={(timerValue /originalTimerValue) * 100}
                    sideLength="100%"
                />
                <div className="info-display">
                    {(queue.length > 0 && currentTaskId != '') &&
                    <div>
                        <h2>Current Task</h2>
                        <p>{list[currentTaskId].text}</p>
                    </div>
                    }
                    <TimeView currentTime={timerValue} />
                    <div className="button-deck">
                    {(!isRunning && queue.length > 0) &&
                        <button onClick={() => this.startTimer()}>{(timerValue > 0 && timerValue != originalTimerValue) ? 'Resume':'Start'}</button>
                    }
                    {queue.length == 0 &&
                        <p>Add some tasks to the queue!</p>
                    }
                    {(timerValue > 0 && isRunning) &&
                        <button onClick={() => this.stopTimer()}>Pause</button>
                    }
                    {(timerValue > 0) &&
                        <button onClick={() => this.resetTimer()}>Cancel</button>
                    }
                    </div>
                </div>
                <style jsx>{`
                @media(min-width: 768px) {
                    #timer-container {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        display: grid;
                        align-items: center;
                        justify-items: center;
                    }

                    #timer-container .info-display {
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }
                }
                `}</style>
            </div>
        )
    }
}

const mapState = state => ({
    queue: state.taskList.queue,
    list: state.taskList.list
})

const mapDispatch = ({taskList: {completeTask}}) => ({
    completeTask: (id) => completeTask({id: id})
})

const TimerView = connect(mapState,mapDispatch)(Timer);

export default TimerView;