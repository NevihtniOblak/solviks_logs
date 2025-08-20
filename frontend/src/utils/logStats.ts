import type { Log } from "../models/LogModel";

const isWithinLast = (timestamp: Date, ms: number): boolean => {
    const now = new Date().getTime();
    return new Date(timestamp).getTime() >= now - ms;
};

export const countLogsLastHour = (logs: Log[]): number => {
    return logs.filter((log) => isWithinLast(log.timestamp, 1000 * 60 * 60)).length;
};

export const countLogsLastDay = (logs: Log[]): number => {
    return logs.filter((log) => isWithinLast(log.timestamp, 1000 * 60 * 60 * 24)).length;
};

export const countLogsBySeverity = (logs: Log[]): Record<number, number> => {
    const severityLevels = [0, 1, 2, 3, 4, 5, 6, 7];

    const initialCounts: Record<number, number> = severityLevels.reduce((acc, sev) => {
        acc[sev] = 0;
        return acc;
    }, {} as Record<number, number>);

    return logs.reduce<Record<number, number>>((acc, log) => {
        acc[log.severity] = (acc[log.severity] || 0) + 1;
        return acc;
    }, initialCounts);
};
