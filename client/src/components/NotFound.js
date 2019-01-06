import React from "react";

const NotFound = ({ location }) => {
  console.log(location.pathname);
  return (
    <div className="container">
      <div className="not_found_container">Ooopss! Page Not Found.</div>
    </div>
  );
};

export default NotFound;
