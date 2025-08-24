import { QueryKeys } from "../../constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "../../types/Project";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addProject, getProjectById, getProjects, regenerateProjectKey, deleteProject } from "./";

type useAddProjectMutationProps = {
    projectNameRef: React.RefObject<HTMLInputElement | null>;
    displayApiKey: (apiKey: string) => void;
    onError?: () => void;
};

type useRegenerateProjectKeyMutationProps = {
    projectId: string;
    displayApiKey: (apiKey: string) => void;
    onError?: () => void;
};

type useDeleteProjectMutationProps = {
    callback?: () => void;
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
            displayApiKey(data.apiKey);
        },
        onError: () => {
            if (projectNameRef.current) projectNameRef.current.value = "";
        },
    });
};

export const useRegenerateProjectKeyMutation = ({ projectId, displayApiKey }: useRegenerateProjectKeyMutationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: regenerateProjectKey,
        onSuccess: (data) => {
            queryClient.setQueryData([QueryKeys.PROJECTS, projectId], (old: Project | undefined) => {
                if (!old) return;

                return {
                    ...old,
                    apiKey: data.apiKey,
                };
            });
            displayApiKey(data.apiKey);
        },
    });
};

export const useDeleteProjectMutation = ({ callback }: useDeleteProjectMutationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: (_, variables) => {
            queryClient.setQueryData([QueryKeys.PROJECTS], (old: Project[]) => {
                return old ? old.filter((project) => project._id !== variables) : [];
            });
            if (callback) callback();
        },
    });
};
