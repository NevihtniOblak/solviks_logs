import axios from "../axios";
import { ApiRoutes } from "../../constants/routes";

type LoginPayload = {
    username: string;
    password: string;
};

export const loginUser = async ({ username, password }: LoginPayload) => {
    const response = await axios.post(ApiRoutes.login(), { username, password });
    return response.data || {};
};

export const logoutUser = async () => {
    const response = await axios.post(ApiRoutes.logout());
    return response.data || {};
};
