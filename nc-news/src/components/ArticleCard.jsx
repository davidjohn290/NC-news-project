import React from "react";
import { Link } from "@reach/router";
import Voter from "./Voter";
import moment from "moment";

const ArticleCard = ({ article }) => {
  const {
    title,
    topic,
    article_id,
    author,
    created_at,
    comment_count,
    votes,
  } = article;
  return (
    <div className="articleCard">
      <Link to={`/articles/article/${article_id}`}>
        <h3>{title}</h3>
      </Link>

      <p>
        <b>Topic:</b> {topic}
      </p>
      <br />
      <p>
        <b>Author:</b> {author}
      </p>
      <br />
      <p>
        <b>Posted:</b> {moment([created_at[1], 0, created_at[0]]).fromNow()}
      </p>
      <br />
      <p>
        <b>Comments:</b> {comment_count}{" "}
      </p>
      <br />
      <Voter type={"articles"} id={article_id} votes={votes} />
    </div>
  );
};

export default ArticleCard;
