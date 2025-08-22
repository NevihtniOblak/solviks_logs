import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegenerateProjectKeyMutation } from "../../api/projects/hooks";
import classes from "./RegenerateKeyModal.module.scss";

interface RegenerateKeyModalProps {
    closeModal: () => void;
    projectId: string;
}

export default function RegenerateKeyModal({ closeModal, projectId }: RegenerateKeyModalProps) {
    const [apiKey, setApiKey] = useState<string | null>(null);

    const displayApiKey = (apiKey: string) => {
        setApiKey(apiKey);
    };

    const regenerateKeyMutation = useRegenerateProjectKeyMutation({ projectId, displayApiKey });

    const handleConfirm = () => {
        regenerateKeyMutation.mutate(projectId);
    };

    const handleCloseModal = () => {
        setApiKey(null);
        closeModal();
    };

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <AnimatePresence>
            <motion.div
                className={classes.blur}
                onClick={handleCloseModal}
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
                    {!apiKey ? (
                        <div className={classes.innerModal}>
                            <p className={classes.text}>Are you sure you want to regenerate your API key?</p>
                            <div className={classes.buttonWrapper}>
                                <button className={classes.button} onClick={handleConfirm}>
                                    Yes
                                </button>
                                <button className={classes.button} onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            className={classes.innerModal}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            <p className={classes.text}>Copy your new API key:</p>
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
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
