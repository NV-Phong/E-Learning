import { useState } from "react";
import API from "@/services/api";
import { toast } from "sonner";

export function useTeacher() {
   const [loading, setLoading] = useState(false);

   const getTeachers = async () => {
      setLoading(true);
      try {
         const res = await API.get("/teacher");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch teachers");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const getTeacher = async (id: string) => {
      setLoading(true);
      try {
         const res = await API.get(`/teacher/${id}`);
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch teacher");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const createTeacher = async (data: any) => {
      setLoading(true);
      try {
         const res = await API.post("/teacher", data);
         toast.success("Tạo giáo viên thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Create failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const updateTeacher = async (id: string, data: any) => {
      setLoading(true);
      try {
         const res = await API.put(`/teacher/${id}`, data);
         toast.success("Cập nhật giáo viên thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Update failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const deleteTeacher = async (id: string) => {
      setLoading(true);
      try {
         await API.delete(`/teacher/${id}`);
         toast.success("Xóa giáo viên thành công 🎉");
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Delete failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      getTeachers,
      getTeacher,
      createTeacher,
      updateTeacher,
      deleteTeacher,
      loading,
   };
}
