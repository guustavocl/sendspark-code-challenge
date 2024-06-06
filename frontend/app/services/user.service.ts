import { axiosInstance } from "./axios.service";

export const postSignOut = async () => {
  try {
    const request = await axiosInstance.post(
      "/user/sign-out",
      {},
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    console.log(err);
  }
};
