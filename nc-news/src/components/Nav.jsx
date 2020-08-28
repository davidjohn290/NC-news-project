import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utilis/api";

class Nav extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { isLoading, topics } = this.state;
    if (isLoading) return <p>Nav bar is loading...</p>;
    return (
      <nav>
        <br />
        <label>
          Pick your topic of choice:
          <br />
          {topics.map((topic) => {
            return (
              <Link to={`/articles/${topic.slug}`} key={topic.slug}>
                <button className="button">{`${topic.slug}`}</button>
              </Link>
            );
          })}
        </label>
      </nav>
    );
  }
}

export default Nav;
