import React, { Component } from 'react';

const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const formValid = ({ isError, ...rest }) => {
    let isValid = true;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false;
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null || val === '') {
            isValid = false;
        }
    });

    return isValid;
};

export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            FirstName: '',
            LastName: '',
            UserName: '',
            Email: '',
            Password: '',
            PhoneNumber: '',
            isError: {
                FirstName: '',
                LastName: '',
                UserName: '',
                Email: '',
                Password: '',
                PhoneNumber: ''
            }
        };
    }

    onSubmit = e => {
        e.preventDefault();
        let isError = { ...this.state.isError };

        // Update isError for all fields
        Object.keys(isError).forEach(fieldName => {
            const value = this.state[fieldName];
            switch (fieldName) {
                case 'FirstName':
                    isError.FirstName = value.length < 4 ? 'At least 4 characters required' : '';
                    break;
                case 'LastName':
                    isError.LastName = value.length < 6 ? 'At least 6 characters required' : '';
                    break;
                case 'UserName':
                    isError.UserName = value.length < 6 ? 'At least 6 characters required' : '';
                    break;
                case 'Email':
                    isError.Email = regExp.test(value) ? '' : 'Email address is invalid';
                    break;
                case 'Password':
                    isError.Password = value.length < 6 ? 'At least 6 characters required' : '';
                    break;
                case 'PhoneNumber':
                    isError.PhoneNumber = value.length < 10 ? 'At least 10 characters required' : '';
                    break;
                default:
                    break;
            }
        });

        this.setState({ isError }, () => {
            if (formValid(this.state)) {
                console.log(this.state);
                this.createClick();
            } else {
                console.log('Form is invalid!');
            }
        });
    };



    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case 'FirstName':
                isError.FirstName = value.length < 4 ? 'At least 4 characters required' : '';
                break;
            case 'LastName':
                isError.LastName = value.length < 4 ? 'At least 6 characters required' : '';
                break;
            case 'UserName':
                isError.UserName = value.length < 4 ? 'At least 6 characters required' : '';
                break;
            case 'Email':
                isError.Email = regExp.test(value) ? '' : 'Email address is invalid';
                break;
            case 'Password':
                isError.Password = value.length < 6 ? 'At least 6 characters required' : '';
                break;
            case 'PhoneNumber':
                isError.PhoneNumber =
                    value.length < 10 ? 'At least 10 characters required' : '';
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        });
    };

    createClick() {
        const response = fetch('https://localhost:7168/api/Authentication/RegisterUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.FirstName,
                lastName: this.state.LastName,
                userName: this.state.UserName,
                email: this.state.Email,
                password: this.state.Password,
                phoneNumber: this.state.PhoneNumber

            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                window.location.href = '/users';
                //this.refreshList();
            }, (error) => {
                alert(error);
            })
    }
    render() {
        const { isError } = this.state;
        return (
            <form onSubmit={this.onSubmit} noValidate>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <span className="input-group-text">First Name</span>
                            <input
                                type="text"
                                className={
                                    isError.FirstName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="FirstName"
                                onChange={this.formValChange}
                            />
                            {isError.FirstName.length > 0 && (
                                <span className="invalid-feedback">{isError.FirstName}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <span className="input-group-text">Last Name</span>
                            <input
                                type="text"
                                className={
                                    isError.LastName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="LastName"
                                onChange={this.formValChange}
                            />
                            {isError.LastName.length > 0 && (
                                <span className="invalid-feedback">{isError.LastName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <span className="input-group-text">User Name</span>
                            <input
                                type="text"
                                className={
                                    isError.UserName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="UserName"
                                onChange={this.formValChange}
                            />
                            {isError.UserName.length > 0 && (
                                <span className="invalid-feedback">{isError.UserName}</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <span className="input-group-text">Email</span>
                            <input
                                type="email"
                                className={isError.Email.length > 0 ? 'is-invalid form-control' : 'form-control'}
                                name="Email"
                                onChange={this.formValChange}
                            />
                            {isError.Email.length > 0 && (
                                <span className="invalid-feedback">{isError.Email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <span className="input-group-text">Password</span>
                            <input
                                type="password"
                                className={
                                    isError.Password.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="Password"
                                onChange={this.formValChange}
                            />
                            {isError.Password.length > 0 && (
                                <span className="invalid-feedback">{isError.Password}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <span className="input-group-text">Phone Number</span>
                            <input
                                type="number"
                                className={
                                    isError.PhoneNumber.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="PhoneNumber"
                                onChange={this.formValChange}
                            />
                            {isError.PhoneNumber.length > 0 && (
                                <span className="invalid-feedback">{isError.PhoneNumber}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary float-left">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}