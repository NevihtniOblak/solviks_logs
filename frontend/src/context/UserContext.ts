import { createContext } from "react";
import type { User } from "../models/UserModel.ts";

export interface UserContextType {
    user: User | null;
    setUserContext: (userInfo: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUserContext: () => {},
});
