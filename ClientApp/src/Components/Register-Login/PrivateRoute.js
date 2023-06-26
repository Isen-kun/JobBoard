import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("token"));
  return token && currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
