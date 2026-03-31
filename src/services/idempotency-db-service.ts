import type { PoolConnection, RowDataPacket } from 'mysql2/promise';

interface IdempotencyRow extends RowDataPacket {
  response_json: string;
}

export async function loadIdempotentResponse(conn: PoolConnection, key: string): Promise<string | null> {
  const [rows] = await conn.query<IdempotencyRow[]>(
    `SELECT CAST(response_json AS CHAR) AS response_json
     FROM idempotency_records
     WHERE idem_key = ? AND expires_at > UTC_TIMESTAMP(3)
     LIMIT 1`,
    [key]
  );
  return rows[0]?.response_json ?? null;
}

export async function saveIdempotentResponse(
  conn: PoolConnection,
  key: string,
  responseText: string,
  ttlSeconds = 300
): Promise<void> {
  await conn.query(
    `INSERT INTO idempotency_records (idem_key, response_json, expires_at, created_at)
     VALUES (?, JSON_OBJECT('text', ?), DATE_ADD(UTC_TIMESTAMP(3), INTERVAL ? SECOND), UTC_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE response_json = VALUES(response_json), expires_at = VALUES(expires_at)`,
    [key, responseText, ttlSeconds]
  );
}

export function extractIdempotentText(rawJson: string): string {
  try {
    const parsed = JSON.parse(rawJson) as { text?: string };
    return parsed.text ?? '';
  } catch {
    return '';
  }
}
