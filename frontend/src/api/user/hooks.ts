import { QueryKeys } from "../../constants/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "./";

type useDeleteUserMutationProps = {
    callback?: () => void;
};

export const useUsersQuery = () => {
    return useQuery({
        queryKey: [QueryKeys.USERS],
        queryFn: getUsers,
    });
};

export const useDeleteUserMutation = ({ callback }: useDeleteUserMutationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
            if (callback) callback();
        },
    });
};
