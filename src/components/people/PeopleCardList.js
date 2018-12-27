import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List} from 'react-virtualized';
import {fetchPeople, peopleListSelector} from '../../ducks/people';
import PersonCard from './PersonCard';

class PeopleCardList extends Component {

    componentDidMount() {
        const {people, fetchPeople} = this.props;
        if (!people.loaded)
            fetchPeople();
    }

    rowRenderer = ({index, key, style}) => <PersonCard person={this.props.people[index]} key={key} style={style} />

    render() {
        const {people} = this.props;
        return (
            <div>
                <List 
                    rowCount={people.length}
                    rowHeight={100}
                    height={300}
                    width={200}
                    rowRenderer={this.rowRenderer}
                />
            </div>
        );
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchPeople })(PeopleCardList);