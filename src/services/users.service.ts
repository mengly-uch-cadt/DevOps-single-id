import crypto from "crypto";
import { baseService } from "./base.service";
import { UuidUtil } from "../utils/uuid";

const selectUser = {
  id: true,
  global_id: true,
  name: true,
  created_at: true,
  updated_at: true,
};

const generateHash = (length = 24) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
};

export const createUser = async (data: {
  name: string;
  password: string;
  global_id?: string;
}) => {
  const global_id = data.global_id || UuidUtil.generate();
  const hash = generateHash();
  const user = await baseService.prisma.users.create({
    data: {
      global_id,
      name: data.name,
      hash,
      created_at: new Date(),
      updated_at: new Date(),
    },
    select: selectUser,
  });
  return user;
};

export const getUserByGlobalId = async (global_id: string) => {
  return await baseService.prisma.users.findUnique({
    where: { global_id },
    select: selectUser,
  });
};

export const getAllUsers = async () => {
  return await baseService.prisma.users.findMany({
    select: selectUser,
    orderBy: { id: "desc" },
  });
};

export const updateUser = async (
  global_id: string,
  data: { name?: string; password?: string },
) => {
  const hash = data.password ? generateHash() : undefined;
  return await baseService.prisma.users.update({
    where: { global_id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(hash !== undefined ? { hash } : {}),
      updated_at: new Date(),
    },
    select: selectUser,
  });
};

export const deleteUser = async (global_id: string) => {
  await baseService.prisma.users.delete({ where: { global_id } });
};
