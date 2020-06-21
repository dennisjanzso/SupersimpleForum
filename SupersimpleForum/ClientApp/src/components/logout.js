import React, { Component } from 'react';
import UserSession from "../UserSession";


export class Logout extends Component {

    constructor(props) {
        super(props);
        console.log("logged out")
    }
    
    componentDidMount() {
        UserSession.logout()
        UserSession.updateNavMenu()
        this.props.history.push('/')
    }
    
    render() {
        return null
    }
}