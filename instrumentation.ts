import { readFileSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export async function register() {
  const dbPath = path.join(process.cwd(), "database.sqlite");
  const db = new Database(dbPath);

  console.log("Registering mints table...");
  const tableSqlPath = path.join(process.cwd(), "sql", "mints-table.sql");
  const tableSqlContent = readFileSync(tableSqlPath, "utf-8");
  db.exec(tableSqlContent);

  const mintsData = db.prepare("SELECT * FROM mints").all();

  if (mintsData.length === 0) {
    console.log("No mints sample data found. Inserting sample data.");
    const dataSqlPath = path.join(process.cwd(), "sql", "mints-data.sql");
    const dataSqlContents = readFileSync(dataSqlPath, "utf-8");
    db.exec(dataSqlContents);
  }
}
