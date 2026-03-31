import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { AppError } from '../domain/errors/app-error.js';

interface CooldownRow extends RowDataPacket {
  expires_at: Date;
}

export async function enforceCooldown(
  conn: PoolConnection,
  userId: number,
  commandKey: string,
  cooldownSeconds: number
): Promise<void> {
  const [rows] = await conn.query<CooldownRow[]>(
    'SELECT expires_at FROM cooldowns WHERE user_id = ? AND command_key = ? LIMIT 1',
    [userId, commandKey]
  );

  const now = Date.now();
  const existing = rows[0];
  if (existing && new Date(existing.expires_at).getTime() > now) {
    throw new AppError('UMI-CD-429', `Lệnh đang hồi chiêu. Vui lòng thử lại sau ${cooldownSeconds}s.`);
  }

  await conn.query(
    `INSERT INTO cooldowns (user_id, command_key, expires_at, created_at)
     VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(3), INTERVAL ? SECOND), UTC_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at)`,
    [userId, commandKey, cooldownSeconds]
  );
}
