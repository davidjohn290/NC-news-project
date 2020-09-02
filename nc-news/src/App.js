import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import DoughnutChart from "./components/DoughnutChart";
import ToggleView from "./components/ToggleView";
import SingleArticle from "./components/SingleArticle";

class App extends Component {
  state = {
    user: "tickle122",
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header user={user} />
        <ToggleView>
          <DoughnutChart />
        </ToggleView>
        <Router className="router">
          <Homepage path="/" />
          <Articles path="/articles" />
          <Articles path="/articles/:topic" />
          <SingleArticle path="/articles/article/:id" user={user} />
          <SingleArticle path="/article/:id" user={user} />
        </Router>
      </div>
    );
  }
}

export default App;
