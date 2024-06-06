import { Types } from "mongoose";
import { z } from "zod";

export const RemoveUserValidation = z.object({
  params: z.object({
    userId: z
      .string({
        required_error: "UserId is required",
      })
      .refine(val => {
        return Types.ObjectId.isValid(val);
      }, "Must be a valid userId"),
  }),
});

export const findAllUsersValidation = z.object({
  query: z.object({
    jobTitle: z.string().optional(),
    companyName: z.string().optional(),
    limit: z
      .string()
      .optional()
      .transform(limit => limit && parseInt(limit))
      .refine(limit => {
        if (limit && limit > 100) return false;
        return true;
      }, "Limit must be less than 100"),
    page: z
      .string()
      .transform(page => page && parseInt(page))
      .optional(),
  }),
});
