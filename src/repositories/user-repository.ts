import type { PoolConnection, RowDataPacket } from 'mysql2/promise';

interface UserRow extends RowDataPacket {
  id: number;
}

export async function getOrCreateUserByDiscordId(conn: PoolConnection, discordId: string): Promise<number> {
  const [existing] = await conn.query<UserRow[]>('SELECT id FROM users WHERE discord_id = ? LIMIT 1', [discordId]);
  if (existing[0]) return existing[0].id;

  await conn.query('INSERT INTO users (discord_id, status, created_at) VALUES (?, ?, UTC_TIMESTAMP(3))', [discordId, 'active']);
  const [created] = await conn.query<UserRow[]>('SELECT id FROM users WHERE discord_id = ? LIMIT 1', [discordId]);
  return created[0].id;
}
