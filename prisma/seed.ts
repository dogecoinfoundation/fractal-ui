import { type Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

function randomDate() {
  const start = new Date(1983, 5, 12);
  const end = new Date(2025, 11, 31);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export async function main() {}

main();
