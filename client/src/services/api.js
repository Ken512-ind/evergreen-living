import axios from "axios";

const api = axios.create({
  baseURL: "http://202.155.13.202/api",
});

export default api;