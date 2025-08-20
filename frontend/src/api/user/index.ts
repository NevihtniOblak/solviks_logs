import axios from "../axios";
import { ApiRoutes } from "../../constants/routes";

export const getUsers = async () => {
    const response = await axios.get(ApiRoutes.getAllUsers());
    return response.data || {};
};
