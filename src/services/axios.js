import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

export const configurarAxios = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
}

export default axios;
