import React, { Component } from "react";
import Loader from "./Loader";
import * as api from "../utilis/api";

class ListOfComments extends Component {
  state = {
    isLoading: true,
    comments: {},
  };

  componentDidMount() {
    const { id } = this.props;
    api.getCommentsById(id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { isLoading, comments } = this.state;
    if (isLoading) return <Loader />;
    return (
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="commentCard">
              <p>
                <b>Author: </b>
                {comment.author}
              </p>

              <p>
                <b>Comment Id:</b> {comment.comment_id}
              </p>
              <p>
                <b>Created at:</b> {comment.created_at}
              </p>
              <p>
                <b>Votes:</b> {comment.votes}
              </p>
              <p>
                <br />
                <b>Comment:</b> {comment.body}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListOfComments;
