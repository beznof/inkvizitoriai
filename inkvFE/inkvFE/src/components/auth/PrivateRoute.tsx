import { ReactNode } from "react";
import React from "react";
import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";
import ROUTES from "@/enums/routes";

type PrivateRouteProps = {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if(isLoading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

export default PrivateRoute;