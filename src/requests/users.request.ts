import { Request, Response, NextFunction } from "express";
import { UuidUtil } from "../utils/uuid";

export const createRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.body = {
    global_id: req.body.global_id || UuidUtil.generate(),
    name: req.body.name,
    password: req.body.password,
  };
  next();
};

export const updateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const data: any = {};
  if (req.body.name !== undefined) data.name = req.body.name;
  if (req.body.password !== undefined) data.password = req.body.password;
  req.body = data;
  next();
};

export const globalIdRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.params.global_id = req.params.global_id;
  next();
};
