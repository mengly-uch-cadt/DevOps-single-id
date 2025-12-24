"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const notFound_1 = require("./middlewares/notFound");
const accesses_service_1 = require("./services/accesses.service");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            (0, accesses_service_1.isAllowedOrigin)(origin)
                .then((allowed) => {
                if (allowed) {
                    callback(null, true);
                    return;
                }
                callback(new Error("Not allowed by CORS"));
            })
                .catch((err) => callback(err));
        },
        credentials: true,
    }));
    app.use((0, pino_http_1.default)({
        level: process.env.LOG_LEVEL || "info",
        transport: process.env.NODE_ENV === "development"
            ? {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                    ignore: "pid,hostname",
                },
            }
            : undefined,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/health", (_req, res) => {
        res.json({ status: "ok" });
    });
    app.use("/api", routes_1.default);
    app.use(notFound_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map