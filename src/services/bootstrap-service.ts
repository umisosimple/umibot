import type { PoolConnection } from 'mysql2/promise';

export async function ensureNewPlayerState(conn: PoolConnection, userId: number): Promise<void> {
  await conn.query('INSERT IGNORE INTO profiles (user_id, level, exp, created_at, updated_at) VALUES (?, 1, 0, UTC_TIMESTAMP(3), UTC_TIMESTAMP(3))', [userId]);
  await conn.query('INSERT IGNORE INTO wallets (user_id, balance, updated_at) VALUES (?, 0, UTC_TIMESTAMP(3))', [userId]);
  await conn.query('INSERT IGNORE INTO inventories (user_id, version, created_at, updated_at) VALUES (?, 1, UTC_TIMESTAMP(3), UTC_TIMESTAMP(3))', [userId]);
}
