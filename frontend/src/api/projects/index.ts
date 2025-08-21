import { ApiRoutes } from "../../constants/routes";
import axios from "../axios";

export const getProjects = async () => {
    const response = await axios.get(ApiRoutes.getAllProjects());
    return response.data || {};
};

export const getProjectById = async (id: string) => {
    const response = await axios.get(ApiRoutes.getProjectById(id));
    return response.data || {};
};

export const addProject = async (projectName: string) => {
    const response = await axios.post(ApiRoutes.createProject(), { name: projectName });
    return response.data;
};
