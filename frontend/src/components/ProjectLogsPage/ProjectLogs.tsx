import { useParams } from "react-router-dom";
import type { Log } from "../../types/Log";
import { useProjectQuery } from "../../api/projects/hooks";
import { countLogsBySeverity, countLogsLastDay, countLogsLastHour } from "../../utils/logStats";
import { severityColors, severityStrings } from "../../constants/logSeverity";
import { exportLogsToExcel } from "../../utils/exportLogs";
import type { SortMode } from "../../types/SortMode";
import { useMemo, useState, useContext } from "react";
import { sortLogs } from "../../utils/sortLogs";
import type { Project } from "../../types/Project";
import { useLogsByProjectQuery } from "../../api/logs/hooks";
import { UserContext } from "../../context/UserContext";
import LogModal from "../modals/content/LogModal/LogModal";
import LogCard from "../LogCard/LogCard";
import RegenerateKeyModal from "../modals/content/RegenerateKeyModal/RegenerateKeyModal";
import DeleteProjectModal from "../modals/content/DeleteProjectModal/DeleteProjectModal";
import Modal from "../modals/Modal/Modal";
import classes from "./ProjectLogs.module.scss";

export default function ProjectLogs() {
    const [selectedLog, setSelectedLog] = useState<Log | null>(null);
    const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState<Project | null>(null);
    const [regenKeyModalOpen, setRegenKeyModalOpen] = useState(false);
    const [sortMode, setSortMode] = useState<SortMode>("latest");

    const { id } = useParams();

    const { data: projectData, isLoading } = useProjectQuery(id!);
    const project: Project | undefined = projectData;

    const { data: logsData } = useLogsByProjectQuery(id!);
    const logs = useMemo(() => (logsData ? sortLogs(logsData, sortMode) : []), [logsData, sortMode]);

    const logsLastHour = useMemo(() => countLogsLastHour(logs), [logs]);
    const logsLastDay = useMemo(() => countLogsLastDay(logs), [logs]);
    const logsBySeverity = useMemo(() => countLogsBySeverity(logs), [logs]);

    const userCtx = useContext(UserContext);

    return (
        <div className={classes.container}>
            <div className={classes.leftContainer}>
                {!isLoading && project && <h1 className={classes.projectName}>{project.name}</h1>}

                <div className={classes.utilButtonsContainer}>
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
                    <button
                        className={classes.button}
                        onClick={() => exportLogsToExcel(logs, project?.name || "")}
                        disabled={!project}
                    >
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
                <div className={classes.buttonsContainer}>
                    <button
                        className={classes.deleteButton}
                        onClick={() => project && setDeleteProjectModalOpen(project)}
                        disabled={userCtx.user?.role !== "admin"}
                    >
                        <img src="/images/trashIcon.png" alt="Trash Icon" className={classes.icon} />
                        Delete Project
                    </button>
                    <button
                        className={classes.regenerateButton}
                        onClick={() => setRegenKeyModalOpen(true)}
                        disabled={userCtx.user?.role !== "admin"}
                    >
                        <img src="/images/keyIcon.png" alt="Key Icon" className={classes.icon} />
                        Regenerate API Key
                    </button>
                </div>
            </div>

            {selectedLog && (
                <Modal closeModal={() => setSelectedLog(null)} width={"350px"}>
                    <LogModal log={selectedLog} closeModal={() => setSelectedLog(null)} />
                </Modal>
            )}

            {regenKeyModalOpen && id && (
                <Modal closeModal={() => setRegenKeyModalOpen(false)}>
                    <RegenerateKeyModal closeModal={() => setRegenKeyModalOpen(false)} projectId={id} />
                </Modal>
            )}

            {deleteProjectModalOpen && id && (
                <Modal closeModal={() => setDeleteProjectModalOpen(null)}>
                    <DeleteProjectModal closeModal={() => setDeleteProjectModalOpen(null)} projectId={id} />
                </Modal>
            )}
        </div>
    );
}
