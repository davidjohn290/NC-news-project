import React, { Component } from "react";

import * as api from "../utilis/api";
import ListOfComments from "./ListOfComments";
import SearchBar from "./SearchBar";

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: {},
    articleId: 0,
    wrongInput: false,
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
    const { article } = this.state;
    return (
      <>
        <SearchBar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          wrongInput={wrongInput}
          articleId={articleId}
        />

        <div className="singleArticleCard">
          <p>
            <b>Title: </b>
            {article.title}
          </p>
          <p>
            <b>Topic:</b> {article.topic}
          </p>
          <p>
            <b>Author:</b> {article.author}
          </p>
          <p>
            <b>Article Id:</b> {article.article_id}
          </p>
          <p>
            <b>Created at:</b> {article.created_at}
          </p>
          <p>
            <b>Comments:</b>
            {article.comment_count}
          </p>
          <p>
            <b>Votes:</b> {article.votes}
          </p>

          <>
            <header>All comments:</header>
            <br />
            <ListOfComments id={article.article_id} />
          </>
        </div>
      </>
    );
  }
}

export default SingleArticle;
