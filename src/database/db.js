import "dotenv/config"
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;
const sql = postgres(url, { ssl: "require" });

export default sql;

