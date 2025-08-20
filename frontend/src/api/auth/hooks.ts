import React, { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import { loginUser, logoutUser, registerUser } from "./";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { QueryKeys } from "../../constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../models/UserModel";

type UseLoginMutationProps = {
    usernameRef: React.RefObject<HTMLInputElement | null>;
    passwordRef: React.RefObject<HTMLInputElement | null>;
    setError?: (msg: string) => void;
};

type useRegisterMutationProps = {
    usernameRef: React.RefObject<HTMLInputElement | null>;
    passwordRef: React.RefObject<HTMLInputElement | null>;
    roleRef: React.RefObject<HTMLSelectElement | null>;
    callback?: () => void;
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

export const useRegisterMutation = ({ usernameRef, passwordRef, roleRef, callback }: useRegisterMutationProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            queryClient.setQueryData([QueryKeys.USERS], (old: User[]) => {
                return old ? [...old, data] : [data];
            });
            if (callback) callback();
        },
        onError: () => {
            if (usernameRef.current) usernameRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            if (roleRef.current) roleRef.current.value = "user";
        },
    });
};
