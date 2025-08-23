import axios from "axios";
import Cookies from "js-cookie";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

const refreshAxios = axios.create();

const API = axios.create({
   baseURL: API_SERVER,
   withCredentials: true,
});

// ================== LOGIN/REGISTER/LOGOUT ==================
export const login = async (username: string, password: string) => {
   const data = { username, password };
   return API.post("/auth/login", data);
};

export const register = async (
   username: string,
   password: string,
   email: string,
   displayname: string,
) => {
   const data = { username, password, email, displayname };
   return API.post("/auth/register", data);
};

export const logout = async () => {
   try {
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      window.location.href = "/";
   } catch (error) {
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      window.location.href = "/auth";
   }
};

// ================== REFRESH TOKEN ==================
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
   const response = await refreshAxios.post(
      `${API_SERVER}/auth/refresh-token`,
      {},
      {
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${refreshToken}`,
         },
      },
   );

   return response.data.access_token;
};

// ================== INTERCEPTORS ==================
API.interceptors.request.use(
   (config) => {
      const token = Cookies.get("access_token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error),
);

API.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const refreshToken = Cookies.get("refresh_token");

         if (refreshToken) {
            try {
               const newAccessToken = await refreshAccessToken(refreshToken);
               Cookies.set("access_token", newAccessToken, {
                  expires: 30,
                  path: "/",
               });
               originalRequest.headers["Authorization"] =
                  `Bearer ${newAccessToken}`;
               return API(originalRequest);
            } catch (refreshError) {
               Cookies.remove("access_token", { path: "/" });
               Cookies.remove("refresh_token", { path: "/" });
               window.location.href = "/auth";
               return Promise.reject(refreshError);
            }
         } else {
            window.location.href = "/auth";
         }
      }

      return Promise.reject(error);
   },
);

export default API;
