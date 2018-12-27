import React from 'react';
import {DropTarget} from 'react-dnd';
import {addEventToPerson, peopleListSelector} from '../../ducks/people'
import {connect} from 'react-redux';


const SelectedEventCard = ({event, connectDropTarget, hovered, canDrop, people}) => {
    const style = {
        backgroundColor: canDrop ? ( hovered ? '#ccf8cc' : '#edfeed' ) : '',
    };
    const peopleElements = people && people.map(person => <div key={person.uid}>{person.firstName} - {person.email}</div>);
    
    return connectDropTarget(
        <div className="col-sm-3 pb-1">
            <div className="card" style={{width: '18rem', ...style}}>
                <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{event.when}</h6>
                    <p className="card-text">{event.where}</p>
                    <button className="card-link">Conference detail</button>
                    {people.length && <div>Who wil visit:</div>}
                    {peopleElements}
                </div>
            </div>
        </div>
    );
};

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid;
        const eventUid = props.event.uid;
        props.addEventToPerson(eventUid, personUid);
        return { eventUid }
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()

});

export default connect((state, props) => ({
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
}), { addEventToPerson })(DropTarget(['person'], spec, collect)(SelectedEventCard));
