import { ApiRoutes } from "../../constants/routes";
import axios from "../axios";

export const getUsers = async () => {
    const response = await axios.get(ApiRoutes.getAllUsers());
    return response.data || {};
};
