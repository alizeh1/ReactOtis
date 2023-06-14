import React, { Component } from 'react';

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)
const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });
    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });
    return isValid;
};


export class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserId: 0,
            FirstName: "",
            LastName: "",
            UserName: "",
            Email: "",
            Password: "",
            PhoneNumber: "",
            isError: {
                FirstName: '',
                LastName: '',
                UserName: '',
                Email: '',
                Password: '',
                PhoneNumber: ''
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
    };
    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "FirstName":
                isError.FirstName =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "LastName":
                isError.LastName =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "UserName":
                isError.UserName =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "Email":
                isError.Email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
                isError.Email =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "Password":
                isError.Password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "PhoneNumber":
                isError.PhoneNumber =
                    value.length < 6 ? "Atleast 10 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({
            isError,
            [name]: value
        })
    };

    refreshList() {
        const response = fetch('https://localhost:7168/api/Users/GetAllUsers')
            .then(response => response.json())
            .then(data => {
                this.setState({ Users: data, UsersWithoutFilter: data });
                alert(data);
            });
    }

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
            }, (error) => {
                alert(error);
            })
    }
    //async refreshList() {
    //    await fetch('https://localhost:7168/api/Group/GetAllGroups')
    //        .then(response => response.json())
    //        .then(data => {
    //            // this.setState({ groups: data });
    //            this.setState({ groups: data, loading: false });
    //            alert(data);
    //        });
    //}
    //componentDidMount() {
    //    this.refreshList();
    //}

    render() {
        const { isError } = this.state;
        return (
            <>
                <div className="container-fluid">
                <div class="row">
                <div class="mx-auto col-12 col-md-10 col-lg-10">
                <form method="post" onSubmit={this.onSubmit} noValidate>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example1">First name</label>
                                            <input
                                                type="text"
                                                className={isError.FirstName.length > 0 ? "is-invalid form-control" : "form-control"}
                                                name="FirstName"
                                                onChange={this.formValChange}
                                            />
                                            {isError.FirstName.length > 0 && (
                                                <span className="invalid-feedback">{isError.FirstName}</span>
                                            )}                            </div>
                        </div>
                        <div class="col">
                             <div class="form-outline">
                                <label class="form-label" for="form3Example2">Last name</label>
                                            <input
                                                type="text"
                                                className={isError.LastName.length > 0 ? "is-invalid form-control" : "form-control"}
                                                name="LastName"
                                                onChange={this.formValChange}
                                            />
                                            {isError.LastName.length > 0 && (
                                                <span className="invalid-feedback">{isError.LastName}</span>
                                            )}                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example1">Username</label>
                                            <input
                                                type="text"
                                                className={isError.UserName.length > 0 ? "is-invalid form-control" : "form-control"}
                                                name="UserName"
                                                onChange={this.formValChange}
                                            />
                                            {isError.UserName.length > 0 && (
                                                <span className="invalid-feedback">{isError.UserName}</span>
                                            )}                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example2">Password</label>
                                            <input
                                                type="password"
                                                className={isError.Password.length > 0 ? "is-invalid form-control" : "form-control"}
                                                name="Password"
                                                onChange={this.formValChange}
                                            />
                                            {isError.Password.length > 0 && (
                                                <span className="invalid-feedback">{isError.Password}</span>
                                            )}
                             </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example1">Email Id</label>
                                    <input
                                        type="email"
                                        className={isError.Email.length > 0 ? "is-invalid form-control" : "form-control"}
                                        name="Email"
                                        onChange={this.formValChange}
                                    />
                                    {isError.Email.length > 0 && (
                                        <span className="invalid-feedback">{isError.Email}</span>
                                    )}                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example2">Contact No</label>
                                            <input
                                                type="text"
                                                className={isError.PhoneNumber.length > 0 ? "is-invalid form-control" : "form-control"}
                                                name="PhoneNumber"
                                                onChange={this.formValChange}
                                            />
                                            {isError.PhoneNumber.length > 0 && (
                                                <span className="invalid-feedback">{isError.PhoneNumber}</span>
                                            )}                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary btn-block mb-4" onClick={() => this.createClick()}
                    >Create</button>
                        </form>
                    </div>
                    </div>
                </div>
            </>
        );
    }
}