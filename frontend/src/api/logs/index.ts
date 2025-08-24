import { ApiRoutes } from "../../constants/routes";
import axios from "../axios";

export const getLogsByProjectId = async (projectId: string) => {
    const response = await axios.get(ApiRoutes.getLogsByProjectId(projectId));
    return response.data || [];
};

export const getLogById = async (id: string) => {
    const response = await axios.get(ApiRoutes.getLogById(id));
    return response.data || {};
};
