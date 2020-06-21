import React, { Component } from 'react';
import {Comment} from "./Comment";

export class CommentsView extends Component {

    constructor(props) {
        super(props);
        this.state = {comments: []}
    }

    componentDidMount() {
        this.setState({comments: this.props.comments})
    }
    
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({comments: nextProps.comments})
    }

    render() {
        return(
            <div className="list-group">
                {this.state.comments.map((comment) =>
                    <div className="list-group-item border-0">
                        <Comment data={comment} />
                    </div>
                )}
            </div>
        )
    }

}