import { url } from './baseUrl';
import axios from 'axios'

// config aioxs
const instance = axios.create({
    baseURL: url,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    }
})
// response parse
instance.interceptors.response.use((response) => {

    const {code, auto} = response.data
    if (code === 401) {
        
    }
    
    return response.data;
}, error => {
    return Promise.reject(error)
})

export default instance;