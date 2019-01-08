import React, {Component} from 'react';
import TrashImg from '../../assets/trash.png';
import styled from 'styled-components';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {stateSelector, deleteEvent} from '../../ducks/events';
import Loader from '../../components/common/Loader';

const TrashDiv = styled.div`
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s ease-in;
  
  transform: scale(${props => props.isOver ? 1.2 : 1});
`;

class Trash extends Component {
    render() {
        const styles = {
            display: 'inline-block',
            width: '60px',
            height: '60px',
            position: 'fixed',
            bottom: 0,
            right: 0,
        };
        const {connectDropTarget, isOver, loading} = this.props;
        return connectDropTarget(
            <div style={styles}>
                <TrashDiv isOver={isOver}>
                    {loading ? <Loader/> : <img src={TrashImg} alt="Trash" style={{width: '100%', height: 'auto'}}/>}
                </TrashDiv>
            </div>
        );
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        props.deleteEvent(item.uid)
    }
};

export default connect((state) => ({
    isLoading: stateSelector(state).loading
}), { deleteEvent })(DropTarget('event', spec, collect)(Trash));