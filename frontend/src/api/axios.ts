import axios from "axios";
import { BACKEND_URL } from "../constants/env";

const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

instance.interceptors.request.use(async (request) => {
    return request;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default instance;
