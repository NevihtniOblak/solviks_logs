import { BACKEND_URL } from "../constants/env";
import { BadResponseCode } from "../constants/BadResponseCodes";
import axios from "axios";

const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

let logoutHandler: (() => void) | null = null;

export const registerLogoutHandler = (handler: () => void) => {
    logoutHandler = handler;
};

instance.interceptors.request.use(async (request) => {
    return request;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (
                status === 401 &&
                data?.code &&
                [
                    BadResponseCode.INVALID_TOKEN,
                    BadResponseCode.MISSING_TOKEN,
                    BadResponseCode.EXPIRED_TOKEN,
                    BadResponseCode.INACTIVE_TOKEN,
                ].includes(data.code)
            ) {
                if (logoutHandler) logoutHandler();
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
