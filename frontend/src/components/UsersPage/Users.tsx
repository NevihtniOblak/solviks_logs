import UserCard from "../UserCard/UserCard";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AddUserModal from "../modals/content/AddUserModal/AddUserModal";
import { useUsersQuery } from "../../api/user/hooks";
import type { User } from "../../types/User";
import Modal from "../modals/Modal/Modal";
import DeleteUserModal from "../modals/content/DeleteUserModal/DeleteUserModal";
import classes from "./Users.module.scss";

export default function Users() {
    const [showModal, setShowModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState<User | null>(null);
    const userCtx = useContext(UserContext);

    const { data } = useUsersQuery();
    const users: User[] = data ?? [];

    const handleAddUserClick = () => {
        if (userCtx.user?.role !== "admin") {
            alert("You must be an admin to add new users!");
            return;
        }
        setShowModal(true);
    };

    const openDeleteUserModal = (user: User) => {
        setDeleteUserModal(user);
    };

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <h1>Users</h1>
                <div className={classes.grid}>
                    <div className={classes.addCard} onClick={handleAddUserClick}>
                        <span>+</span>
                    </div>
                    {users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            onClick={() => console.log(user._id)}
                            openDeleteUserModal={openDeleteUserModal}
                        />
                    ))}
                </div>
            </div>

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <AddUserModal closeModal={() => setShowModal(false)} />
                </Modal>
            )}

            {deleteUserModal && (
                <Modal closeModal={() => setDeleteUserModal(null)}>
                    <DeleteUserModal closeModal={() => setDeleteUserModal(null)} user={deleteUserModal} />
                </Modal>
            )}
        </div>
    );
}
