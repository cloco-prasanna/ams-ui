import { jwtDecode } from "@/lib/utils";

export const useAuth = () => {
  let token;
  let role;
  let userId;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token) {
    const tokenJsonValue = jwtDecode(token);
    role = tokenJsonValue.role;
    userId = tokenJsonValue.user_id;
  }
  return {
    token,
    role,
    userId,

    isAuthenticated: Boolean(token),
  };
};
