import React, { useCallback, useState } from "react";
import { createContext } from "react";
import { fetchToken, fetchTokenLess } from "../helpers/fetch";

export const AuthContext = createContext();
const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const response = await fetchTokenLess("login", { email, password }, "POST");
    if (response.ok) {
      localStorage.setItem("token", response.token);
      const { user } = response;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return response.ok;
  };

  const register = async (name, email, password) => {
    const response = await fetchTokenLess(
      "login/new",
      { name, email, password },
      "POST"
    );
    if (response.ok) {
      localStorage.setItem("token", response.token);
      const { user } = response;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      return response.ok;
    }
    return response.msg;
  };
  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    const response = await fetchToken("login/renew");
    if (response.ok) {
      localStorage.setItem("token", response.token);
      const { user } = response;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
