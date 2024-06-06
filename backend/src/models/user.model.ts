import bcrypt from "bcryptjs";
import mongoosePaginate from "mongoose-paginate-v2";
import { model, models, Schema, PaginateModel } from "mongoose";
import { UserProps } from "./user.types";
import { createHashedPassword } from "../utils/jwt";

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
      maxLength: [120, "First name must be less or equal 120 characters length"],
    },
    lastName: {
      type: String,
      required: true,
      maxLength: [120, "Last name must be less or equal 120 characters length"],
    },
    companyName: {
      type: String,
      required: true,
      maxLength: [120, "Company name must be less or equal 120 characters length"],
    },
    jobTitle: { type: String, maxLength: [120, "Job title must be less or equal 120 characters length"] },
    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters length"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
      },
    },
  }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as UserProps;
  return bcrypt.compare(password, user.password);
};

UserSchema.path("email").validate(
  async (email: string) => {
    const emailRegex = new RegExp("[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,3}");
    return emailRegex.test(email);
  },
  "This email is invalid",
  "INVALID"
);

UserSchema.path("email").validate(
  async (email: string) => {
    const emailCount = await models.User.countDocuments({ email });
    return !emailCount;
  },
  "This email is already registered!",
  "DUPLICATED"
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await createHashedPassword(this.password);
  next();
});

export const User = model<UserProps, PaginateModel<UserProps>>("User", UserSchema);
