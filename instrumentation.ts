import { mintsDataSql, mintsTableSql } from "@/sql/mints";
import type { Mint } from "./app/api/mints/route";
import { getAllRows, getDatabase } from "./app/database";

export async function register() {
  const db = getDatabase();

  console.log("Registering mints table...");
  db.exec(mintsTableSql);

  const mintsData = getAllRows<Mint>("mints");

  if (mintsData.length === 0) {
    console.log("No mints sample data found! Inserting sample data.");
    db.exec(mintsDataSql);
  }
}
