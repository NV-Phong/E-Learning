import { useState } from "react";
import API from "@/services/api";
import { toast } from "sonner";

export function useStudent() {
   const [loading, setLoading] = useState(false);

   const getStudents = async () => {
      setLoading(true);
      try {
         const res = await API.get("/student");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch students");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const getStudent = async (id: string) => {
      setLoading(true);
      try {
         const res = await API.get(`/student/${id}`);
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch student");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const createStudent = async (data: any) => {
      setLoading(true);
      try {
         const res = await API.post("/student", data);
         toast.success("Tạo học sinh thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Create failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const updateStudent = async (id: string, data: any) => {
      setLoading(true);
      try {
         const res = await API.put(`/student/${id}`, data);
         toast.success("Cập nhật học sinh thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Update failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const deleteStudent = async (id: string) => {
      setLoading(true);
      try {
         await API.delete(`/student/${id}`);
         toast.success("Xóa học sinh thành công 🎉");
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Delete failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      getStudents,
      getStudent,
      createStudent,
      updateStudent,
      deleteStudent,
      loading,
   };
}
