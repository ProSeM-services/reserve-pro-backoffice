import { PropsWithChildren } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("accessToken");

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
