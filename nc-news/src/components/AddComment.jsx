import React, { Component } from "react";
import * as api from "../util/api";

class AddComment extends Component {
  state = {
    comment: "",
    article_id: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, user, handleNewComment } = this.props;
    const { comment } = this.state;
    api.addComment(id, user, comment).then((newComment) => {
      handleNewComment(newComment);
    });
    this.setState({ comment: "" });
  };

  handleInput = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { comment } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add comment:
            <br />
            <textarea
              name="comment"
              onChange={this.handleInput}
              cols="30"
              rows="7"
              required
              value={comment}
            ></textarea>
          </label>
          <br />
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
