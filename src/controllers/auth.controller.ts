import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../middlewares/errorHandler";
import { validateAccess } from "../services/accesses.service";
import { getUserByGlobalId } from "../services/users.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    const apiKey =
      typeof req.headers["api-key"] === "string"
        ? req.headers["api-key"]
        : null;
    const serviceToken = bearerToken || apiKey;
    if (!serviceToken) {
      res.status(401).json({ error: "Missing service token" });
      return;
    }

    const origin =
      (req.headers.origin as string | undefined) ||
      (req.headers["x-service-endpoint"] as string | undefined);

    if (!origin) {
      res.status(400).json({ error: "origin is required" });
      return;
    }

    const validation = await validateAccess(serviceToken, origin);
    if (!validation.valid) {
      res.status(403).json({ error: "Invalid service token or origin" });
      return;
    }

    const { global_id } = req.body || {};
    if (!global_id) {
      res.status(400).json({ error: "global_id is required" });
      return;
    }

    const user = await getUserByGlobalId(global_id);
    if (!user) throw new AppError("User not found", 404);

    const token = jwt.sign(
      { sub: user.global_id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );

    res.json({ token, token_type: "Bearer" });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByGlobalId(req.sidUser?.global_id || "");
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
