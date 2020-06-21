import React, { Component } from 'react';
import {Link} from "react-router-dom";
import UserSession from "../UserSession";
import { NavMenu } from "./NavMenu";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", status: "", logged_in: false}
    }


    usernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    };
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.login()
    }
    
    componentDidMount() {
        console.log("login mounet...")
        if (UserSession.checkSession()){
            this.setState({logged_in: true})
            console.log("...With login")
        }
    }

    blockLoggedIn() {
        if (this.state.logged_in){
            return(<h1>Already logged in</h1>)
        } return(
            <div className="text-danger">
                <h1>Login</h1>
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-group text-danger">
                        <label>Username</label>
                        <input value={this.state.username} onChange={this.usernameChange} className="form-control text-danger" required autoFocus/>
                    </div>
                    <div className="form-group text-danger">
                        <label>Password</label>
                        <input type="password" value={this.state.password} className="form-control text-danger" onChange={this.passwordChange} required/>
                        <small className="form-text text-muted">{this.state.status}</small>
                    </div>
                    <button className="btn btn-primary bg-danger border-white" type="submit" value="submit">Log in</button>
                </form>
                <Link to="/signup">
                    <small className="text-danger">New here? Click here to sign up</small>
                </Link>
            </div>
        )
    }
    
    render() {
        return(
            this.blockLoggedIn()
        )
    }
    
    redirect() {
        this.props.history.goBack()
    }

    async login() {
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
                "action": "LOGIN"
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