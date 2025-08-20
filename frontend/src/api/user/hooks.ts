import { QueryKeys } from "../../constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./";

export const useUsersQuery = () => {
    return useQuery({
        queryKey: [QueryKeys.USERS],
        queryFn: getUsers,
    });
};
