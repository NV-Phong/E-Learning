"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { login, register } from "@/services/api";

// ================== LOGIN HOOK ==================
export function useLogin() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleLogin = async (username: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
         const res = await login(username, password);
         const { access_token, refresh_token } = res.data;

         Cookies.set("access_token", access_token, { expires: 30, path: "/" });
         Cookies.set("refresh_token", refresh_token, {
            expires: 30,
            path: "/",
         });

         window.location.href = "/dashboard";
         return res.data;
      } catch (err: any) {
         setError(err.response?.data?.message || "Login failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { handleLogin, loading, error };
}

// ================== REGISTER HOOK ==================
export function useRegister() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleRegister = async (
      username: string,
      password: string,
      email: string,
      displayname: string
   ) => {
      setLoading(true);
      setError(null);
      try {
         const res = await register(username, password, email, displayname);
         return res.data;
      } catch (err: any) {
         setError(err.response?.data?.message || "Register failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { handleRegister, loading, error };
}
