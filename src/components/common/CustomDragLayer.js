import React, { Component } from 'react';
import {DragLayer} from 'react-dnd';
import styled from 'styled-components';
import PersonCardDragPreview from '../people/PersonCardDragPreview';
import EventDragPreview from '../events/EventDragPreview';

const LayerDiv = styled.div`
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
`;

const previewMap = {
    'person': PersonCardDragPreview,
    'event': EventDragPreview
};

class CustomDragLayer extends Component {
    
    getItem() {
        const {offset, item, itemType} = this.props;
        const PreviewComponent = previewMap[itemType];
        if (!offset || !PreviewComponent) return null;
        const {x, y} = offset;

        const style = {
            transform: `translate(${x}px, ${y}px)`
        };

        return <div style={style}><PreviewComponent {...item} /></div>
    }
    
    render() {
        const {isDragging} = this.props;
        if (!isDragging) return null;
        const item = this.getItem();
        if (!item) return null;
        return (
            <LayerDiv>
                {this.getItem()}
            </LayerDiv>
        );
    }
}

const collect = (monitor) => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
    item: monitor.getItem(),
    itemType: monitor.getItemType()
});

export default DragLayer(collect)(CustomDragLayer);