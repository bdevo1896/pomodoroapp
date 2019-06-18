import {connect} from 'react-redux';

const Accomplishment = ({text,date}) => (
    <div>
        <p>{text}</p>
        <small>{date}</small>
    </div>
)

function AccomplishmentArchive(props) {
    const {list} = props;
    return (
        <div id="accomplishment-archive-container">
        <h2>Accomplishment Archive</h2>
        <ul>
        {
            Object.values(list).map((task)=> {
                return (
                    <Accomplishment 
                        key={task.id}
                        text={task.text}
                        date={task.date}
                    />
                )
            })
        }
        </ul>
        </div>
    )
}

const mapState = state => ({
    list: state.taskList.accomplishments
})

const AccomplishmentArchiveView = connect(mapState)(AccomplishmentArchive);

export default AccomplishmentArchiveView;