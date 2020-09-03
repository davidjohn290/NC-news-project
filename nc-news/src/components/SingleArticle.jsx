import React, { Component } from "react";
import moment from "moment";
import * as api from "../utilis/api";
import ListOfComments from "./ListOfComments";
import SearchBar from "./SearchBar";
import Voter from "./Voter";
import ErrorPage from "../components/ErrorPage";

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: {},
    articleId: 0,
    wrongInput: false,
    err: null,
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
    api
      .getSingleArticle(articleId)
      .then((article) => {
        this.setState({
          article,
          wrongInput: false,
          articleId: 0,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ err: err, isLoading: false });
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
    const { isLoading, wrongInput, articleId, err } = this.state;
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
    const {
      article: {
        title,
        topic,
        article_id,
        author,
        created_at,
        comment_count,
        votes,
      },
    } = this.state;
    return (
      <>
        {err ? (
          <ErrorPage
            status={err.response.status}
            response={err.response.statusText}
          />
        ) : (
          <div className="singleArticleCard">
            <h3>{title}</h3>

            <br />
            <p>
              <b>Topic:</b> {topic}
            </p>
            <br />
            <p>
              <b>Author:</b> {author}
            </p>
            <br />
            <p>
              <b>Posted:</b>{" "}
              {moment([created_at[1], 0, created_at[0]]).fromNow()}
            </p>
            <br />
            <Voter votes={votes} type={"articles"} id={article_id} />
            <br />
            <p>
              <b>No of comments:</b> {comment_count}
            </p>

            <>
              <header>All comments:</header>
              <br />
              <ListOfComments id={article_id} user={user} />
            </>
            <p>
              <b>Article Id:</b> {article_id}
            </p>
          </div>
        )}
      </>
    );
  }
}

export default SingleArticle;
