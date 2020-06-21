import React, { Component } from 'react';
import {CommentsView} from "./CommentsView";
import UserSession from "../UserSession";

export class PostView extends Component {

    constructor(props) {
        super(props);
        this.state = {postId: "", postTitle: "", postAuthor: "", postData:"", comment: "", status: "", loading: true, comments: []};
    }

    componentDidMount() {
        this.setState({postId: this.props.match.params.post_id})
        this.populateState()
        this.populateComments()
    }
    
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({postId: this.props.match.params.post_id})
        this.populateState()
    }

    commentChange = (event) => {
        this.setState({comment: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.publishComment()
    }
    
    checkValidCommenting () {
        if (UserSession.checkSession()){
            return(
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label className="my-1 mr-2">Comment</label>
                    <input value={this.state.comment} onChange={this.commentChange} className="form-control form-control-sm" required/>
                    <button className="btn btn-danger btn-sm my-1" type="submit" value="submit">Post comment</button>
                    <small className="form-text text-danger">{this.state.status}</small>
                </form>
            )
        } return (
            <small className="form-text text-danger">Log in to comment</small>
        )
        
    }
    
    deleteButton () {
        if (this.state.postAuthor === UserSession.getUsername()){
            return(
                <button className="btn btn-outline-secondary btn-sm" onClick={() => { if (window.confirm('Are you sure?\nThis will permanently delete the post and all its comments')) this.deletePost() } }>
                    Delete Post
                </button>
            )
        } return null
    }

    displayPosts() {
        if (this.state.loading) {
            return <p>Loading post... ID:{this.state.postId}</p>
        } else {
            return (
                <div className="text-danger">
                    <p>{this.state.raw}</p>
                    <h1>{this.state.postTitle}</h1>
                    <h6>By {this.state.postAuthor}</h6>
                    <p>{this.state.postData}</p>
                    {this.deleteButton()}
                    {this.checkValidCommenting()}
                    <CommentsView comments={this.state.comments}/>
                </div>
            );
        }
    }
    
    

    render() {
        return (
            <div>
                {this.displayPosts()}
            </div>
        )
    }

    async populateState() {
        const response = await fetch('posts/' + this.props.match.params.post_id)
        const data = await response.json();
        console.log(data)
        this.setState({postTitle: data[0].title, postAuthor: data[0].author, postData: data[0].text, loading: false, counter: this.state.counter + 1})
    }

    async populateComments() {
        const response = await fetch('comment/' + this.props.match.params.post_id + '/0')
        console.log('comment/' + this.props.post_id)
        const data = await response.json();
        console.log(data)
        this.setState({comments: data})
        this.forceUpdate()
    }

    async publishComment() {
        const response = await fetch('comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "comment_id": 0,
                "author": UserSession.getUsername(),
                "text": this.state.comment,
                "parent_id": parseInt(this.props.match.params.post_id),
                "subComment": 0
            })
        })
        const data = await response.json();
        this.setState({status: data})
        this.populateComments()
    }

    async deletePost() {
        const response = await fetch('posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "post_id": parseInt(this.state.postId),
                "title": this.state.postTitle,
                "text": this.state.postData,
                "author": UserSession.getUsername(),
                "action": "DELETE"
            })
        })
        const data = await response.json();
        console.log("delete results:" + data)
        if (data === "Post deleted successfully"){
            this.props.history.push('/')
        }
    }

}