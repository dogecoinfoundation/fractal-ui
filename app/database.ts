import path from "node:path";
import Database from "better-sqlite3";

export const getDatabase = () => {
  const dbPath = path.join(process.cwd(), "database.sqlite");
  const db = new Database(dbPath);

  return db;
};
