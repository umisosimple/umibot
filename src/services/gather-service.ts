import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { AppError } from '../domain/errors/app-error.js';
import { resolveGather, type GatherType } from '../domain/game-content.js';

interface InventoryRow extends RowDataPacket {
  inventory_id: number;
  version: number;
}

export async function runGather(conn: PoolConnection, userId: number, type: GatherType): Promise<string> {
  const result = resolveGather(type, 0.6);
  if (!result) {
    return type === 'hunt' ? 'Săn thất bại. Bạn chưa thu được vật phẩm nào.' : 'Câu thất bại. Bạn chưa thu được vật phẩm nào.';
  }

  const [invRows] = await conn.query<InventoryRow[]>('SELECT inventory_id, version FROM inventories WHERE user_id = ? FOR UPDATE', [userId]);
  const inventory = invRows[0];
  if (!inventory) throw new AppError('UMI-INV-404', 'Không tìm thấy kho đồ của bạn.');

  await conn.query(
    `INSERT INTO inventory_items (inventory_id, item_code, qty, created_at, updated_at)
     VALUES (?, ?, ?, UTC_TIMESTAMP(3), UTC_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty), updated_at = UTC_TIMESTAMP(3)`,
    [inventory.inventory_id, result.itemCode, result.quantity]
  );

  await conn.query('UPDATE inventories SET version = version + 1, updated_at = UTC_TIMESTAMP(3) WHERE inventory_id = ?', [inventory.inventory_id]);

  return `${type === 'hunt' ? 'Săn' : 'Câu'} thành công: +1 ${result.itemCode} (giá bán gợi ý ${result.sellValue} umicoin).`;
}
