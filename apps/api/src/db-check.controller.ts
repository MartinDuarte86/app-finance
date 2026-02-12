import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Controller("db-check")
export class DbCheckController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    const userCount = await this.prisma.user.count();
    return { ok: true, userCount };
  }
}