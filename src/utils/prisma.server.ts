import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

prisma.$connect();

export { prisma };
