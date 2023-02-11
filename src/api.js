import axios from "axios";

/**
 * @description axios instance to be used commonly throughout the application
 * @param {import("axios").CreateAxiosDefaults} api arguments
 */
export default function createApi(axiosArgs) {
  /**
   * @type {import("axios").AxiosInstance}
   */
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3005",
    ...axiosArgs,
  });

  return axiosInstance;
}
