import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://workflow-earning-platform-server.vercel.app",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
