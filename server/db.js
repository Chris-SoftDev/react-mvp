import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "./server/.env" });

const { Pool } = pg;
const db_conn = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default db_conn;
