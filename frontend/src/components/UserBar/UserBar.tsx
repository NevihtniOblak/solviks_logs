import type { User } from "../../models/UserModel.ts";
import { useLogoutQuery } from "../../api/auth/hooks.ts";
import { UserContext } from "../../context/UserContext.ts";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import classes from "./Userbar.module.scss";

type UserBarProps = {
    user: User;
    className?: string;
};

export default function Userbar({ user, className }: UserBarProps) {
    const { refetch: logoutUser } = useLogoutQuery();
    const userCtxt = useContext(UserContext);

    const handleLogout = async () => {
        logoutUser();
        userCtxt.setUserContext(null);
        return <Navigate to="/login" replace />;
    };

    return (
        <div className={`${classes.userBar} ${className}`}>
            <img src="/images/userIconWhite2.png" alt="User icon" className={classes.avatar} />
            <div className={classes.userInfo}>
                <span className={classes.userName}>{user.username}</span>
                <span className={classes.userRank}>{user.role}</span>
            </div>
            <button className={classes.logoutButton} onClick={handleLogout}>
                <img src="/images/logoutIcon.png" alt="Logout" className={classes.logoutIcon} />
            </button>
        </div>
    );
}
