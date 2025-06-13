import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRedirectPath } from "utils/path-mapping";

const RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = getRedirectPath(location.pathname);
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectHandler;
