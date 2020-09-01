import React from "react";

const SearchBar = (props) => {
  const { handleInput, handleSubmit, wrongInput, articleId } = props;
  return (
    <div>
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <br />
          <label>
            Search by article Id below:
            <br />
            <input
              type="number"
              name=""
              className="inputBox"
              onChange={handleInput}
              value={articleId}
            />
          </label>
          <button type="submit" className="button">
            Find article
          </button>
        </form>
        {wrongInput && "Article Ids only contain numbers"}
      </header>
    </div>
  );
};

export default SearchBar;
