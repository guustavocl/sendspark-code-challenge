import { z } from "zod";

export const SignUpValidation = z.object({
  body: z.object({
    user: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .toLowerCase()
        .email("Insert a valid email"),
      firstName: z
        .string({
          required_error: "First name is required",
        })
        .max(120, "First name must be less or equal 120 characters length"),
      lastName: z
        .string({
          required_error: "Last name is required",
        })
        .max(120, "Last name must be less or equal 120 characters length"),
      companyName: z
        .string({
          required_error: "Company name is required",
        })
        .max(120, "Company name must be less or equal 120 characters length"),
      jobTitle: z.string().max(120, "Job title must be less or equal 120 characters length").optional(),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, "Password must be at least 8 characters length"),
    }),
  }),
});

export const SignInValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .toLowerCase()
      .email("Insert a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters length"),
  }),
});
