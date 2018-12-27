import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Table, AutoSizer, Column} from 'react-virtualized';
import {fetchPeople, peopleListSelector} from '../../ducks/people';
import Loader from '../common/Loader';

export class PeopleList extends Component {

    componentDidMount() {
        const {peopleLoaded, fetchPeople} = this.props;
        if (!peopleLoaded)
            fetchPeople();
    };
    
    rowGetter = ({index}) => {
        return this.props.people[index];
    };

    render() {
        const {peopleLoading, people} = this.props;
        if (peopleLoading) return <Loader />;
        return (
            <div>
                <h5 className="text-center py-3">People list</h5>
                <AutoSizer>
                    {({width}) => (
                        <Table
                            rowGetter={this.rowGetter}
                            rowCount={people.length}
                            rowHeight={40}
                            overscanRowCount={5}
                            headerHeight={50}
                            width={width}
                            height={500}
                            rowClassName="test--people-list__row"
                        >
                            <Column
                                label="First name"
                                dataKey="firstName"
                                width={width}
                            />
                            <Column
                                label="Last name"
                                dataKey="lastName"
                                width={width}
                            />
                            <Column
                                label="Email"
                                dataKey="email"
                                width={width}
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>  
        );
    }
}

export default connect((state) => ({
    people: peopleListSelector(state),
    peopleLoaded: state.people.loaded,
    peopleLoading: state.people.loading,
}), { fetchPeople })(PeopleList);