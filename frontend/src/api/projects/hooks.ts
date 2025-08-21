import { QueryKeys } from "../../constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "../../types/Project";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addProject, getProjectById, getProjects } from "./";

type useAddProjectMutationProps = {
    projectNameRef: React.RefObject<HTMLInputElement | null>;
    displayApiKey: (apiKey: string) => void;
    onError?: () => void;
};

export const useProjectsQuery = () => {
    return useQuery({
        queryKey: [QueryKeys.PROJECTS],
        queryFn: getProjects,
    });
};

export const useProjectQuery = (id: string) => {
    return useQuery({
        queryKey: [QueryKeys.PROJECTS, id],
        queryFn: () => getProjectById(id),
    });
};

export const useAddProjectMutation = ({ projectNameRef, displayApiKey }: useAddProjectMutationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addProject,
        onSuccess: (data) => {
            queryClient.setQueryData([QueryKeys.PROJECTS], (old: Project[]) => {
                return old ? [...old, data.project] : [data.project];
            });
            console.log("Project added:", data);
            displayApiKey(data.apiKey);
        },
        onError: () => {
            if (projectNameRef.current) projectNameRef.current.value = "";
        },
    });
};
