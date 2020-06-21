import React, { Component } from 'react';
import UserSession from "../UserSession";

export class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {title: "", text: "", status: ""}
    }
    
    componentDidMount() {
        this.checkLoggedIn()
    }


    titleChange = (event) => {
        this.setState({title: event.target.value});
    };

    textChange = (event) => {
        this.setState({text: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.publishPost()
    }
    
    checkLoggedIn () {
        if (!UserSession.checkSession()){
            this.props.history.push('/login')
        }
    }

    render() {
        return(
            <div className="text-danger">
                <h1>Create a new post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-danger">
                        <label>Title</label>
                        <input value={this.state.title} onChange={this.titleChange} className="form-control text-danger" required autoFocus/>
                    </div>
                    <div className="form-group text-danger">
                        <label>Text</label>
                        <textarea value={this.state.text} onChange={this.textChange} className="form-control text-danger" cols="40" rows="5"></textarea>
                    </div>
                    <button className="btn btn-primary bg-danger border-white" type="submit" value="submit">Submit post</button>
                    <small className="form-text text-danger">{this.state.status}</small>
                </form>
            </div>
        )
    }

    async publishPost() {
        const response = await fetch('posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "post_id": 0,
                "title": this.state.title,
                "text": this.state.text,
                "author": UserSession.getUsername(),
                "action": "PUBLISH"
            })
        })
        const data = await response.json();
        this.setState({status: data})
        if (data === "Post published successfully"){
            this.props.history.push('/')
        }
    }

}