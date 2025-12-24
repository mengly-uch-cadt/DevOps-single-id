import { Request, Response, NextFunction } from "express";
import { createAccess, validateAccess } from "../services/accesses.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allow_endpoint } = req.body;
    const access = await createAccess(allow_endpoint);
    res.status(201).json(access);
  } catch (error) {
    next(error);
  }
};

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth = req.headers.authorization || "";
    const bearerToken = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    const apiKey =
      typeof req.headers["api-key"] === "string"
        ? req.headers["api-key"]
        : null;
    const token = bearerToken || apiKey;
    const { endpoint } = req.body || {};

    if (!token) {
      res.status(401).json({ error: "Missing service token" });
      return;
    }

    const result = await validateAccess(token, endpoint);
    if (!result.valid) {
      res.status(403).json({ valid: false });
      return;
    }

    res.json({ valid: true, access: result.access });
  } catch (error) {
    next(error);
  }
};
