import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000"
axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.Accept = 'application/json'
    config.headers["Content-Type"] = 'application/json'
    return config
})