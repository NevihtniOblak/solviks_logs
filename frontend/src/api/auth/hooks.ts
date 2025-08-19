import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import { loginUser, logoutUser } from "./";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { QueryKeys } from "../../constants/queryKeys";

type UseLoginMutationProps = {
    usernameRef: React.RefObject<HTMLInputElement | null>;
    passwordRef: React.RefObject<HTMLInputElement | null>;
    setError?: (msg: string) => void;
};

export const useLoginMutation = ({ usernameRef, passwordRef }: UseLoginMutationProps) => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            userContext.setUserContext(data);
            navigate(Routes.HOME.route);
        },
        onError: () => {
            if (usernameRef.current) usernameRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
        },
    });
};

export const useLogoutQuery = () => {
    return useQuery({
        queryKey: [QueryKeys.USER],
        queryFn: logoutUser,
        enabled: false,
    });
};
