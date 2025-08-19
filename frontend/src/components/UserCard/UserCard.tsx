import type { User } from "../../models/UserModel";
import classes from "./UserCard.module.scss";

type UserCardProps = {
    user: User;
    onClick?: () => void;
};

export default function UserCard({ user, onClick }: UserCardProps) {
    return (
        <div className={classes.card} onClick={onClick}>
            <div className={classes.iconWrapper}>
                <img src="/images/userIconWhite2.png" alt={user.username} className={classes.icon} />
            </div>
            <div className={classes.info}>
                <div className={classes.name}>{user.username}</div>
                <div className={classes.role}>{user.role}</div>
            </div>
        </div>
    );
}
