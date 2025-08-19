import UserCard from "../UserCard/UserCard";
import type { User } from "../../models/UserModel";
import classes from "./Users.module.scss";

const hardcodedUsers: User[] = [
    { id: "1", username: "Alice", role: "admin" },
    { id: "2", username: "Bob", role: "user" },
    { id: "3", username: "Charlie", role: "user" },
];

export default function Users() {
    const handleAddUser = () => {
        console.log("Add new user clicked");
    };

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <h1>Users</h1>
                <div className={classes.grid}>
                    <div className={classes.addCard} onClick={handleAddUser}>
                        <span>+</span>
                    </div>
                    {hardcodedUsers.map((user) => (
                        <UserCard key={user.id} user={user} onClick={() => console.log(user.id)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
