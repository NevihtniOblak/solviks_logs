import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Log } from "../types/Log";
export const exportLogsToExcel = (logs: Log[], projectName: string) => {
    const data = logs.map((log) => ({
        Severity: log.severity,
        Source: log.source,
        Timestamp: new Date(log.timestamp).toISOString(),
        Data: JSON.stringify(log.data),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `logs_${projectName}_${new Date().toISOString()}.xlsx`);
};
