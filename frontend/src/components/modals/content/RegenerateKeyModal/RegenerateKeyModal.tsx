import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegenerateProjectKeyMutation } from "../../../../api/projects/hooks";
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

    return (
        <AnimatePresence>
            <div className={classes.container}>
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
            </div>
        </AnimatePresence>
    );
}
