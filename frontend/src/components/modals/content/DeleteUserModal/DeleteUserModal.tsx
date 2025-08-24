import type { User } from "../../../../types/User";
import { AnimatePresence } from "framer-motion";
import { useDeleteUserMutation } from "../../../../api/user/hooks";
import classes from "./DeleteUserModal.module.scss";

interface DeleteUserModalProps {
    closeModal: () => void;
    user: User;
}

export default function DeleteUserModal({ closeModal, user }: DeleteUserModalProps) {
    const onDeleteUser = () => {
        closeModal();
    };

    const userDeleteMutation = useDeleteUserMutation({ callback: onDeleteUser });

    const handleDelete = () => {
        userDeleteMutation.mutate(user._id);
    };

    return (
        <AnimatePresence>
            <div className={classes.container}>
                <div className={classes.innerModal}>
                    <p className={classes.text}>Are you sure you want to delete user {user.username}?</p>
                    <div className={classes.buttonWrapper}>
                        <button className={classes.button} onClick={handleDelete}>
                            Yes
                        </button>
                        <button className={classes.button} onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}
