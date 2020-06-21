import React, { Component } from 'react';
import UserSession from "../UserSession";

export class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {commentId: "", commentText: "", commentAuthor: "", subComments: [], comment: "", status: ""}
    }

    componentDidMount() {
        this.setState({
            commentId: this.props.data.comment_id,
            commentText: this.props.data.text,
            commentAuthor: this.props.data.author,
        })
        this.getSubComments()
    }

    displaySubComments() {
        return (
            <div className="list-group">
                {this.state.subComments.map((comment) =>
                    <div className="list-group-item border-0 bg-danger">
                        <Comment data={comment}/>
                    </div>
                )}
            </div>
        )
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
                </form>
            )
        } return (
            <small className="form-text text-white">Log in to comment</small>
        )
    }

    render() {
        return (
            <div className="card border-top-0 border-bottom-0 border-right-0 bg-danger text-white border-white">
                <small>{this.state.commentAuthor} says</small>
                <p>{this.state.commentText}</p>
                {this.checkValidCommenting()}
                {this.displaySubComments()}
            </div>
        )
    }

    async getSubComments() {
        const response = await fetch('comment/' + this.props.data.comment_id + '/1')
        const data = await response.json();
        this.setState({subComments: data})
    }

    async publishComment() {
        const b = JSON.stringify({
            "comment_id": 0,
            "author": UserSession.getUsername(),
            "text": this.state.comment,
            "parent_id": parseInt(this.props.data.comment_id),
            "subComment": 1
        })
        console.log(b)
        const response = await fetch('comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: b
        })
        const data = await response.json();
        console.log(data)
        this.setState({status: data})
        this.getSubComments()
    }
    
}
