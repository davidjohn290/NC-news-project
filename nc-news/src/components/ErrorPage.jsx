import React from "react";

const ErrorPage = ({ status, response }) => {
  return (
    <div>
      <p className="error">
        Whoops! An error has occurred with the status: <b>{status} </b> and
        response of: <b>{response}</b>
      </p>
    </div>
  );
};

export default ErrorPage;
