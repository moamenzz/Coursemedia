import axios, { AxiosError, AxiosResponse } from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

interface ApiResponse<T = any> extends AxiosResponse {
  data: T;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errorCode?: string;
  type?: string;
}

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (response) => response.data as ApiResponse
);

axiosPublic.interceptors.response.use(
  (response) => response.data as ApiResponse,
  async (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { response, config } = error;
      const { status, data } = response;

      if (status === 400 && data?.type === "ValidationError") {
        return Promise.reject<ApiError>({
          status,
          message: data.message || "An Error Occurred",
          errorCode: data.errorCode,
          type: data.type,
        });
      }

      if (status === 401 && data?.errorCode === "InvalidAccessToken") {
        try {
          axiosPrivate.get("/auth/refresh");
          return config
            ? axiosPrivate(config)
            : Promise.reject("Missing Config");
        } catch (e) {
          queryClient.clear();
          navigate("/login", {
            state: {
              redirectUrl: window.location.pathname,
            },
          });
        }
      }
      return Promise.reject<ApiError>({
        status,
        message: data.message || "An Error Occurred",
        errorCode: data.errorCode,
      });
    }
    return Promise.reject<ApiError>({
      status: 500,
      message: "Internal Server Error",
    });
  }
);
