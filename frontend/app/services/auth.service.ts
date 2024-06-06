import { axiosInstance } from "./axios.service";
import { SignUpFormValues } from "~/routes/sign-up/ui/useSignUpForm";

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
  }
};
