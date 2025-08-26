import { useState } from "react";
import API from "@/services/api";
import { toast } from "sonner";

export function useFeedback() {
   const [loading, setLoading] = useState(false);

   const getFeedbacks = async () => {
      setLoading(true);
      try {
         const res = await API.get("/feedback");
         return res.data;
      } catch (err: any) {
         toast.error(
            err.response?.data?.message || "Failed to fetch feedbacks"
         );
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const getFeedback = async (id: string) => {
      setLoading(true);
      try {
         const res = await API.get(`/feedback/${id}`);
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Failed to fetch feedback");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const createFeedback = async (data: any) => {
      setLoading(true);
      try {
         const res = await API.post("/feedback", data);
         toast.success("Gửi feedback thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Create failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const updateFeedback = async (id: string, data: any) => {
      setLoading(true);
      try {
         const res = await API.put(`/feedback/${id}`, data);
         toast.success("Cập nhật feedback thành công 🎉");
         return res.data;
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Update failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const deleteFeedback = async (id: string) => {
      setLoading(true);
      try {
         await API.delete(`/feedback/${id}`);
         toast.success("Xóa feedback thành công 🎉");
      } catch (err: any) {
         toast.error(err.response?.data?.message || "Delete failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      getFeedbacks,
      getFeedback,
      createFeedback,
      updateFeedback,
      deleteFeedback,
      loading,
   };
}
