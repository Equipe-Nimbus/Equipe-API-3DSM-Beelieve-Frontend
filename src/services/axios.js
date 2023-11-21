import axios from "axios";

export const configurarAxios = (token) => {
    axios.defaults.baseURL = "http://localhost:8080"

    axios.interceptors.request.use(
        (config) => {
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
        
    )
}

export default axios;
