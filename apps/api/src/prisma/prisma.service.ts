import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString || connectionString.trim().length === 0) {
      throw new Error(
        "DATABASE_URL no está seteada. Verificá apps/api/.env y que dotenv se cargue antes de iniciar Nest.",
      );
    }

    const adapter = new PrismaNeon({ connectionString });

    // Prisma 7: la conexión va por adapter (NO datasources/datasourceUrl)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}