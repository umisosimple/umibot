import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { AppError } from '../domain/errors/app-error.js';

interface WalletRow extends RowDataPacket {
  balance: number;
}

export async function getBalance(conn: PoolConnection, userId: number): Promise<number> {
  const [rows] = await conn.query<WalletRow[]>('SELECT balance FROM wallets WHERE user_id = ? LIMIT 1', [userId]);
  if (!rows[0]) throw new AppError('UMI-ECO-404', 'Không tìm thấy ví người dùng.');
  return Number(rows[0].balance);
}

export async function transferUmicoin(
  conn: PoolConnection,
  fromUserId: number,
  toUserId: number,
  amount: number,
  feeRate = 0.12
): Promise<{ fee: number; net: number }> {
  if (fromUserId === toUserId) throw new AppError('UMI-ECO-400', 'Không thể chuyển cho chính bạn.');
  if (amount <= 0) throw new AppError('UMI-ECO-400', 'Số tiền chuyển phải lớn hơn 0.');

  const [fromRows] = await conn.query<WalletRow[]>('SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE', [fromUserId]);
  const [toRows] = await conn.query<WalletRow[]>('SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE', [toUserId]);

  if (!fromRows[0] || !toRows[0]) throw new AppError('UMI-ECO-404', 'Không tìm thấy ví nguồn hoặc ví đích.');

  const fee = Math.max(100, Math.floor(amount * feeRate));
  const debit = amount + fee;
  const fromBalance = Number(fromRows[0].balance);
  if (fromBalance < debit) throw new AppError('UMI-ECO-402', 'Số dư không đủ để chuyển và trả phí.');

  const net = amount;
  const nextFrom = fromBalance - debit;
  const nextTo = Number(toRows[0].balance) + net;

  await conn.query('UPDATE wallets SET balance = ?, updated_at = UTC_TIMESTAMP(3) WHERE user_id = ?', [nextFrom, fromUserId]);
  await conn.query('UPDATE wallets SET balance = ?, updated_at = UTC_TIMESTAMP(3) WHERE user_id = ?', [nextTo, toUserId]);

  await conn.query(
    'INSERT INTO economy_transactions (tx_id, user_id, type, amount, balance_after, ref_id, created_at) VALUES (UUID(), ?, ?, ?, ?, ?, UTC_TIMESTAMP(3))',
    [fromUserId, 'transfer_out', -debit, nextFrom, `to:${toUserId}`]
  );
  await conn.query(
    'INSERT INTO economy_transactions (tx_id, user_id, type, amount, balance_after, ref_id, created_at) VALUES (UUID(), ?, ?, ?, ?, ?, UTC_TIMESTAMP(3))',
    [toUserId, 'transfer_in', net, nextTo, `from:${fromUserId}`]
  );

  return { fee, net };
}
