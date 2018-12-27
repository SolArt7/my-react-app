import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import Header from './Header';
import ProtectedRoute from './common/ProtectedRoute';
import PeoplePage from './routes/PeoplePage';
import EventsPage from './routes/EventsPage';
import CustomDragLayer from './common/CustomDragLayer';

class Root extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <Switch>
                        <Route path="/auth" component={AuthPage} />
                        <ProtectedRoute path="/admin" component={AdminPage} />
                        <Route path="/people" component={PeoplePage} />
                        <Route path="/events" component={EventsPage} />
                    </Switch>
                    <CustomDragLayer />
                </div>
            </div>
        );
    }
}

export default Root;