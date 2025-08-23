"use client";

import API from "@/services/api";
import { useEffect, useState } from "react";

export function useAPI<T = any>(url: string, immediate: boolean = true) {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);

   const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await API.get<T>(url, { withCredentials: true });
         setData(response.data);
      } catch (err) {
         setError(err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (immediate) {
         fetchData();
      }
   }, [url]);

   return { data, loading, error, refetch: fetchData };
}
