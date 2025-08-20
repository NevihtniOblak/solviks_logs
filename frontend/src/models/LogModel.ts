export interface Log {
    _id: string;
    severity: number;
    source: string;
    timestamp: Date;
    project: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}
