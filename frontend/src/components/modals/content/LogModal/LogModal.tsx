import type { Log } from "../../../../types/Log";
import { severityColors, severityStrings } from "../../../../constants/logSeverity";
import classes from "./LogModal.module.scss";

interface LogModalProps {
    log: Log;
    closeModal: () => void;
}

export default function LogModal({ log }: LogModalProps) {
    return (
        <div className={classes.container}>
            <p className={classes.logValBig}>Source: {log.source}</p>
            <p className={classes.logValBig}>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
            <div className={classes.severityContainer}>
                <span className={classes.logValSmall}>Severity:</span>
                <span className={classes.severity} style={{ backgroundColor: severityColors[log.severity] }}>
                    {severityStrings[log.severity]}
                </span>
            </div>
            <span className={classes.logValSmall}>Data:</span>
            <span className={classes.logValBigger}>{log.data ? JSON.stringify(log.data, null, 2) : "No data"}</span>
        </div>
    );
}
