import React from "react";
import Title from "./Title";
import Nav from "./Nav";

const Header = (props) => {
  const { user } = props;
  return (
    <div>
      <Title />
      <Nav user={user} />
    </div>
  );
};

export default Header;
