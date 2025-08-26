import { useState } from "react";
import API from "@/services/api";
import { toast } from "sonner";

export function useUser() {
   const [loading, setLoading] = useState(false);

   const getUsers = async () => {
      setLoading(true);
      try {
         const res = await API.get("/user");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch users");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   // Lấy profile user hiện tại (dựa vào access token từ interceptor)
   const getProfile = async () => {
      setLoading(true);
      try {
         const res = await API.get("/user/profile");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch profile");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   // Cập nhật thông tin user
   const updateUser = async (id: string, data: any) => {
      setLoading(true);
      try {
         const res = await API.put(`/user/${id}`, data);
         toast.success("Cập nhật thông tin thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Update failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { getUsers, getProfile, updateUser, loading };
}
