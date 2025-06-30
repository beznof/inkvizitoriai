import { ReactNode } from "react";
import React from "react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/enums/routes";

type PublicRouteProps = {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(isAuthenticated) {
      navigate(ROUTES.HOME, {replace: true});
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null;
}

export default PublicRoute;