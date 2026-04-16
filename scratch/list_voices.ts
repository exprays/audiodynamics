import "dotenv/config";
import { PrismaClient } from ".././src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const env = envSchema.parse(process.env);
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const voices = await prisma.voice.findMany({
    take: 5,
    select: { id: true, name: true }
  });
  console.log(JSON.stringify(voices, null, 2));
}

main().finally(() => prisma.$disconnect());
