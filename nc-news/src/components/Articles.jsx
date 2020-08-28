import React, { Component } from "react";
import * as api from "../utilis/api";
import ArticleCards from "./ArticleCards";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getArticles();
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

  handleSortByButton = ({ target: { value } }) => {
    const { topic } = this.props;
    this.getArticles(topic, value);
  };

  render() {
    const { isLoading, articles } = this.state;
    if (isLoading) return <p>Articles loading...</p>;
    return (
      <>
        <header>
          <label>
            Sort by:
            <button
              onClick={this.handleSortByButton}
              value="comments"
              className="button"
            >
              Comments
            </button>
            <button
              onClick={this.handleSortByButton}
              value="votes"
              className="button"
            >
              Votes
            </button>
            <button
              onClick={this.handleSortByButton}
              value="article_id"
              className="button"
            >
              Article Id
            </button>
            <button
              onClick={this.handleSortByButton}
              value="date"
              className="button"
            >
              Date published
            </button>
          </label>
        </header>
        <ul>
          {articles.map((article, index) => {
            return (
              <li key={article.article_id}>
                <ArticleCards article={article} index={index} />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Articles;
