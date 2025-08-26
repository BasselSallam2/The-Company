import morgan from "morgan";
import winston from "winston";
import { Request , Response } from "express";
import path from "path";
import fs from "fs"; 
import { fileURLToPath } from "url";
import { Permessions } from "./interfaces.js";

const root = process.cwd();


const logsDir = path.join(root , "src", "LOGS");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const logFile = path.join(logsDir, "errors.log");
if (!fs.existsSync(logFile)) fs.writeFileSync(logFile, "");

const log = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new winston.transports.File({ filename: logFile }), new winston.transports.Console()],
});


const logger = morgan((tokens, req, res) => {
  const expressReq = req as Request; 
  const body = expressReq.body;

  if (res.statusCode < 400) return null; 
  const ip = tokens['remote-addr']?.(req, res) ?? 'Unknown IP';
  const method = tokens.method?.(req, res) ?? "Unknown Method";
  const url = tokens.url?.(req, res) ?? "Unknown URL";
  const status = tokens.status?.(req, res) ?? "Unknown Status";
  const date = tokens.date?.(req, res, 'clf') ?? "Unknown Date";
  const userAgent = tokens['user-agent']?.(req, res) ?? "Unknown User Agent";
  

  return JSON.stringify({
    ip,
    method,
    url,
    status,
    date,
    userAgent,
    body
    
  });
}, {
  stream: {
    write: (message) => {
      try {
        const log = JSON.parse(message);
        log.error(`IP: ${log.ip}, Method: ${log.method}, URL: ${log.url}, Status: ${log.status}, body: ${log.body}, Date: ${log.date}, UserAgent: ${log.userAgent},`);
      } catch {
        log.error(message);
      }
    }
  }
});



const clearLOGS = (req: Request, res: Response) => {
  const {permessions} = req.user as {permessions: string[]};
  if (permessions.includes(Permessions.LOGCLEAR)) {
    fs.unlinkSync(logFile);
    return res.status(200).json({ message: "Logs cleared successfully" });
  }
  return res.status(403).json({ message: "You don't have permission to clear logs" });
};

export  {logger , clearLOGS};
