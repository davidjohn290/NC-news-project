import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import * as api from "../utilis/api";

class DoughnutChart extends Component {
  state = {
    topicsTally: {},
    isLoading: true,
  };

  componentDidMount() {
    api.getAllArticles().then((articles) => {
      const tallyObj = {};
      articles.forEach(({ topic }) => {
        if (tallyObj[topic] >= 1) {
          tallyObj[topic] += 1;
        } else {
          tallyObj[topic] = 1;
        }
      });
      this.setState({ topicsTally: tallyObj, isLoading: false });
    });
  }

  render() {
    const { isLoading, topicsTally } = this.state;
    if (isLoading) return <p>Chart is loading...</p>;
    const keys = Object.keys(topicsTally);
    const values = Object.values(topicsTally);
    const data = {
      options: {
        maintainAspectRatio: false,
      },
      labels: keys,
      datasets: [
        {
          data: values,
          backgroundColor: ["#B22222", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
    return (
      <div>
        <Doughnut data={data} height={100} />
      </div>
    );
  }
}

export default DoughnutChart;
