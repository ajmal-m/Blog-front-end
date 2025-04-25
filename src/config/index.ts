import axios from "axios"

const local = window.location.host.includes('localhost') ;

const instance = axios.create({
    baseURL: local ? "http://localhost:3000/" : import.meta.env.BACK_END_URL,
    timeout:10000,
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept':'/',
        'Content-Type':'application/json'
    }
});

export default instance;