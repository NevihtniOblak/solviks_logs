import type { Log } from "../../models/LogModel";
import { severityColors, severityLabels } from "../../constants/logSeverity";
import classes from "./LogCard.module.scss";

interface LogCardProps {
    log: Log;
}

export default function LogCard({ log }: LogCardProps) {
    const severityLabel = severityLabels[log.severity] || "info";
    const severityColor = severityColors[log.severity];

    return (
        <div className={classes.container}>
            <div className={classes.source}>{log.source}</div>

            <div className={classes.spacer}></div>

            <div className={classes.severity} style={{ backgroundColor: severityColor }}>
                {severityLabel.toUpperCase()}
            </div>
            <div className={classes.timestamp}>{new Date(log.timestamp).toLocaleString()}</div>
        </div>
    );
}
