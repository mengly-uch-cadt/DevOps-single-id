import crypto from "crypto";
import { baseService } from "./base.service";
import { UuidUtil } from "../utils/uuid";

const selectAccess = {
  id: true,
  global_id: true,
  allow_endpoint: true,
  token: true,
  created_at: true,
  updated_at: true,
};

const generateToken = () =>
  crypto.randomBytes(192).toString("base64url").slice(0, 255);

export const createAccess = async (allow_endpoint: string) => {
  const token = generateToken();
  const global_id = UuidUtil.generate();
  const access = await baseService.prisma.accesses.create({
    data: {
      global_id,
      allow_endpoint,
      token,
      created_at: new Date(),
      updated_at: new Date(),
    },
    select: selectAccess,
  });

  return {
    token: access.token,
    global_id: access.global_id,
    allow_endpoint: access.allow_endpoint,
  };
};

export const getAccessByToken = async (token: string) => {
  return await baseService.prisma.accesses.findUnique({
    where: { token },
    select: selectAccess,
  });
};

export const validateAccess = async (token: string, endpoint?: string) => {
  const access = await getAccessByToken(token);
  if (!access) return { valid: false };
  if (endpoint && access.allow_endpoint !== endpoint) return { valid: false };
  return { valid: true, access };
};

export const isAllowedOrigin = async (origin: string) => {
  const access = await baseService.prisma.accesses.findFirst({
    where: { allow_endpoint: origin },
    select: { id: true },
  });
  return Boolean(access);
};
