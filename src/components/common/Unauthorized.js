import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Unauthorized extends Component {
    render() {
        return (
            <div className="alert alert-danger text-center">
                <b>You are unauthorized. Please <Link to="/auth/signin">Sign in</Link> or <Link to="/auth/signin">Sign up</Link></b>
            </div>
        );
    }
}

export default Unauthorized;