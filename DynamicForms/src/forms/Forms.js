import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Forms: [],
            formId: 0,
            formDescription:"",
            formName: "",
            createdBy: "",
            createdOn: "",
            isPending: "",
            isSubmitted: "",
            isActive:""
        }
    }
    /*Get all Users in List*/
    refreshList() {
        const response = fetch('https://localhost:7168/api/Users/GetAllUsers')
            .then(response => response.json())
            .then(data => {
                this.setState({ Users: data });
            });
    }
    componentDidMount() {
        //this.refreshList();
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit User",
            id: dep.id,
            firstName: dep.firstName,
            lastName: dep.lastName,
            userName: dep.userName,
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
    changeuserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    changeemail = (e) => {
        this.setState({ email: e.target.value });
    }
    changephoneNumber = (e) => {
        this.setState({ phoneNumber: e.target.value });
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
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:7168/api/Users/DeleteUser/userid?' + new URLSearchParams({
                userid: id
            }), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(JSON.stringify(result));
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    render() {
        const {
            Forms,
            modalTitle,
            formId,
            formName,
            createdBy,
            createdOn,
            isPending,
            isSubmitted,                        
        } = this.state;
        return (
            <div>
                <Link exact to="/Form">
                    <button type="button"
                        className="btn btn-primary m-2 float-end">
                        Add Form
                    </button></Link>
                <Link exact to="/CreateForms">
                    <button type="button"
                        className="btn btn-primary m-2 float-end">
                        CreateForm
                    </button></Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Form Name
                            </th>
                            <th>
                                Created By
                            </th>
                            <th>
                                Date Created
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Publish
                            </th>
                            <th>
                                Assign to Group
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Forms.map(form =>
                            <tr key={form.formId}>
                                <td>{form.formName}</td>
                                <td>{form.createdBy}</td>
                                <td>{form.createdOn}</td>
                                <td>{form.isSubmitted}</td>
                                <td>{form.isActive}</td>
                                <td>{form.AddGroup}
                                    <Link exact to={`/addgroup/${gro.groupId}`}>
                                        <button type="button"
                                            //onClick={() => this.adduserClick(gro.groupId)}
                                            className="btn btn-light mr-1" > Add Group <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="AddGroup" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <Link exact to={`/UpdateUser/${dep.id}`}>
                                        <button type="button" name="editButton"
                                            className="btn btn-light mr-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    </Link>
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
                {/*<div className="modal fade" id="exampleModalw" tabIndex="-1" aria-hidden="true">*/}
                {/*    <div className="modal-dialog modal-lg modal-dialog-centered">*/}
                {/*        <div className="modal-content">*/}
                {/*            <div className="modal-header">*/}
                {/*                <h5 className="modal-title">{modalTitle}</h5>*/}
                {/*                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"*/}
                {/*                ></button>*/}
                {/*            </div>*/}
                {/*            <div className="modal-body">*/}
                {/*                <div className="input-group mb-3">*/}
                {/*                    <span className="input-group-text">First Name</span>*/}
                {/*                    <input type="text" className="form-control"*/}
                {/*                        value={firstName}*/}
                {/*                        onChange={this.changefirstName} />*/}
                {/*                </div>*/}
                {/*                <div className="input-group mb-3">*/}
                {/*                    <span className="input-group-text">Last Name</span>*/}
                {/*                    <input type="text" className="form-control"*/}
                {/*                        value={lastName}*/}
                {/*                        onChange={this.changelastName} />*/}
                {/*                </div>*/}
                {/*                <div className="input-group mb-3">*/}
                {/*                    <span className="input-group-text">User Name</span>*/}
                {/*                    <input type="text" className="form-control"*/}
                {/*                        value={userName}*/}
                {/*                        onChange={this.changeuserName} />*/}
                {/*                </div>*/}
                {/*                <div className="input-group mb-3">*/}
                {/*                    <span className="input-group-text">Email</span>*/}
                {/*                    <input type="text" className="form-control"*/}
                {/*                        value={email}*/}
                {/*                        onChange={this.changeemail} />*/}
                {/*                </div>*/}
                {/*                <div className="input-group mb-3">*/}
                {/*                    <span className="input-group-text">Phone Number</span>*/}
                {/*                    <input type="text" className="form-control"*/}
                {/*                        value={phoneNumber}*/}
                {/*                        onChange={this.changephoneNumber} />*/}
                {/*                </div>*/}
                {/*                        <button type="button"*/}
                {/*                    className="btn btn-primary float-start"*/}
                {/*                    onClick={() => this.updateClick(id)}*/}
                {/*                        >Update</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}