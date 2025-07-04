import { ReactNode } from "react";
import React from "react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/enums/routes";

type PrivateRouteProps = {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuthenticated) {
      navigate(ROUTES.LOGIN, {replace: true});
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default PrivateRoute;