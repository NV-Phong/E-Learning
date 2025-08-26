import { useState } from "react";
import API from "@/services/api";
import { toast } from "sonner";

export function useCourse() {
   const [loading, setLoading] = useState(false);

   const getCourses = async () => {
      setLoading(true);
      try {
         const res = await API.get("/course");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch courses");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const getCourse = async (id: string) => {
      setLoading(true);
      try {
         const res = await API.get(`/course/${id}`);
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch course");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const createCourse = async (data: any) => {
      setLoading(true);
      try {
         const res = await API.post("/course", data);
         toast.success("Tạo khóa học thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Create failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const updateCourse = async (id: string, data: any) => {
      setLoading(true);
      try {
         const res = await API.put(`/course/${id}`, data);
         toast.success("Cập nhật khóa học thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Update failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const deleteCourse = async (id: string) => {
      setLoading(true);
      try {
         await API.delete(`/course/${id}`);
         toast.success("Xóa khóa học thành công 🎉");
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Delete failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      getCourses,
      getCourse,
      createCourse,
      updateCourse,
      deleteCourse,
      loading,
   };
}
