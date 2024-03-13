import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const initialContextValue = {
  id: "",
  email: "kunguy.159@gmail.com",
  userName: "Guy nut",
  profileUrl: "avatar.jpg",
  isAuthenticated: true,
};

const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(initialContextValue);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
