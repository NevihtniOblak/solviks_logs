import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { UserRole } from "../../types/UserRole";
import { useRegisterMutation } from "../../api/auth/hooks";
import classes from "./AddUserModal.module.scss";

interface AddUserModalProps {
    closeModal: () => void;
}

export default function AddUserModal({ closeModal }: AddUserModalProps) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);

    const registerMutation = useRegisterMutation({ usernameRef, passwordRef, roleRef, callback: closeModal });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameRef.current && passwordRef.current && roleRef.current) {
            registerMutation.mutate({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                role: roleRef.current.value as UserRole,
            });
        }
    };

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <AnimatePresence>
            <motion.div
                className={classes.blur}
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className={classes.modal}
                    onClick={stopPropagation}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <div className={classes.titleWrapper}>
                        <h2 className={classes.title}>Register new user</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            ref={usernameRef}
                            className={classes.input}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className={classes.input}
                            required
                        />
                        <select ref={roleRef} defaultValue="user" className={classes.input}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className={classes.buttonWrapper}>
                            <button type="submit" className={classes.button}>
                                Add
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
