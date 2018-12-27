import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'

class SignInForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <h5>Sign in</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'auth',
})(SignInForm);