"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
   isAuthenticated: boolean;
   login: (accessToken: string, refreshToken: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      // kiểm tra token trong cookie mỗi khi mount
      const token = Cookies.get("access_token");
      setIsAuthenticated(!!token);
   }, []);

   const login = (accessToken: string, refreshToken: string) => {
      Cookies.set("access_token", accessToken, { expires: 30, path: "/" });
      Cookies.set("refresh_token", refreshToken, { expires: 30, path: "/" });
      setIsAuthenticated(true);
   };

   const logout = () => {
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
   return ctx;
};
