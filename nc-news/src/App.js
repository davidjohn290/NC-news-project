import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Header />
      <Router className="router">
        <Homepage path="/" />
        <Articles path="/articles" />
        <Articles path="/articles/:topic" />
      </Router>
    </div>
  );
}

export default App;
