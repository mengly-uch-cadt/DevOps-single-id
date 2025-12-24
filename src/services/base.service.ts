import { PrismaClient } from '@prisma/client';

export class BaseService {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create<T>(model: any, data: any): Promise<T> {
    const now = new Date();
    return await model.create({
      data: {
        ...data,
        created_at: now,
        updated_at: now,
      },
    });
  }

  async findById<T>(model: any, id: number): Promise<T | null> {
    return await model.findUnique({ where: { id } });
  }

  async findByGlobalId<T>(model: any, global_id: string): Promise<T | null> {
    return await model.findUnique({ where: { global_id } });
  }

  async findOne<T>(model: any, where: any): Promise<T | null> {
    return await model.findUnique({ where });
  }

  async findMany<T>(model: any, options?: any): Promise<T[]> {
    return await model.findMany(options);
  }

  async update<T>(model: any, id: number, data: any): Promise<T> {
    return await model.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async delete(model: any, id: number): Promise<void> {
    await model.delete({ where: { id } });
  }
}

export const baseService = new BaseService();
