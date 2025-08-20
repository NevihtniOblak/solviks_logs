import type { Log } from "../models/LogModel";
import type { SortMode } from "../models/SortMode";

export const sortLogs = (logs: Log[], mode: SortMode): Log[] => {
    return [...logs].sort((a, b) => {
        switch (mode) {
            case "latest":
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            case "oldest":
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            case "leastSevere":
                return b.severity - a.severity;
            case "mostSevere":
                return a.severity - b.severity;
            default:
                return 0;
        }
    });
};
