import axios from "axios";

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
