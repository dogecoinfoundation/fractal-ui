import Database from "better-sqlite3";

export const getDatabase = () => {
  const dbPath = "database.sqlite";
  const db = new Database(dbPath);

  return db;
};

export const getAllRows = <T>(table: string): T[] =>
  getDatabase().prepare(`SELECT * FROM ${table}`).all() as T[];

export const getRowByColumnValue = <T>(
  table: string,
  columnName: string,
  value: string,
): T | null =>
  getDatabase()
    .prepare(`SELECT * FROM ${table} WHERE ${columnName} = ?`)
    .get(value) as T | null;
