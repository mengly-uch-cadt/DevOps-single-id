import { Request, Response, NextFunction } from "express";
import { getAccessByToken } from "../services/accesses.service";

export const authenticateServiceToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const apiKey =
    typeof req.headers["api-key"] === "string" ? req.headers["api-key"] : null;
  const token = bearerToken || apiKey;

  if (!token) {
    res.status(401).json({ error: "Missing service token" });
    return;
  }

  try {
    const access = await getAccessByToken(token);
    if (!access) {
      res.status(403).json({ error: "Invalid service token" });
      return;
    }
    req.serviceAccess = access;
    next();
  } catch (err) {
    next(err);
  }
};
