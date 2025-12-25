import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { isAllowedOrigin } from "./services/accesses.service";

export const createApp = (): Application => {
  const app: Application = express();

  app.use(helmet());

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true);
          return;
        }

        isAllowedOrigin(origin)
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
    }),
  );

  app.use(
    pinoHttp({
      level: process.env.LOG_LEVEL || "info",
      transport:
        process.env.NODE_ENV === "development"
          ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
              ignore: "pid,hostname",
            },
          }
          : undefined,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok CD WORK" });
  });

  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
