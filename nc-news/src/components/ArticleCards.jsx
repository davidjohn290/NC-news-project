import React from "react";

const ArticleCards = ({ article, index }) => {
  return (
    <div className="articleCard">
      <h3>Article {index + 1}</h3>
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
        <b>Comments:</b> {article.comment_count}{" "}
      </p>
      <p>
        <b>Votes:</b> {article.votes}
      </p>
    </div>
  );
};

export default ArticleCards;
