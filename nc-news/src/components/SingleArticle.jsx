import React, { Component } from "react";

import * as api from "../utilis/api";
import ListOfComments from "./ListOfComments";
import SearchBar from "./SearchBar";
import AddComment from "./AddComment";

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: {},
    articleId: 0,
    wrongInput: false,
    toggleView: true,
  };

  componentDidMount() {
    const { id } = this.props;

    if (id > 0) {
      api.getSingleArticle(id).then((article) => {
        this.setState({
          article,
          wrongInput: false,
          articleId: 0,
          isLoading: false,
        });
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { articleId } = this.state;
    api.getSingleArticle(articleId).then((article) => {
      this.setState({
        article,
        wrongInput: false,
        articleId: 0,
        isLoading: false,
      });
    });
  };

  handleInput = ({ target: { value } }) => {
    const onlyNumbers = /\D/.test(value);
    if (!onlyNumbers) {
      this.setState({ articleId: value });
    } else {
      this.setState({ wrongInput: true });
    }
  };

  render() {
    const { isLoading, wrongInput, articleId } = this.state;
    const { user } = this.props;
    if (isLoading) {
      return (
        <SearchBar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          wrongInput={wrongInput}
          articleId={articleId}
        />
      );
    }
    const { article, toggleView } = this.state;
    return (
      <>
        <SearchBar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          wrongInput={wrongInput}
          articleId={articleId}
        />

        <div className="singleArticleCard">
          <h3>{article.title}</h3>

          <br />
          <p>
            <b>Topic:</b> {article.topic}
          </p>
          <br />
          <p>
            <b>Author:</b> {article.author}
          </p>
          <br />
          <p>
            <b>Posted at:</b> {article.created_at}
          </p>
          <br />
          <p>
            <b>No of comments:</b>
            {article.comment_count}
          </p>
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
              <AddComment id={article.article_id} user={user} />
            </>
          )}
          <>
            <header>All comments:</header>
            <br />
            <ListOfComments id={article.article_id} user={user} />
          </>
          <p>
            <b>Article Id:</b> {article.article_id}
          </p>
        </div>
      </>
    );
  }
}

export default SingleArticle;
