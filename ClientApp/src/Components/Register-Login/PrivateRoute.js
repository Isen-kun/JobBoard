import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, jwtToken } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
