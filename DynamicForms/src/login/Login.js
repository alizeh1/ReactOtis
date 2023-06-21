import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            UserName: "",
            Password: "",
            Role: "",
            token:"",
            isUserAuthenticated: false
        }
    }
    loginClick() {
        const response = fetch('https://localhost:7168/api/Authentication/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Role: 'Admin',
                UserName: this.state.UserName,
                Password: this.state.Password
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                var tokens = result.tokens;
                if (result === 'Invalid Credentials!') {
                    alert('Bad Request');
                }
                else {
                    if (tokens != null) {
                        sessionStorage.setItem('token', tokens);
                        window.location.href = `/MiddleWare?data=${this.state.isUserAuthenticated = true}`;
                    }
                    else {
                        alert('Token not found');
                    }
                }
            }, (error) => {
                alert(error);
            })
    }
    changeUserName = (event) => {
        this.setState({ UserName: event.target.value });
    }
    changePassword = (event) => {
        this.setState({ Password: event.target.value });
    }
    render() {
        return (
            <section className="vh-100" style={{ backgroundColor: '#105CAD' }}>
                <div className="container py-5 h-70">
                    <div className="row d-flex justify-content-center align-items-center h-">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <h2 className="mb-5" style={{ color: '#105CAD' }}>OTIS</h2>
                                    <div className="form-outline mb-4">
                                        <label className="form-label text-start" style={{ textAlign: 'left' }} for="typeEmailX-2">Username</label>
                                        <input type="email" onChange={this.changeUserName} id="typeEmailX-2" placeholder="Please enter your user name" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label text-start" style={{ margin: 'auto', marginLeft: '0' }} for="typePasswordX-2">Password</label>
                                        <input type="password" onChange={this.changePassword} id="typePasswordX-2" placeholder="Please enter your password" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                        <label className="form-check-label" for="form1Example3"> Remember me </label>
                                        <Link exact to="/CreateUser" style={{ margin: 'auto', marginRight: '0' }} className="justify-content-end ">Forgot Password?</Link>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block mb-2" onClick={() => this.loginClick()} style={{ width: "100%" }} type="submit">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}