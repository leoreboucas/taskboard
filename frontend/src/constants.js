import axios from "axios"; 

export const URL_BACKEND = 'http://localhost:4000/api'
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});