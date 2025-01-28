import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://medical-camp-management-server-xi.vercel.app",
});

const useAxiosPublic = () => {
  return axiosSecure;
};

export default useAxiosPublic;
