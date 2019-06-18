import {CircleChart} from './CircleChart';
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getTaskIndexFromID} from '../util/HelperFunctions';

function TimeView ({currentTime}) {
    let minutes = Math.floor(currentTime/60);
    let seconds = currentTime - (minutes * 60);
    return <p className="timeView">{`${minutes} : ${seconds < 10 ? '0'+seconds : seconds}`}</p>
}


class Timer extends PureComponent {
    EASY_TIME = 15 * 60;
    NORMAL_TIME = 25 * 60;
    HARD_TIME = 50 * 60;

    constructor(props) {
        super(props);
        this.state = {
            timerValue: 0,
            timer: null,
            isRunning: false,
            workSessionDone: false
        }
        this.setTimer = this.setTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
        this.getDifficultyTime = this.getDifficultyTime.bind(this);
    }

    setTimer(difficulty) {
        switch(difficulty) {
        case 3:
            this.setState({timerValue: this.HARD_TIME});
            break;
        case 2:
            this.setState({timerValue: this.NORMAL_TIME});
            break;
        default:
            this.setState({timerValue: this.EASY_TIME});
            break;
        }
    }

    getDifficultyTime(difficulty) {
        switch(difficulty) {
            case 3:
                return this.HARD_TIME;
            case 2:
                return this.NORMAL_TIME;
            default:
                return this.EASY_TIME;
        }
    }

    decrementTime() {
        const {timerValue} = this.state;
        const {completeTask,queue} = this.props;
        this.setState({timerValue: timerValue -1},()=>{
            if(this.state.timerValue <= 0) {
                this.stopTimer();
                this.setState({workSessionDone: true});
                completeTask(queue[0].id);
            }
        });
    }

    stopTimer() {
        clearInterval(this.state.timer);
        this.setState({timer: null,isRunning: false});
    }

    startTimer() {
        const {timerValue,timer,workSessionDone} = this.state;
        if(timerValue != 0 && timer == null) {
            this.setState({timer: setInterval(this.decrementTime,10),isRunning: true})
        }

        if(workSessionDone == true) {
            this.setState({workSessionDone: false})
        }
    }

    resetTimer() {
        clearInterval(this.state.timer);
        this.setState({timer: null,timerValue: 0,isRunning: false});
    }

    render() {
        const {timerValue,isRunning} = this.state;
        const {queue,list} = this.props;

        let difficulty = 1;

        if(queue.length > 0) {
            difficulty = list[queue[0].id].difficulty;
        }

        return (
            <div id="timer-container">
                <CircleChart 
                    percentage={(timerValue /this.getDifficultyTime(difficulty)) * 100}
                    sideLength="100%"
                />
                <div className="info-display">
                    <TimeView currentTime={timerValue} />
                    <div className="button-deck">
                    {(!isRunning) &&
                        <button onClick={() => this.setTimer(difficulty)}>Add Time</button>
                    }
                    {(!isRunning) &&
                        <button onClick={() => this.startTimer()}>{(timerValue > 0 && timerValue != this.EASY_TIME && timerValue != this.getDifficultyTime(difficulty)) ? 'Resume':'Start'}</button>
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