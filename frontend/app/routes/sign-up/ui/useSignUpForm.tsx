import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useCallback } from "react";
import { postSignUp } from "~/services/auth.service";

const SignUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .max(120, "First name must be at most 120 characters"),
    lastName: z
      .string({ required_error: "Last name is required" })
      .max(120, "Last name must be at most 120 characters"),
    companyName: z
      .string({ required_error: "Company name is required" })
      .max(120, "Company name must be at most 120 characters"),
    jobTitle: z
      .string()
      .max(120, "Job title must be at most 120 characters")
      .optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(/[A-Z]/, "Password must contain at least one uppercase"),
    confirmPassword: z
      .string({ required_error: "Password confirmation is required" })
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export const useSignUpForm = () => {
  const handleSubmit = useCallback(async (values: SignUpFormValues) => {
    console.log(values);
    const res = await postSignUp(values);
    console.log(res);
  }, []);

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      jobTitle: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(SignUpSchema),
    onSubmit: handleSubmit,
  });

  return {
    formik,
  };
};
