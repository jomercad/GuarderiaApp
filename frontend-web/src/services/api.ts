import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000/api", // URL de tu backend
  baseURL: "http://192.168.1.23:5000/api",
});

export default api;
