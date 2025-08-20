export interface Log {
    _id: string;
    severity: number;
    source: string;
    timestamp: Date;
    project: string;
    data?: Record<string, unknown>;
}
