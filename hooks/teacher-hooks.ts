import { useState, useCallback } from "react";
import API from "@/services/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Teacher {
   _id?: string;
   id?: string;
   name: string;
   bio?: string;
   avatar?: string;
   experienceYears?: number;
   hourlyRate?: number;
   certifications?: string[];
   rating?: {
      average: number;
      count: number;
   };
}

export function useTeacher() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const getTeachers = useCallback(async (): Promise<Teacher[]> => {
      setLoading(true);
      setError(null);
      try {
         const res = await API.get("/teacher", { timeout: 10000 });
         return res.data;
      } catch (err: any) {
         let errorMessage =
            "Không tải được danh sách giáo viên. Vui lòng thử lại.";
         if (err instanceof AxiosError && err.code === "ECONNABORTED") {
            errorMessage =
               "Yêu cầu API đã hết thời gian. Vui lòng kiểm tra kết nối mạng của bạn hoặc liên hệ hỗ trợ.";
         } else {
            errorMessage = err.response?.data?.message || errorMessage;
         }
         setError(errorMessage);
         toast.error(errorMessage);
         return [];
      } finally {
         setLoading(false);
      }
   }, []);

   const getTeacher = useCallback(async (id: string) => {
      setLoading(true);
      setError(null);
      try {
         const res = await API.get(`/teacher/${id}`);
         return res.data;
      } catch (err: any) {
         const errorMessage =
            err.response?.data?.message ||
            "Không tải được thông tin giáo viên.";
         setError(errorMessage);
         toast.error(errorMessage);
         throw err;
      } finally {
         setLoading(false);
      }
   }, []);

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
      error,
   };
}
