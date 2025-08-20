import type { UserRole } from "./UserRole";

export interface User {
    _id: string;
    username: string;
    role: UserRole;
}
