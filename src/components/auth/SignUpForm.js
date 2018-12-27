import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator';
import EField from '../common/EField';

class SignUpForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <h5>Sign up</h5>
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="name"
                                component={EField}
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                labelText="Name"
                            />
                            <Field
                                name="email"
                                component={EField}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                labelText="Email address"
                                smallText="We'll never share your email with anyone else."
                            />
                            <Field
                                name="password"
                                component={EField}
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                labelText="Password"
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = ({email, password}) => {
    const errors = {};
    
    if (!email) errors.email = 'Email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Email not vaild';
    
    if (!password) errors.password = 'Password is required';
    else if (password.length < 8) errors.password = 'Password is too short';
    
    return errors;
};

export default reduxForm({
    form: 'register',
    validate
})(SignUpForm);