import type { ReactNode } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface AuthWrapperProps {
    children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};
