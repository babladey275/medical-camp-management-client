import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosSecure;
};

export default useAxiosPublic;
