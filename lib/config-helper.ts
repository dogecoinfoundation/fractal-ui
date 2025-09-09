import prisma from "@/lib/prisma";

export const getFractalEngineURL = async () => {
  const rows = await prisma.config.findFirst({
    where: { key: { equals: "fractal_engine_url" } },
  });

  return rows?.value;
};

export const getIndexerURL = async () => {
  const rows = await prisma.config.findFirst({
    where: { key: { equals: "indexer_url" } },
  });

  return rows?.value;
};
