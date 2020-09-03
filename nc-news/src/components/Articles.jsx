import React, { Component } from "react";
import * as api from "../utilis/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    topics: [],
  };

  componentDidMount() {
    this.getArticles();
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    if (prevProps.topic !== topic) {
      this.getArticles(topic);
    }
  }

  getArticles = (topic, sort_by) => {
    api.getAllArticles(topic, sort_by).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  handleSortBy = ({ target: { value } }) => {
    const { topic } = this.props;
    this.getArticles(topic, value);
  };

  render() {
    const { isLoading, articles, topics } = this.state;
    if (isLoading) return <Loader />;
    return (
      <>
        <header>
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
          <br />
          <label className="sortby">
            Sort by:
            <button
              onClick={this.handleSortBy}
              value="comment_count"
              className="sortButton"
            >
              Comments
            </button>
            <button
              onClick={this.handleSortBy}
              value="votes"
              className="sortButton"
            >
              Votes
            </button>
            <button
              className="sortButton"
              value="created_at"
              onClick={this.handleSortBy}
            >
              Posted
            </button>
          </label>
        </header>
        <ul className="articleDiv">
          {articles.map((article, index) => {
            console.log(article);
            return (
              <li key={article.article_id}>
                <ArticleCard article={article} index={index} />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Articles;
