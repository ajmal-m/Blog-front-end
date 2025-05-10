import axios from "axios"

const local = window.location.host.includes('localhost');
//http://13.49.74.126:3000

const instance = axios.create({
    baseURL: local ? "http://localhost:3000/" : "http://13.49.74.126:3000/",
    timeout:10000,
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept':'/',
        'Content-Type':'application/json'
    }
});

export default instance;