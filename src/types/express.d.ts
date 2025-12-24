import "express";
import { accesses as AccessModel } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      serviceAccess?: AccessModel;
      sidUser?: { global_id: string; tokenPayload: JwtPayload };
    }
  }
}

export {};
