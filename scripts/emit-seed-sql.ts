import { players, staff, partners } from "../lib/site-data";
import {
  buildRosterSeedRows,
  buildStaffSeedRows,
  buildPartnerSeedRows
} from "../lib/dashboard-seed";

function sqlValue(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "ARRAY[]::text[]";
    const items = value.map((v) => `'${String(v).replace(/'/g, "''")}'`).join(",");
    return `ARRAY[${items}]::text[]`;
  }
  if (value instanceof Date) return `'${value.toISOString()}'`;
  return `'${String(value).replace(/'/g, "''")}'`;
}

function emitInserts(table: string, rows: Array<Record<string, unknown>>) {
  if (!rows.length) return;
  const columns = Object.keys(rows[0]);
  const lines: string[] = [];
  lines.push(`-- ${rows.length} rows into ${table}`);
  for (const row of rows) {
    const values = columns.map((col) => sqlValue(row[col])).join(", ");
    lines.push(
      `insert into public.${table} (${columns.join(", ")}) values (${values});`
    );
  }
  console.log(lines.join("\n"));
}

emitInserts("roster_entries", buildRosterSeedRows(players));
emitInserts("staff_entries", buildStaffSeedRows(staff));
emitInserts("partner_entries", buildPartnerSeedRows(partners));
