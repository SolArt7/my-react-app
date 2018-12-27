import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../assets/logo.png';
import {connect} from 'react-redux';
import {signOut, moduleName} from '../ducks/auth';

class Header extends Component {
    render() {
        const {signedIn, signOut, userName} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <NavLink activeClassName="active" className="nav-link" to="/" exact>
                    <img src={Logo} alt="Logo" style={{width: '40px', height: '40px'}}/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/auth/signin">Auth</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/people">People page</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/events">Events page</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/admin">Admin page</NavLink>
                        </li>
                    </ul>
                </div>
                {signedIn &&
                <div className="my-2" style={{width: 'auto'}}>
                    <span className="mr-2">{userName}</span>
                    <button className="btn btn-outline-success my-1" onClick={signOut}>Sign out</button>
                </div>}
            </nav>
        )
    }
}

export default connect((state) => ({
    signedIn: !!state[moduleName].user,
    userName: (state[moduleName].user && (state[moduleName].user.email || state[moduleName].user.user.email)),
}), {signOut}, null, {pure: false})(Header);
