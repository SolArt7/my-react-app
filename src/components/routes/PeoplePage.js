import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Switch, NavLink, Route} from 'react-router-dom';
import ManageForm from '../people/ManageForm';
import PeopleList from '../people/PeopleList';
import {addPerson} from '../../ducks/people';

class PeoplePage extends Component {
    render() {
        return (
            <div>
                <h3 className="text-center my-3">People page</h3>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact activeStyle={{color: 'orangered'}} to="/people/">People list</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: 'orangered'}} to="/people/add">Add person</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route path="/people/add" render={() => <ManageForm onSubmit={this.handleManage} />} />
                    <Route path="/" component={PeopleList} />
                </Switch>
            </div>
        )
    }

    handleManage = (values) => this.props.addPerson(values);
};

export default connect((state) => ({

}), { addPerson })(PeoplePage);