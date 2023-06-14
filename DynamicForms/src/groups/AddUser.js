import React, { Component } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: [],
            userid: 0,
            groupId: 0,
            firstName: "",
            lastName: "",
            Name: "",
            email: "",
            phoneNumber: ""
        }
    }
    //   var str1 = "Example of ";
    //  var str2 = "Javascript ";
    // var str3 = "String Concatenation";
    //var res = str1.concat(str2, str3);

    /*Get all Users in List*/
    refreshList(groupId) {
        fetch(`https://localhost:7168/api/Group/GetUsersInGroup/${groupId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ Users: data });
            });
    }
    componentDidMount() {
        this.refreshList(this.state.groupId);
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit User",
            id: dep.id,
            name: dep.name,
            lastName: dep.lastName,
            Name: dep.Name,
            email: dep.email,
            phoneNumber: dep.phoneNumber
        });
    }
    changefirstName = (e) => {
        this.setState({ firstName: e.target.value });
    }
    changelastName = (e) => {
        this.setState({ lastName: e.target.value });
    }

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeemail = (e) => {
        this.setState({ email: e.target.value });
    }
    changephoneNumber = (e) => {
        this.setState({ phoneNumber: e.target.value });
    }
    
    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:7168/api/Group/DeleteUserFromGroup/groupId/userId' + new URLSearchParams({
                id: id
            }), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    render() {
        const {
            Users,
            modalTitle,
            ids,
            firstName,
            lastName,
            Name,
            email,
            // passwordHash,
            phoneNumber
        } = this.state;
        //const { id } = this.props.match;
        //const [queryParameters] = useSearchParams()
        const temp = window.location.href.split('/');
        const groupId = temp[temp.length-1]
        //console.log('The group id is :', groupId);
        this.state.groupId = groupId;
            return (
                <div>
                    <Link exact to="/AddUser">
                        <button type="button"
                            className="btn btn-primary m-2 float-end">
                            Create User
                        </button></Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    PhoneNumber
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map(dep =>
                                <tr key={dep.id}>
                                    <td>{dep.name}</td>
                                    <td>{dep.email}</td>
                                    <td>{dep.phoneNumber}</td>
                                    <td>
                                        <button type="button" name="deleteButton"
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick(dep.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="modal fade" id="exampleModalw" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">First Name</span>
                                        <input type="text" className="form-control"
                                            value={firstName}
                                            onChange={this.changefirstName} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Last Name</span>
                                        <input type="text" className="form-control"
                                            value={lastName}
                                            onChange={this.changelastName} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">User Name</span>
                                        <input type="text" className="form-control"
                                            value={Name}
                                            onChange={this.changeName} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Email</span>
                                        <input type="text" className="form-control"
                                            value={email}
                                            onChange={this.changeemail} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Phone Number</span>
                                        <input type="text" className="form-control"
                                            value={phoneNumber}
                                            onChange={this.changephoneNumber} />
                                    </div>
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick(id)}
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )        
    }
}