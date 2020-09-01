import React from "react";
import { Link } from "@reach/router";

const ArticleCards = ({ article }) => {
  return (
    <div className="articleCard">
      <Link to={`/articles/article/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>

      <p>
        <b>Topic:</b> {article.topic}
      </p>
      <p>
        <b>Author:</b> {article.author}
      </p>

      <p>
        <b>Comments:</b> {article.comment_count}{" "}
      </p>
      <p>
        <b>Votes:</b> {article.votes}
      </p>
    </div>
  );
};

export default ArticleCards;
