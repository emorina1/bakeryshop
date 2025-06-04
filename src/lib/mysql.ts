// src/lib/mysql.ts
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ose "yourPassword"
  database: "bakerydb",
});

export default db;
