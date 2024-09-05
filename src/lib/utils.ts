import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "vue-sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
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

export const exportCSV = (data: any[], fileName?: string) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => obj[header]));
  const headerRow = headers.join(",");
  const csvRows = [headerRow, ...rows.map((row) => row.join(","))];
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;chartset-utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    fileName ? `${fileName}.csv` : "export_data.csv"
  );
  link.click();
};

export function jwtDecode(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        toast.error("400: Bad Request");
        break;
      case 401:
        toast.error("Unauthorized: Please check your credentials.");
        break;
      case 403:
        toast.error("Forbidden: You don't have permission to access this.");
        break;
      case 404:
        toast.error("Not Found: The requested resource could not be found.");
        break;
      case 500:
        toast.error(
          "Internal Server Error: Something went wrong on the server."
        );
        break;
      default:
        toast.error(`Error ${status}:  ${error.response.statusText}`);
        break;
    }
  } else {
    toast.error(`Failed! Something went wrong`);
  }
};
