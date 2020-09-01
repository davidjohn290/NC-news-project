import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import DoughnutChart from "./components/DoughnutChart";
import ToggleView from "./components/ToggleView";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <ToggleView>
        <DoughnutChart />
      </ToggleView>
      <Router className="router">
        <Homepage path="/" />
        <Articles path="/articles" />
        <Articles path="/articles/:topic" />
        <SingleArticle path="/articles/article/:id" />
        <SingleArticle path="/article/:id" />
      </Router>
    </div>
  );
}

export default App;
