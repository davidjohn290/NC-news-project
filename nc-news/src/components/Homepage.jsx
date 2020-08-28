import React from "react";
import { Link } from "@reach/router";
const Homepage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Northcoders news</h1>
        <br />
        <br />
        <br />
        <p>
          We have a large array of news articles with topics ranging from coding
          to cooking! If you're looking for a specific topic use the handy
          buttons located at the top of the articles page to show your desired
          topic, then filter by comments, votes and date added. Have fun
          browsing!
        </p>
        <br />
        <Link to="/articles">
          <button className="button">Go to articles</button>
        </Link>
      </header>
    </div>
  );
};

export default Homepage;
