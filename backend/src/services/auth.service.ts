import { User } from "../models/user.model";
import { UserProps } from "../models/user.types";

export const createUser = async (user: UserProps) => {
  return await User.create({ user });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email });
  if (!user || !(await user.passwordMatch(password))) {
    return null;
  }
  return user;
};
