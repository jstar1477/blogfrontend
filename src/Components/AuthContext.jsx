import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // 🔑 KEY FIX

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      setIsLogin(true);
      setRole(user.role);
    }

    setLoading(false); // auth check completed
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsLogin(true);
    setRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ isLogin, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
