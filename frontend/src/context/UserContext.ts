import { createContext } from "react";
import type { User } from "../types/User.ts";

export interface UserContextType {
    user: User | null;
    setUserContext: (userInfo: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUserContext: () => {},
});
