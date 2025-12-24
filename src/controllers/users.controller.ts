import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import {
  createUser,
  getAllUsers,
  getUserByGlobalId,
  updateUser,
  deleteUser,
} from "../services/users.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, password, global_id } = req.body;
    const user = await createUser({ name, password, global_id });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getByGlobalId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserByGlobalId(req.params.global_id);
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, password } = req.body;
    const existing = await getUserByGlobalId(req.params.global_id);
    if (!existing) throw new AppError("User not found", 404);
    const user = await updateUser(req.params.global_id, { name, password });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteByGlobalId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existing = await getUserByGlobalId(req.params.global_id);
    if (!existing) throw new AppError("User not found", 404);
    await deleteUser(req.params.global_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
