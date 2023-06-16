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

export class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: 0,
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            isError: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                phoneNumber: ''
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let isError = { ...this.state.isError };

        // Update isError for all fields
        Object.keys(isError).forEach(fieldName => {
            const value = this.state[fieldName];
            switch (fieldName) {
                case 'firstName':
                    isError.firstName = value.length < 4 ? 'At least 4 characters required' : '';
                    break;
                case 'lastName':
                    isError.lastName = value.length < 6 ? 'At least 6 characters required' : '';
                    break;
                case 'userName':
                    isError.userName = value.length < 6 ? 'At least 6 characters required' : '';
                    break;
                case 'email':
                    isError.email = regExp.test(value) ? '' : 'Email address is invalid';
                    break;
                case 'phoneNumber':
                    isError.phoneNumber = value.length < 10 ? 'At least 10 characters required' : '';
                    break;
                default:
                    break;
            }
        });

        this.setState({ isError }, () => {
            if (formValid(this.state)) {
                console.log(this.state);
                this.updateClick(this.state.id)
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
            case 'firstName':
                isError.firstName = value.length < 4 ? 'At least 4 characters required' : '';
                break;
            case 'lastName':
                isError.lastName = value.length < 4 ? 'At least 6 characters required' : '';
                break;
            case 'userName':
                isError.userName = value.length < 4 ? 'At least 6 characters required' : '';
                break;
            case 'email':
                isError.email = regExp.test(value) ? '' : 'Email address is invalid';
                break;

            case 'phoneNumber':
                isError.phoneNumber =
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

    refreshList(id) {
        //const id = this.props.match.params.id;
        //console.log('The id is : ',id);
        const response = fetch('https://localhost:7168/api/Users/GetUserById?' + new URLSearchParams({
            userid: id
        }),

            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                this.setState({
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    userName: result.userName,
                    email: result.email,
                    phoneNumber: result.phoneNumber
                });
            }, (error) => {
                alert(error);
            })
    }
    componentDidMount() {
        this.refreshList(this.state.id);
    }

    updateClick(id) {
        fetch('https://localhost:7168/api/Users/Updateuser/userid?' + new URLSearchParams({
            userid: id
        }),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    userName: this.state.userName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber
                })
            })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                window.location.href = '/users';
            }, (error) => {
                alert(error);
            })
    }


    render() {
        const temp = window.location.href.split('/');
        const userId = temp[temp.length - 1]
        //console.log('The user id is :', userId);
        this.state.id = userId;
        const { isError } = this.state;
        const {
            id,
            firstName,
            lastName,
            userName,
            email,
            phoneNumber,
        } = this.state;
        return (
            <form onSubmit={this.onSubmit} noValidate>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <span className="input-group-text">First Name</span>
                            <input
                                type="text"
                                value={firstName}
                                className={
                                    isError.firstName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="firstName"
                                onChange={this.formValChange}
                            />
                            {isError.firstName.length > 0 && (
                                <span className="invalid-feedback">{isError.firstName}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <span className="input-group-text">Last Name</span>
                            <input
                                type="text"
                                value={lastName}
                                className={
                                    isError.lastName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="lastName"
                                onChange={this.formValChange}
                            />
                            {isError.lastName.length > 0 && (
                                <span className="invalid-feedback">{isError.lastName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <span className="input-group-text">User Name</span>
                            <input
                                type="text"
                                value={userName}
                                className={
                                    isError.userName.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="userName"
                                onChange={this.formValChange}
                            />
                            {isError.userName.length > 0 && (
                                <span className="invalid-feedback">{isError.userName}</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <span className="input-group-text">Email</span>
                            <input
                                type="email"
                                value={email}
                                className={isError.email.length > 0 ? 'is-invalid form-control' : 'form-control'}
                                name="email"
                                onChange={this.formValChange}
                            />
                            {isError.email.length > 0 && (
                                <span className="invalid-feedback">{isError.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <span className="input-group-text">Phone Number</span>
                            <input
                                type="number"
                                value={phoneNumber}
                                className={
                                    isError.phoneNumber.length > 0 ? 'is-invalid form-control' : 'form-control'
                                }
                                name="phoneNumber"
                                onChange={this.formValChange}
                            />
                            {isError.phoneNumber.length > 0 && (
                                <span className="invalid-feedback">{isError.phoneNumber}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary float-left">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}