import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.sendspark.gus.sh"
      : "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
