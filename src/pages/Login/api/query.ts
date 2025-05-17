import { z } from "zod";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginAPIResponseSchema, LoginFormType } from "../components/schema";
import { LoginAPI } from "./query-slice";
import { useUserStore } from "../../../store/user-store";
import { useNavigate } from "react-router";


interface ErrorResponse {
  message: string;
}

export function useSignIn() {
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof LoginAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    LoginFormType
  >({
    mutationFn: (user) => LoginAPI.login(user),
    onSuccess: async (data) => {

      setCredentials({
        accessToken: data.token,
        user: data.user,
        loginInfo: data.loginInfo,
      });

      // navigate("/home");

      
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    },
  });
}
