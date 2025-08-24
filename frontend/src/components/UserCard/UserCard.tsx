import type { User } from "../../types/User";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import classes from "./UserCard.module.scss";

type UserCardProps = {
    user: User;
    onClick?: () => void;
    openDeleteUserModal?: (userId: User) => void;
};

export default function UserCard({ user, onClick, openDeleteUserModal }: UserCardProps) {
    const userCtx = useContext(UserContext);
    const currentUser = userCtx?.user;

    return (
        <div className={classes.card} onClick={onClick}>
            <div className={classes.iconWrapper}>
                <img src="/images/userIconWhite2.png" alt={user.username} className={classes.icon} />
            </div>

            {currentUser?.role === "admin" && (
                <img
                    src="/images/deleteUserIcon.png"
                    className={classes.deleteIcon}
                    onClick={() => openDeleteUserModal && openDeleteUserModal(user)}
                />
            )}

            <div className={classes.info}>
                <div className={classes.name}>{user.username}</div>
                <div className={classes.role}>{user.role}</div>
            </div>
        </div>
    );
}
