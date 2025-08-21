import { motion, AnimatePresence } from "framer-motion";
import type { Log } from "../../types/Log";
import { severityColors, severityStrings } from "../../constants/logSeverity";
import classes from "./LogModal.module.scss";

interface LogModalProps {
    log: Log;
    closeModal: () => void;
}

export default function LogModal({ log, closeModal }: LogModalProps) {
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
                    <div className={classes.content}>
                        <p className={classes.logValBig}>Source: {log.source}</p>
                        <p className={classes.logValBig}>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
                        <div className={classes.severityContainer}>
                            <span className={classes.logValSmall}>Severity:</span>
                            <span
                                className={classes.severity}
                                style={{ backgroundColor: severityColors[log.severity] }}
                            >
                                {severityStrings[log.severity]}
                            </span>
                        </div>
                        <span className={classes.logValSmall}>Data:</span>
                        <span className={classes.logValBigger}>
                            {log.data ? JSON.stringify(log.data, null, 2) : "No data"}
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
