import { useParams } from "react-router-dom";
import type { Log } from "../../models/LogModel";
import LogCard from "../LogCard/LogCard";
import { useProjectQuery } from "../../api/projects/hooks";
import { countLogsBySeverity, countLogsLastDay, countLogsLastHour } from "../../utils/logStats";
import { severityColors, severityStrings } from "../../constants/logSeverity";
import { exportLogsToExcel } from "../../utils/exportLogs";
import type { SortMode } from "../../models/SortMode";
import { useEffect, useMemo, useState } from "react";
import { sortLogs } from "../../utils/sortLogs";
import { useLogsByProjectQuery } from "../../api/logs/hooks";
import LogModal from "../LogModal/LogModal";
import classes from "./ProjectLogs.module.scss";

export default function ProjectLogs() {
    const { id } = useParams();
    const { data, isLoading } = useProjectQuery(id!);

    const project = data ?? {};
    const { data: logsData } = useLogsByProjectQuery(id!);
    const [logs, setLogs] = useState<Log[]>(logsData || []);
    const [sortMode, setSortMode] = useState<SortMode>("latest");

    const [selectedLog, setSelectedLog] = useState<Log | null>(null);

    useEffect(() => {
        setLogs(sortLogs(logs, sortMode));
    }, [sortMode]);

    const logsLastHour = useMemo(() => countLogsLastHour(logs), [logs]);
    const logsLastDay = useMemo(() => countLogsLastDay(logs), [logs]);
    const logsBySeverity = useMemo(() => countLogsBySeverity(logs), [logs]);

    return (
        <div className={classes.container}>
            <div className={classes.leftContainer}>
                {!isLoading && project && <h1 className={classes.projectName}>{project.name}</h1>}

                <div className={classes.buttonsContainer}>
                    <select
                        value={sortMode}
                        onChange={(e) => setSortMode(e.target.value as SortMode)}
                        className={classes.select}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostSevere">Most Severe</option>
                        <option value="leastSevere">Least Severe</option>
                    </select>
                    <button className={classes.button} onClick={() => exportLogsToExcel(logs, project.name)}>
                        Export to Excel
                    </button>
                </div>
                <div className={classes.logsContainer}>
                    {logs.map((log) => (
                        <LogCard key={log._id.toString()} log={log} onClick={() => setSelectedLog(log)} />
                    ))}
                </div>
            </div>
            <div className={classes.rightContainer}>
                <div className={classes.statsContainer}>
                    <p>Logs in last hour: {logsLastHour}</p>
                    <p>Logs in last 24h: {logsLastDay}</p>

                    <h3 className={classes.statsSubTitle}>Logs by severity</h3>
                    <div className={classes.severityList}>
                        {Object.entries(logsBySeverity).map(([sevNumber, count]) => {
                            const label = severityStrings[+sevNumber];
                            const color = severityColors[+sevNumber];
                            return (
                                <div key={sevNumber} className={classes.severityItem}>
                                    <span className={classes.severityCircle} style={{ backgroundColor: color }} />
                                    <span>{label}</span>
                                    <span className={classes.count}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {selectedLog && <LogModal log={selectedLog} closeModal={() => setSelectedLog(null)} />}
        </div>
    );
}
