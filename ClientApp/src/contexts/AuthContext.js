import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserFromStorage = () => {
    setJwtToken(localStorage.getItem("token"));
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const authContextValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    getUserFromStorage,
    jwtToken,
    setJwtToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
