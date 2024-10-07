import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
