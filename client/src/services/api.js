import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["token"] = user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
