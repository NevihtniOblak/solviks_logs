import { useParams } from "react-router-dom";
import type { Log } from "../../models/LogModel";

export default function ProjectLogs() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hardcodedLogs: Log[] = [
        {
            _id: "1",
            severity: 1,
            source: "Server",
            timestamp: new Date("2025-08-19T09:15:00Z"),
            project: "101",
            data: { message: "Server started successfully" },
        },
        {
            _id: "2",
            severity: 2,
            source: "Database",
            timestamp: new Date("2025-08-19T10:05:42Z"),
            project: "102",
            data: { query: "SELECT * FROM users", duration: 120 },
        },
        {
            _id: "3",
            severity: 3,
            source: "API",
            timestamp: new Date("2025-08-19T11:30:15Z"),
            project: "101",
            data: { endpoint: "/projects", status: 500, error: "Internal Server Error" },
        },
        {
            _id: "4",
            severity: 1,
            source: "Auth",
            timestamp: new Date("2025-08-19T12:45:00Z"),
            project: "103",
            data: { user: "alice", action: "login_success" },
        },
    ];

    const { id } = useParams();

    return (
        <div>
            <h1>Project Logs for Project {id}</h1>
        </div>
    );
}
