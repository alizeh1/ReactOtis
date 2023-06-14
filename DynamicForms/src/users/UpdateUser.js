import React, { Component } from 'react';

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
            PhoneNumber: ""
        }
    }
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
        return (
            <>
                <section className="border" style={{ SpacerSize: '16', height: '70vh' }}>
                    <div className="container-fluid">
                        <form method="post">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label for="LastName">FirstName</label>
                                        {/*<label for="FirstName" style={{ color: 'blue', marginLeft: '-77%' }}>FirstName</label>*/}
                                        <input type="text" onChange={(event) => this.setState({ FirstName: event.target.value })} className="form-control" id="txtFirstName" placeholder="Enter Your First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="LastName">LastName</label>
                                        <input type="text" onChange={(event) => this.setState({ LastName: event.target.value })} className="form-control" id="txtLastName" placeholder="Enter Your Last Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="UserName" >UserName</label>
                                        <input type="text" onChange={(event) => this.setState({ UserName: event.target.value })} className="form-control" id="txtUserName" placeholder="Enter User Name" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label for="Email" >Email</label>
                                        <input type="text" onChange={(event) => this.setState({ Email: event.target.value })} className="form-control" id="txtEmail" placeholder="EnterYourEmail" />
                                    </div>
                                    <div className="form-group">
                                        <label for="Password">Password</label>
                                        <input asp-for="Password" onChange={(event) => this.setState({ Password: event.target.value })} className="form-control" id="txtPassword" placeholder="Enter Password" />
                                    </div>
                                    <div className="form-group">
                                        <label asp-for="PhoneNumber">PhoneNumber</label>
                                        <input type="text" onChange={(event) => this.setState({ PhoneNumber: event.target.value })} className="form-control" id="txtPhone" placeholder="Enter Phone no" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col 4">
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        );
    }
}