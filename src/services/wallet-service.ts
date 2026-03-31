import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { AppError } from '../domain/errors/app-error.js';

interface WalletRow extends RowDataPacket {
  balance: number;
}

export async function creditWallet(
  conn: PoolConnection,
  userId: string,
  amount: number,
  refId: string
): Promise<void> {
  if (amount <= 0) throw new AppError('UMI-ECO-400', 'Số tiền cộng phải lớn hơn 0.');

  const [rows] = await conn.query<WalletRow[]>(
    'SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE',
    [userId]
  );

  if (!rows[0]) throw new AppError('UMI-ECO-404', 'Không tìm thấy ví người dùng.');

  const nextBalance = Number(rows[0].balance) + amount;

  await conn.query('UPDATE wallets SET balance = ?, updated_at = UTC_TIMESTAMP(3) WHERE user_id = ?', [nextBalance, userId]);
  await conn.query(
    'INSERT INTO economy_transactions (tx_id, user_id, type, amount, balance_after, ref_id, created_at) VALUES (UUID(), ?, ?, ?, ?, ?, UTC_TIMESTAMP(3))',
    [userId, 'credit', amount, nextBalance, refId]
  );
}
