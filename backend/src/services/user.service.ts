import { FilterQuery, PaginateOptions } from "mongoose";
import { User } from "../models/user.model";
import { UserProps } from "../models/user.types";

export const removeOneUser = async (userId: string) => {
  const user = await User.findOneAndRemove({ _id: userId });
  if (!user) {
    return null;
  }
  return user;
};

export const getAllUsers = async (filter: FilterQuery<UserProps>, options: PaginateOptions) => {
  const users = await User.paginate(filter, options);
  return users;
};
