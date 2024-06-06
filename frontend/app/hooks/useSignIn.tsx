import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useCallback } from "react";
import { postSignIn } from "~/services/auth.service";
import { useNavigate } from "@remix-run/react";
import { useUserData } from "~/contexts/UserContext";
import { sendRequestToast } from "~/utils/toast";

const SignUpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export type SignInFormValues = z.infer<typeof SignUpSchema>;

export const useSignInForm = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useUserData();

  const handleSubmit = useCallback(
    async (values: SignInFormValues) => {
      const req = postSignIn(values.email, values.password);
      sendRequestToast(req, "Signed In!", "Invalid email or password");
      const res = await req;
      if (res?.user) {
        setLoggedUser(res.user);
        navigate("/dashboard");
      }
    },
    [navigate, setLoggedUser]
  );

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(SignUpSchema),
    onSubmit: handleSubmit,
  });

  return {
    formik,
  };
};
