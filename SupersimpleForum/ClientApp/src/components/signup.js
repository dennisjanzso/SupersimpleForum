import React, { Component } from 'react';
import {Link} from "react-router-dom";
import UserSession from "../UserSession";

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", status: "", logged_in: false}
    }

    componentDidMount() {
        if (UserSession.checkSession()){
            this.setState({logged_in: true})
        }
    }

    usernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.create_user()
        // do signup here
        // redirect if valid
    }

    blockLoggedIn() {
        if (this.state.logged_in){
            return(<h1 className="text-danger">Already logged in</h1>)
        } return(
            <div className="text-danger">
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-danger">
                        <label>Username</label>
                        <input value={this.state.username} onChange={this.usernameChange} className="form-control text-danger" required autoFocus/>
                    </div>
                    <div className="form-group text-danger">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.passwordChange} className="form-control text-danger" required/>
                        <small className="form-text text-muted">{this.state.status}</small>
                    </div>
                    <button className="btn btn-primary bg-danger border-white" type="submit" value="submit">Sign up</button>
                </form>
            </div>
        )
    }

    redirect() {
        this.props.history.push('/')
    }
    
    render() {
        return(
            this.blockLoggedIn()
        )
    }

    async create_user() {
        const response = await fetch('user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": 0,
                "username": this.state.username,
                "password": this.state.password,
                "action": "CREATE_USER"
            })
        })
        const data = await response.json();
        this.setState({status: data["item2"], logged_in: data["item1"]})
        if (data["item1"]){
            UserSession.setUsername(this.state.username)
            UserSession.updateNavMenu()
            this.redirect()
        }
    }
    
    

}