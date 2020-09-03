import React, { Component } from "react";
import Loader from "./Loader";
import * as api from "../utilis/api";
import Voter from "./Voter";
import AddComment from "./AddComment";

class ListOfComments extends Component {
  state = {
    isLoading: true,
    comments: {},
    toggleView: true,
  };

  componentDidMount() {
    const { id } = this.props;
    api.getCommentsById(id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  handleNewComment = (newComment) => {
    console.log(newComment);
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  handleDelete = (event) => {
    const commentId = event.target.value;
    const newComments = this.state.comments.filter(
      (comment) => comment.comment_id !== parseInt(commentId)
    );
    this.setState({ comments: newComments });
    api.deleteComment(commentId);
  };

  render() {
    const { isLoading, comments, toggleView } = this.state;
    const { id, user } = this.props;
    if (isLoading) return <Loader />;
    return (
      <>
        {toggleView ? (
          <button
            onClick={() => {
              this.setState({ toggleView: false });
            }}
            className="button"
          >
            Add comment
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                this.setState({ toggleView: true });
              }}
              className="button"
            >
              close comment form
            </button>
            <AddComment
              id={id}
              user={user}
              handleNewComment={this.handleNewComment}
            />
          </>
        )}
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="commentCard">
                <p>
                  <b>Author: </b>
                  {comment.author}
                </p>
                <br />
                <p>
                  <b>Posted at:</b> {comment.created_at}
                </p>
                <br />
                <Voter
                  id={comment.comment_id}
                  votes={comment.votes}
                  type={"comments"}
                />{" "}
                <p>
                  <br />
                  <b>Comment:</b> {comment.body}
                </p>
                <br />
                {comment.author === user && (
                  <button
                    className="voteButton"
                    id="fixedbutton"
                    onClick={this.handleDelete}
                    value={comment.comment_id}
                  >
                    Delete
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default ListOfComments;
