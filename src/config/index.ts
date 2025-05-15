import axios from "axios"

const local = window.location.host.includes('localhost');
//http://13.49.74.126:3000

const instance = axios.create({
    baseURL: local ? "http://localhost:3000/" : "http://13.49.74.126:3000/",
    timeout:10000,
    headers:{
        'Accept':'/',
        'Content-Type':'application/json'
    }
});

export const FormTypeBackend = axios.create({
    baseURL: local ? "http://localhost:3000/" : "http://13.49.74.126:3000/",
    timeout:100000,
    headers:{
        'Accept':'/',
        'Content-Type':'multipart/form-data'
    }
});


instance.interceptors.request.use( function (config){
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token || ""}`
    return config;
});


FormTypeBackend.interceptors.request.use( function (config){
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token || ""}`
    return config;
});

export default instance;