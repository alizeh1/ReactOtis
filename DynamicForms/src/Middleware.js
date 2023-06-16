import React, { Component } from 'react';
import App from './App';
import { Login } from './login/Login';
export class MiddleWare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAuthenticated: false
        }
    }
    render() {
        const temp = window.location.href.split('/');
        const data = temp[temp.length - 1]
        //console.log('The user id is :', userId);
        this.state.isUserAuthenticated = data;
        return (
            this.state.isUserAuthenticated ? (
                <App />
            ) : (
                <Login />
            )
        );
    }
}