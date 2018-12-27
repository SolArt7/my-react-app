import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import EField from '../common/EField';
import emailValidator from 'email-validator';


class ManageForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <h5>Manage person</h5>
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="firstName"
                                component={EField}
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                labelText="Name"
                            />
                            <Field
                                name="lastName"
                                component={EField}
                                type="text"
                                className="form-control"
                                placeholder="Enter surname"
                                labelText="Surname"
                            />
                            <Field
                                name="email"
                                component={EField}
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                labelText="Email"
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = ({firstName, lastName, email}) => {
    const errors = {};

    if (!firstName) errors.name = 'Name is required';
    else if (firstName.length < 2) errors.name = 'Name is too short';

    if (!lastName) errors.surname = 'Surname is required';
    else if (lastName.length < 2) errors.surname = 'Surname is too short';

    if (!email) errors.email = 'Email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Email not valid';

    return errors;
};

export default reduxForm({
    form: 'person',
    validate
})(ManageForm);