import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddProjectMutation } from "../../../../api/projects/hooks";
import classes from "./AddProjectModal.module.scss";

interface AddProjectModalProps {
    closeModal: () => void;
}

export default function AddProjectModal({ closeModal }: AddProjectModalProps) {
    const projectNameRef = useRef<HTMLInputElement>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);

    const displayApiKey = (apiKey: string) => {
        setApiKey(apiKey);
    };

    const handleCloseModal = () => {
        setApiKey(null);
        closeModal();
    };

    const addProjectMutation = useAddProjectMutation({ projectNameRef, displayApiKey });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectNameRef.current) {
            addProjectMutation.mutate(projectNameRef.current.value);
        }
    };

    return (
        <AnimatePresence>
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                    <h2 className={classes.title}>{apiKey ? "Save your API key" : "Add new project"}</h2>
                </div>

                {!apiKey ? (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input
                            type="text"
                            placeholder="Project Name"
                            ref={projectNameRef}
                            className={classes.input}
                            required
                        />
                        <div className={classes.buttonWrapper}>
                            <button type="submit" className={classes.button}>
                                Add
                            </button>
                        </div>
                    </form>
                ) : (
                    <motion.div
                        className={classes.form}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <input
                            type="text"
                            value={apiKey}
                            readOnly
                            className={classes.input}
                            onFocus={(e) => e.target.select()}
                            onClick={() => {
                                navigator.clipboard.writeText(apiKey).then(() => {
                                    alert("API key copied to clipboard!");
                                });
                            }}
                        />
                        <div className={classes.buttonWrapper}>
                            <button onClick={handleCloseModal} className={classes.button}>
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
}
