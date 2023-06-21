import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            modalTitle: "",
            groupId: 0,
            groupName: "",
            groupDescription: "",
            createdBy: "good",
            createdOn: "2019-01-06T17:16:40",
            modifiedBy: "hhhh",
            modifiedOn: "2019-01-06T17:16:40",
            isActive: true,

            groupNameFilter: "",
            groupDescriptionFilter: "",
            groupsWithoutFilter: [],
            groupNameError: '',
            groupDescriptionError: ''
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        this.setState({ showModal: false }, () => {
            this.refreshList();
            // Implement any other logic to be executed after closing the modal
        });
    }

    FilterFn() {
        var groupNameFilter = this.state.groupNameFilter;
        var groupDescriptionFilter = this.state.groupDescriptionFilter;

        var filteredData = this.state.groupsWithoutFilter.filter(
            function (el) {
                return el.groupName.toString().toLowerCase().includes(
                    groupNameFilter.toString().trim().toLowerCase()
                ) &&
                    el.groupDescription.toString().toLowerCase().includes(
                        groupDescriptionFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ groups: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.groupsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ groups: sortedData });
    }

    changegroupNameFilter = (e) => {
        this.state.groupNameFilter = e.target.value;
        this.FilterFn();
    }
    changegroupDescriptionFilter = (e) => {
        this.state.groupDescriptionFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch('https://localhost:7168/api/Group/GetAllGroups')
            .then(response => response.json())
            .then(data => {
                this.setState({ groups: data, groupsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changegroupName = (event) => {
        this.setState({ groupName: event.target.value });
    };
    validateGroupName = () => {
        const { groupName } = this.state;
        if (groupName.trim() === '') {
            this.setState({ groupNameError: 'Group Name is required' });
        } else {
            this.setState({ groupNameError: '' });
        }
    };
    validateGroupDescription = () => {
        const { groupDescription } = this.state;
        if (groupDescription.trim() === '') {
            this.setState({ groupDescriptionError: 'Group Description is required' });
        } else {
            this.setState({ groupDescriptionError: '' });
        }
    };
    //changegroupName = (e) => {
    //    this.setState({ groupName: e.target.value });
    //}
    changegroupdescription = (event) => {
        this.setState({ groupDescription: event.target.value });
    };

    addClick() {
        this.setState({
            modalTitle: "Create Group",
            groupId: 0,
            groupName: "",
            groupDescription: "",
            createdBy: "good",
            createdOn: "2019-01-06T17:16:40",
            modifiedBy: "hhhh",
            modifiedOn: "2019-01-06T17:16:40",
            isActive: true
        });
    }
    editClick(gro) {
        this.setState({
            modalTitle: "Edit Group",
            groupId: gro.groupId,
            groupName: gro.groupName,
            groupDescription: gro.groupDescription,
            createdBy: gro.createdBy,
            createdOn: gro.createdOn,
            modifiedBy: gro.modifiedBy,
            modifiedOn: gro.modifiedOn,
            isActive: gro.isActive
        });
    }

    createClick() {
        if (this.state.groupName === "" && this.state.groupDescription === "") {
            alert("Please enter group name and group description");
            return false;
        } else if (this.state.groupName === "") {
            alert("Please enter group name");
            return false;
        } else if (this.state.groupDescription === "") {
            alert("Please enter group description");
            return false;
            //if (this.state.groupName === "" && this.state.groupDescription === "") {
            //    alert("please enter group name and group des")
            //    return false;
        } else {
            fetch('https://localhost:7168/api/Group/CreateGroup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupId: this.state.groupId,
                    groupName: this.state.groupName,
                    groupDescription: this.state.groupDescription,
                    createdBy: this.state.createdBy,
                    createdOn: this.state.createdOn,
                    modifiedBy: this.state.modifiedBy,
                    modifiedOn: this.state.modifiedOn,
                    isActive: this.state.isActive
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
    }

    updateClick(groupId) {
        fetch('https://localhost:7168/api/Group/UpdateGroup/groupId?' + new URLSearchParams({
            groupId: groupId
        }),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupId: this.state.groupId,
                    groupName: this.state.groupName,
                    groupDescription: this.state.groupDescription,
                    createdBy: "stri",
                    createdOn: "2019-01-06T17:16:40",
                    modifiedBy: "strs",
                    modifiedOn: "2019-01-06T17:16:40",
                    isActive: true

                })
            })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                this.refreshList();
            }, (error) => {
                console.log(error.message)
                alert('Failed');
            })
    }

    deleteClick(groupId) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:7168/api/Group/DeleteGroup/groupId?' + new URLSearchParams({
                groupId: groupId
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

    adduserClick(groupId) {
        alert(groupId);
        fetch('https://localhost:7168/api/Group/GetUsersInGroup/' + groupId)
            .then(response => response.json())
            .then(data => {
                alert(JSON.stringify(data));
                console.log(data);
                this.setState({ Users: data });
            });
    }

    render() {

        const {
            groups,
            modalTitle,
            groupId,
            groupName,
            groupDescription,
            groupNameError,
            groupDescriptionError,

        } = this.state;

        const handleClose = () => {
            this.setState({ showModal: false });
            window.location.reload();
        };

        return (
            <div>
                    <button type="button"
                        className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalw"
                        onClick={() => this.addClick()}>
                        Create Group
                    </button>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <div className="d-flex flex-row">

                                        <input className="form-control m-2"
                                            onChange={this.changegroupNameFilter}
                                            placeholder="Filter" />

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('groupName', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('groupName', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>

                                    </div>
                                    Group Name
                                </th>
                                <th>
                                    <div className="d-flex flex-row">
                                        <input className="form-control m-2"
                                            onChange={this.changegroupDescriptionFilter}
                                            placeholder="Filter" />

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('groupDescription', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('groupDescription', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    Description
                                </th>
                                <th>
                                    Add User
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(gro =>
                                <tr key={gro.groupId}>
                                    <td>{gro.groupName}</td>
                                    <td>{gro.groupDescription}</td>
                                    <td>{gro.AddUser}
                                        <Link exact to={`/adduser/${gro.groupId}`}>
                                            <button type="button"
                                                //onClick={() => this.adduserClick(gro.groupId)}
                                                className="btn btn-light mr-1" > Add User <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="AddUser" viewBox="0 0 16 16">
                                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalw"
                                            onClick={() => this.editClick(gro)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>


                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick(gro.groupId)}>
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
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="modal-heading" style={{ textAlign: 'left', fontWeight: 'bold' }}>Group Name</div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={groupName} onChange={this.changegroupName} onBlur={this.validateGroupName} />
                                </div>
                                {groupNameError && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{groupNameError}</div>}

                                <div className="modal-heading" style={{ textAlign: 'left', fontWeight: 'bold' }}>Group Description</div>
                                <div className="input-group mb-3">
                                    <textarea className="form-control resize-none" style={{ height: '160px' }} value={groupDescription} onChange={this.changegroupdescription} onBlur={this.validateGroupDescription} />
                                </div>
                                {groupDescriptionError && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{groupDescriptionError}</div>}

                                {groupId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {groupId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick(groupId)}
                                    >Update</button>
                                    : null}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

        )
    }
}
export default Groups;























































