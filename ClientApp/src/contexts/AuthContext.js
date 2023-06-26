import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const authContextValue = { currentUser, setCurentUser, loading, setLoading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
