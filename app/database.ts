import Database from "better-sqlite3";

export const getDatabase = () => {
  const dbPath = "database.sqlite";
  const db = new Database(dbPath);

  return db;
};

export const getAllRows = (table: string) =>
  getDatabase().prepare(`SELECT * FROM ${table}`).all();

export const getRowByColumnValue = (
  table: string,
  columnName: string,
  value: string,
) =>
  getDatabase()
    .prepare(`SELECT * FROM ${table} WHERE ${columnName} = ?`)
    .get(value);
