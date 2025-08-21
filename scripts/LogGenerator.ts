import axios from "axios";
import "dotenv/config";

const BACKEND_URL = process.env.BACKEND_URL;
const API_KEY = process.env.API_KEY;
const LOG_INTERVAL = 5000;

function generateLog() {
    return {
        severity: Math.floor(Math.random() * 8),
        source: "test_log_generator",
        timestamp: new Date().toISOString(),
        data: "Test log data",
    };
}

async function sendLog() {
    const log = generateLog();
    try {
        const res = await axios.post(`${BACKEND_URL}/log`, log, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            withCredentials: true,
        });
        console.log("Log sent successfully:", res.data);
    } catch (err: any) {
        console.error("Error sending log:", err.response?.data || err.message);
    }
}

setInterval(sendLog, LOG_INTERVAL);
