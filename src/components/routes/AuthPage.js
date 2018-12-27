import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SignInForm from '../auth/SignInForm';
import {NavLink, Route, Switch} from 'react-router-dom';
import SignUpForm from '../auth/SignUpForm';
import {signUp, signIn, moduleName} from '../../ducks/auth';
import Loader from '../common/Loader';

const ErrorDiv = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: red;
    padding: 5px 0;
`;

class AuthPage extends Component {
    render() {
        const {loading, error} = this.props;
        return (
            <div>
                <h3 className="text-center pt-2">Auth Page</h3>
                
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: 'orangered'}} to="/auth/signin">Sign in</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: 'orangered'}} to="/auth/signup">Sign up</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route path="/auth/signin" render={() => <SignInForm onSubmit={this.handleSignIn} />} />
                    <Route path="/auth/signup" component={() => <SignUpForm onSubmit={this.handleSignUp} />} />
                </Switch>
                { loading && <Loader /> }
                { error && <ErrorDiv>{error.message}</ErrorDiv> }
            </div>
        );
    }
    
    handleSignIn = ({email, password}) => this.props.signIn(email, password);
    handleSignUp = ({email, password}) => this.props.signUp(email, password);
}

export default connect((state => ({
    loading: state[moduleName].loading,
    error: state[moduleName].error
})), { signUp, signIn })(AuthPage);