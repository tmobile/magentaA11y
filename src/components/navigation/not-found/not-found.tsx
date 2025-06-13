import React from "react";
import { Link } from "react-router-dom";

import "./not-found.scss";

const NotFound: React.FC = () => {
  return (
    <div className="MagentaA11y--not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
