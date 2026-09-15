import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import { configDotenv } from "dotenv";

import indexRouter from "./routes/index.rutes.js";

configDotenv();

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
];

app.use(helmet());

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(cookieParser());

const reqLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false
});

app.use("/api", reqLimiter);

const startup_time = Date.now();

const uptime = () => {
    const elapsed = Date.now() - startup_time;

    const minutes =
        Math.floor(elapsed / 1000) / 60;

    return minutes.toFixed() <= 0
        ? "menos de 1 minuto."
        : `${minutes.toFixed()} minutos.`;
};

app.get("/api/health", (req, res) => {
    return res.json({
        success: true,
        Uptime: `Ativo a ${uptime()}`
    });
});

app.use("/api", indexRouter);

export default app;