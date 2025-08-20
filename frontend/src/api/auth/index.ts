import axios from "../axios";
import { ApiRoutes } from "../../constants/routes";
import type { UserRole } from "../../models/UserRole";

type LoginPayload = {
    username: string;
    password: string;
};

type RegisterPayload = {
    username: string;
    password: string;
    role: UserRole;
};

export const loginUser = async ({ username, password }: LoginPayload) => {
    const response = await axios.post(ApiRoutes.login(), { username, password });
    return response.data || {};
};

export const logoutUser = async () => {
    const response = await axios.get(ApiRoutes.logout());
    return response.data || {};
};

export const registerUser = async ({ username, password, role }: RegisterPayload) => {
    const response = await axios.post(ApiRoutes.register(), { username, password, role });
    return response.data || {};
};
