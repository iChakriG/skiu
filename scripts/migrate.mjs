/**
 * Run Supabase migrations (create tables and seed data) via direct Postgres connection.
 * Run from project root: node scripts/migrate.mjs
 * Requires .env with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_DB_PASSWORD (or DATABASE_URL).
 * Get the database password from Supabase Dashboard → Project Settings → Database.
 */

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");
const migrationsDir = join(root, "supabase", "migrations");

if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const eq = line.indexOf("=");
    if (eq > 0 && !line.trimStart().startsWith("#")) {
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  });
}

function getConnectionStrings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const password = process.env.SUPABASE_DB_PASSWORD;
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) return [databaseUrl];
  if (!url || !password) {
    console.error(
      "Missing SUPABASE_DB_PASSWORD or DATABASE_URL in .env. Get the database password from Supabase Dashboard → Project Settings → Database."
    );
    process.exit(1);
  }
  const projectRef = new URL(url).hostname.split(".")[0];
  const encoded = encodeURIComponent(password);
  const regions = ["ap-southeast-1", "us-east-1", "eu-west-1", "ap-northeast-1"];
  return [
    `postgresql://postgres:${encoded}@db.${projectRef}.supabase.co:5432/postgres`,
    ...regions.map((r) => `postgresql://postgres.${projectRef}:${encoded}@aws-0-${r}.pooler.supabase.com:6543/postgres`),
  ];
}

async function main() {
  const schemaSql = readFileSync(join(migrationsDir, "001_initial_schema.sql"), "utf8");
  const seedSql = readFileSync(join(migrationsDir, "002_seed_data.sql"), "utf8");
  const connectionStrings = getConnectionStrings();
  let lastErr;
  for (const connectionString of connectionStrings) {
    const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      await client.query(schemaSql);
      console.log("Applied 001_initial_schema.sql");
      await client.query(seedSql);
      console.log("Applied 002_seed_data.sql");
      console.log("Migrations complete.");
      await client.end();
      return;
    } catch (err) {
      lastErr = err;
      await client.end().catch(() => {});
    }
  }
  console.error("Migration failed:", lastErr?.message || lastErr);
  process.exit(1);
}

main();
