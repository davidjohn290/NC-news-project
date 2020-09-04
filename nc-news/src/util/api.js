import axios from "axios";
const formatDate = require("./utilFunction");
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
    .get("/articles", { params: { sort_by, topic } })
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
    const date = formattedArticle.split(" ")[2];
    const yearAndMonth = date.split("/");
    article.created_at = [yearAndMonth[0], yearAndMonth[2]];
    return article;
  });
};

export const getCommentsById = (id) => {
  return axiosInstance
    .get(`/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const addVotes = (type, id, num) => {
  return axiosInstance
    .patch(`/${type}/${id}`, { inc_votes: num })
    .then(({ data }) => {
      return data.comment;
    });
};

export const addComment = (id, author, comment) => {
  return axiosInstance
    .post(`/articles/${id}/comments`, {
      body: comment,
      username: author,
      article_id: id,
    })
    .then(({ data: { postedComment } }) => {
      return postedComment;
    });
};

export const deleteComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};
