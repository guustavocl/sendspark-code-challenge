import { SignUpFormValues } from "~/hooks/useSignUp";
import { axiosInstance } from "./axios.service";
import { errorToast } from "~/utils/toast";

export const postSignUp = async (user: SignUpFormValues) => {
  try {
    const request = await axiosInstance.post(
      "/auth/sign-up",
      { user },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    console.log(err);
    if (err instanceof Error) errorToast(err.message);
  }
};

export const postSignIn = async (email: string, password: string) => {
  try {
    const request = await axiosInstance.post(
      "/auth/sign-in",
      { email, password },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    console.log(err);
    throw err;
  }
};
