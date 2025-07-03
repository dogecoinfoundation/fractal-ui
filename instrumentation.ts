import Database from "better-sqlite3";
import { mintsDataSql, mintsTableSql } from "@/sql/mints";

export async function register() {
  const db = new Database("database.sqlite");

  console.log("Registering mints table...");
  db.exec(mintsTableSql);

  const mintsData = db.prepare("SELECT * FROM mints").all();

  if (mintsData.length === 0) {
    console.log("No mints sample data found! Inserting sample data.");
    db.exec(mintsDataSql);
  }
}
