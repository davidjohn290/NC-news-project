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
      console.log(articles);
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
