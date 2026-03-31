import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { AppError } from '../domain/errors/app-error.js';
import { getItemDefinition, isCommonOrUncommon } from '../domain/items.js';

interface InventoryRow extends RowDataPacket {
  inventory_id: number;
}

interface ItemRow extends RowDataPacket {
  item_row_id: number;
  item_code: string;
  qty: number;
  is_locked: number;
  is_equipped: number;
  is_quest_item: number;
}

export async function inventorySummary(conn: PoolConnection, userId: number): Promise<string> {
  const [invRows] = await conn.query<InventoryRow[]>('SELECT inventory_id FROM inventories WHERE user_id = ? LIMIT 1', [userId]);
  if (!invRows[0]) throw new AppError('UMI-INV-404', 'Không tìm thấy kho đồ.');

  const [itemRows] = await conn.query<ItemRow[]>(
    'SELECT item_code, qty, is_locked, is_equipped FROM inventory_items WHERE inventory_id = ? ORDER BY updated_at DESC LIMIT 10',
    [invRows[0].inventory_id]
  );

  if (itemRows.length === 0) return 'Kho đồ của bạn đang trống.';

  const lines = itemRows.map((row, idx) => {
    const item = getItemDefinition(row.item_code);
    const name = item?.name ?? row.item_code;
    const flags = [row.is_locked ? '🔒' : '', row.is_equipped ? '🛡️' : ''].join('');
    return `${idx + 1}. ${name} x${row.qty} ${flags}`.trim();
  });

  return `Kho đồ hiện tại:\n${lines.join('\n')}`;
}

export async function sellItemByCode(conn: PoolConnection, userId: number, itemCode: string, qty: number): Promise<string> {
  if (qty <= 0) throw new AppError('UMI-INV-400', 'Số lượng bán phải lớn hơn 0.');

  const itemDef = getItemDefinition(itemCode);
  if (!itemDef) throw new AppError('UMI-INV-404', 'Vật phẩm không tồn tại trong danh mục bán.');

  const [invRows] = await conn.query<InventoryRow[]>('SELECT inventory_id FROM inventories WHERE user_id = ? FOR UPDATE', [userId]);
  if (!invRows[0]) throw new AppError('UMI-INV-404', 'Không tìm thấy kho đồ.');

  const invId = invRows[0].inventory_id;
  const [rows] = await conn.query<ItemRow[]>(
    `SELECT item_row_id, item_code, qty, is_locked, is_equipped, is_quest_item
     FROM inventory_items WHERE inventory_id = ? AND item_code = ? FOR UPDATE`,
    [invId, itemCode]
  );

  const row = rows[0];
  if (!row) throw new AppError('UMI-INV-404', 'Bạn không sở hữu vật phẩm này.');
  if (row.is_locked) throw new AppError('UMI-INV-423', 'Vật phẩm đang khóa, không thể bán.');
  if (row.is_equipped) throw new AppError('UMI-INV-423', 'Vật phẩm đang trang bị, không thể bán.');
  if (row.is_quest_item) throw new AppError('UMI-INV-423', 'Vật phẩm nhiệm vụ, không thể bán.');
  if (row.qty < qty) throw new AppError('UMI-INV-400', 'Số lượng sở hữu không đủ để bán.');

  const revenue = itemDef.sellValue * qty;
  const remain = row.qty - qty;

  if (remain === 0) {
    await conn.query('DELETE FROM inventory_items WHERE item_row_id = ?', [row.item_row_id]);
  } else {
    await conn.query('UPDATE inventory_items SET qty = ?, updated_at = UTC_TIMESTAMP(3) WHERE item_row_id = ?', [remain, row.item_row_id]);
  }

  await conn.query('UPDATE inventories SET version = version + 1, updated_at = UTC_TIMESTAMP(3) WHERE inventory_id = ?', [invId]);
  await conn.query('UPDATE wallets SET balance = balance + ?, updated_at = UTC_TIMESTAMP(3) WHERE user_id = ?', [revenue, userId]);
  await conn.query(
    'INSERT INTO economy_transactions (tx_id, user_id, type, amount, balance_after, ref_id, created_at) SELECT UUID(), ?, ?, ?, balance, ?, UTC_TIMESTAMP(3) FROM wallets WHERE user_id = ?',
    [userId, 'sell_item', revenue, `sell:${itemCode}`, userId]
  );

  return `Đã bán ${qty} ${itemDef.name}, nhận ${revenue.toLocaleString('vi-VN')} umicoin.`;
}

export async function sellAllCommon(conn: PoolConnection, userId: number): Promise<string> {
  const [invRows] = await conn.query<InventoryRow[]>('SELECT inventory_id FROM inventories WHERE user_id = ? FOR UPDATE', [userId]);
  if (!invRows[0]) throw new AppError('UMI-INV-404', 'Không tìm thấy kho đồ.');

  const invId = invRows[0].inventory_id;
  const [rows] = await conn.query<ItemRow[]>(
    `SELECT item_row_id, item_code, qty, is_locked, is_equipped, is_quest_item
     FROM inventory_items WHERE inventory_id = ? FOR UPDATE`,
    [invId]
  );

  let totalRevenue = 0;
  let totalQty = 0;

  for (const row of rows) {
    if (row.is_locked || row.is_equipped || row.is_quest_item) continue;
    if (!isCommonOrUncommon(row.item_code)) continue;

    const def = getItemDefinition(row.item_code);
    if (!def) continue;

    totalRevenue += row.qty * def.sellValue;
    totalQty += row.qty;
    await conn.query('DELETE FROM inventory_items WHERE item_row_id = ?', [row.item_row_id]);
  }

  if (totalQty === 0) {
    return 'Không có vật phẩm thường/phổ biến hợp lệ để bán hàng loạt.';
  }

  await conn.query('UPDATE inventories SET version = version + 1, updated_at = UTC_TIMESTAMP(3) WHERE inventory_id = ?', [invId]);
  await conn.query('UPDATE wallets SET balance = balance + ?, updated_at = UTC_TIMESTAMP(3) WHERE user_id = ?', [totalRevenue, userId]);
  await conn.query(
    'INSERT INTO economy_transactions (tx_id, user_id, type, amount, balance_after, ref_id, created_at) SELECT UUID(), ?, ?, ?, balance, ?, UTC_TIMESTAMP(3) FROM wallets WHERE user_id = ?',
    [userId, 'sell_bulk', totalRevenue, 'sell:all-common', userId]
  );

  return `Đã bán hàng loạt ${totalQty} vật phẩm, nhận ${totalRevenue.toLocaleString('vi-VN')} umicoin.`;
}
