import React, { Component } from "react";
import * as api from "../util/api";
class Voter extends Component {
  state = {
    currentVote: this.props.votes,
    addedvote: 0,
    upvoted: false,
    downvoted: false,
    beenPressed: false,
  };

  handleResetVote = () => {
    const { id, type } = this.props;
    const { addedvote } = this.state;
    let vote = addedvote;
    if (vote === -1) {
      vote = 1;
    } else {
      vote = -1;
    }

    api.addVotes(type, id, vote);
    this.setState({
      addedvote: 0,
      upvoted: false,
      downvoted: false,
      beenPressed: false,
    });
  };

  handleUpVote = () => {
    const { id, type } = this.props;
    const { beenPressed } = this.state;
    let increment = 1;
    api.addVotes(type, id, 1);
    if (beenPressed) {
      increment = 2;
    }

    this.setState((currentState) => {
      return {
        upvoted: !currentState.upvoted,
        downvoted: false,
        addedvote: currentState.addedvote + increment,
        beenPressed: true,
      };
    });
  };

  handleDownVote = () => {
    const { id, type } = this.props;
    const { beenPressed } = this.state;
    let decrement = 1;
    api.addVotes(type, id, -1);
    if (beenPressed) {
      decrement = 2;
    }
    this.setState((currentState) => {
      return {
        downvoted: !currentState.downvoted,
        upvoted: false,
        addedvote: currentState.addedvote - decrement,
        beenPressed: true,
      };
    });
  };

  render() {
    const { upvoted, downvoted, addedvote, currentVote } = this.state;

    return (
      <div>
        <p>
          <b>Votes:</b> {currentVote + addedvote}
        </p>
        <br />
        <button
          disabled={upvoted === true}
          onClick={this.handleUpVote}
          className="voteButton"
          name="upvoted"
          id={upvoted ? "voted" : null}
        >
          Upvote
        </button>
        <button
          disabled={downvoted === true}
          onClick={this.handleDownVote}
          className="voteButton"
          name="downvoted"
          id={downvoted ? "voted" : null}
        >
          Downvote
        </button>
        <button
          onClick={this.handleResetVote}
          className="voteButton"
          disabled={!downvoted && !upvoted}
        >
          No vote
        </button>
      </div>
    );
  }
}

export default Voter;
