import { mintsDataSql, mintsTableSql } from "@/sql/mints";
import { getAllRows, getDatabase } from "./app/database";

export async function register() {
  const db = getDatabase();

  console.log("Registering mints table...");
  db.exec(mintsTableSql);

  const mintsData = getAllRows("mints");

  if (mintsData.length === 0) {
    console.log("No mints sample data found! Inserting sample data.");
    db.exec(mintsDataSql);
  }
}
