import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utilis/api";
import Loader from "./Loader";

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
    const { user } = this.props;
    if (isLoading) return <Loader />;
    return (
      <nav>
        <div>
          <p className="loggedIn">
            User logged in: <b>{user}</b>
          </p>
          <Link to="/">
            <button className="homeButton">Home</button>
          </Link>
          <Link to="/articles">
            <button className="homeButton">All Articles</button>
          </Link>
          <Link to="/article/:id">
            <button className="homeButton">Find Article</button>
          </Link>
        </div>
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
