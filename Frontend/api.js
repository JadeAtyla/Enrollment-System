import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request(
    // leave it blank, still learning
)