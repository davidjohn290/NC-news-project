import React, { Component } from "react";
import * as api from "../utilis/api";

class AddComment extends Component {
  state = {
    comment: "",
    article_id: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, user } = this.props;
    const { comment } = this.state;
    api.addComment(id, user, comment);
  };

  handleInput = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
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
