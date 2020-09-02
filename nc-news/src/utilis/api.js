import axios from "axios";
const formatDate = require("../utilis/utilisFuncs");
const axiosInstance = axios.create({
  baseURL: "https://getting-nc-news.herokuapp.com/api",
});

export const getTopics = () => {
  return axiosInstance.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getAllArticles = (topic, sort_by) => {
  return axiosInstance
    .get("/articles", { params: { topic, sort_by } })
    .then(({ data: { articles } }) => {
      if (sort_by && topic) {
        const filteredByTopic = articles.filter(
          (article) => article.topic === topic
        );
        return filteredByTopic;
      } else {
        return articles;
      }
    });
};

export const getSingleArticle = (id) => {
  return axiosInstance.get(`/articles/${id}`).then(({ data: { article } }) => {
    const formattedArticle = formatDate(article.created_at);
    article.created_at = formattedArticle;
    return article;
  });
};

export const getCommentsById = (id) => {
  return axiosInstance
    .get(`/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      const formattedComments = comments.map((comment) => {
        const formattedDate = formatDate(comment.created_at);
        comment.created_at = formattedDate;
        return comment;
      });
      return formattedComments;
    });
};

export const addVotes = (comment_id, type) => {
  return axiosInstance
    .patch(`/comments/${comment_id}`, { inc_votes: type })
    .then(({ data }) => {
      return data.comment;
    });
};

export const addComment = (id, author, comment) => {
  return axiosInstance
    .post("/articles/33/comments", {
      body: comment,
      username: author,
      article_id: id,
    })
    .then(({ data: { postedComment } }) => {
      const formattedDate = formatDate(postedComment.created_at);
      postedComment.created_at = formattedDate;
      return postedComment;
    });
};
