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

/*
 * Ejemplo de utilizacion:
 * import api from "./services/api.js"
 * api.[peticion]("/ruta sin localhost");
 * api.post("/clientes", clientes);
 * api.get("/clientes");
 */
