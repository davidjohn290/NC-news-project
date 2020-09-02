import React, { Component } from "react";
import * as api from "../utilis/api";
class Voter extends Component {
  state = {
    addedvote: 0,
    upvoted: false,
    downvoted: false,
  };

  handleUpVote = (event) => {
    const { id } = this.props;
    api.addVotes(id, 1);
    this.setState((currentState) => {
      return {
        upvoted: !currentState.upvoted,
        downvoted: false,
        addedvote: currentState.addedvote + 1,
      };
    });
  };

  handleDownVote = (event) => {
    const { id } = this.props;
    api.addVotes(id, -1);
    this.setState((currentState) => {
      return {
        downvoted: !currentState.downvoted,
        upvoted: false,
        addedvote: currentState.addedvote - 1,
      };
    });
  };

  render() {
    const { upvoted, downvoted, addedvote } = this.state;

    return (
      <div>
        <button
          onClick={this.handleUpVote}
          className="voteButton"
          name="upvoted"
          id={upvoted ? "voted" : null}
          disabled={addedvote === 1}
        >
          Upvote
        </button>
        <button
          onClick={this.handleDownVote}
          className="voteButton"
          name="downvoted"
          id={downvoted ? "voted" : null}
          disabled={addedvote === -1}
        >
          Downvote
        </button>
      </div>
    );
  }
}

export default Voter;
