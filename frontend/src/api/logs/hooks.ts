import { QueryKeys } from "../../constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getLogsByProjectId, getLogById } from "./";

export const useLogsByProjectQuery = (projectId: string) => {
    return useQuery({
        queryKey: [QueryKeys.LOGS_BY_PROJECT, projectId],
        queryFn: () => getLogsByProjectId(projectId),
    });
};

export const useLogQuery = (id: string) => {
    return useQuery({
        queryKey: [QueryKeys.LOGS, id],
        queryFn: () => getLogById(id),
    });
};
