import React from "react";
import { Link } from "@reach/router";

const Nav = (props) => {
  const { user } = props;

  return (
    <nav>
      <div>
        <p className="loggedIn">
          User logged in: <b>{user}</b>
        </p>
        <Link to="/homepage">
          <button className="homeButton">Home</button>
        </Link>
        <Link to="/articles">
          <button className="homeButton">All Articles</button>
        </Link>
        <Link to="/article/searchById">
          <button className="homeButton">Find Article</button>
        </Link>
      </div>
      <br />
    </nav>
  );
};

export default Nav;
