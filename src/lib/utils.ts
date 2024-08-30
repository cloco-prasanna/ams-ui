import { AxiosRequestConfig, AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any>> => {
  const headers: Record<string, string> = {};
  let token: string | null = null;
  if (typeof window !== undefined) {
    token = window.localStorage.getItem("token");
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...headers,
      ...config.headers,
    },
  };

  switch (method) {
    case "get":
      return axios.get(`${API_URL}${url}`, axiosConfig);
    case "post":
      return axios.post(`${API_URL}${url}`, data, axiosConfig);
    case "put":
      return axios.put(`${API_URL}${url}`, data, axiosConfig);
    case "patch":
      return axios.put(`${API_URL}${url}`, data, axiosConfig);
    case "delete":
      return axios.delete(`${API_URL}${url}`, axiosConfig);
    default:
      throw new Error("Unsupported request method");
  }
};
