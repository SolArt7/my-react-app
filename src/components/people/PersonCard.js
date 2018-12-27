import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

class PersonCard extends Component {
    
    componentDidMount() {
        this.props.connectPreview(getEmptyImage());
    }
    
    render() {
        const {person, connectDragSource, isDragging} = this.props;
        const dragStyle = {
            backgroundColor: isDragging ? '#cccccc' : 'white'
        };
        return connectDragSource(
            <div className="card my-1" style={dragStyle}>
                <div className="card-body">
                    <h5 className="card-title">{person.firstName}</h5>
                    <p className="card-text">{person.email}</p>
                </div>
            </div>
        );
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.person.uid
        }
    },
    endDrag(props, monitor) {
        const personUid = props.person.uid;
        const eventUid = monitor.getDropResult() && monitor.getDropResult().eventUid;
        console.log(personUid, eventUid);
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

export default DragSource('person', spec, collect)(PersonCard);