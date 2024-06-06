import { Document } from "mongoose";

export interface UserProps extends Document {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle?: string;
  password: string;
  passwordMatch: (email: string) => boolean;
}
