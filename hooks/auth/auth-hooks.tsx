import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "@/context/auth-context";
import { login, register } from "@/services/api";

export function useLogin() {
   const router = useRouter();
   const { login: setAuth } = useAuthContext();
   const [loading, setLoading] = useState(false);

   const handleLogin = async (username: string, password: string) => {
      setLoading(true);
      try {
         const res = await login(username, password);
         const { access_token, refresh_token } = res.data;

         setAuth(access_token, refresh_token);
         toast.success("Đăng nhập thành công 🎉");
         router.push("/dashboard");
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Login failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { handleLogin, loading };
}

export function useRegister() {
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const handleRegister = async (
      username: string,
      password: string,
      email: string,
      displayname: string
   ) => {
      setLoading(true);
      try {
         await register(username, password, email, displayname);
         toast.success("Đăng ký thành công 🎉, vui lòng đăng nhập");
         window.location.reload();
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Register failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { handleRegister, loading };
}
