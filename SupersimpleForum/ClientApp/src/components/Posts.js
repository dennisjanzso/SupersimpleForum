import React, { Component } from 'react';
import {Link} from "react-router-dom";
import UserSession from "../UserSession";

export class Posts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {posts: [], loading: true}
    }
    
    componentDidMount() {
        this.populatePosts()
    }
    
    displayPosts() {
        if (this.state.loading){
            return <p>Loading posts...</p>
        } else{
            return(
                <div className="list-group">
                    {this.state.posts.reverse().map((post) =>
                        <Link to={"/postView/" + post.post_id}>
                            <div className="list-group-item bg-danger text-white">
                                <h4>{post.title}</h4>
                                <p>Written by {post.author}</p>
                            </div>
                        </Link>
                    )}
                </div>
            )
            
        }
    }

    render() {
        return(
            <div className="text-danger">
                <h1>Latest posts</h1>
                {this.displayPosts()}
            </div>
        )
    }
    
    async populatePosts() {
        const response = await fetch('posts')
        const data = await response.json();
        this.setState({posts: data, loading: false})
    }
    
}