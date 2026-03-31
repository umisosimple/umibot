import type { Message } from 'discord.js';
import { withTransaction } from '../../../core/tx-manager.js';
import { getOrCreateUserByDiscordId } from '../../../repositories/user-repository.js';
import { ensureNewPlayerState } from '../../../services/bootstrap-service.js';
import { getBalance } from '../../../services/economy-service.js';
import { runGather } from '../../../services/gather-service.js';
import { AppError } from '../../../domain/errors/app-error.js';
import { errorEmbed, successEmbed } from '../embeds/basic-embeds.js';
import { inventorySummary, sellAllCommon, sellItemByCode } from '../../../services/inventory-service.js';
import { parsePrefixInput } from './parse-prefix.js';

const PREFIX = 'umi';
const processedMessageIds = new Set<string>();

function helpText(): string {
  return [
    'Lệnh hiện có:',
    '- `umicash` / `umibalance`: xem số dư umicoin',
    '- `umihunt`: săn (base success 60%)',
    '- `umifish`: câu cá (base success 60%)',
    '- `umiinventory`: xem kho đồ',
    '- `umisell <item_code> <qty>`: bán vật phẩm',
    '- `umisell all-common`: bán hàng loạt vật phẩm thường/phổ biến'
  ].join('\n');
}

export async function handlePrefixMessage(message: Message): Promise<void> {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  if (processedMessageIds.has(message.id)) return;
  processedMessageIds.add(message.id);

  const raw = message.content.slice(PREFIX.length);
  const { command, args } = parsePrefixInput(raw);

  try {
    const text = await withTransaction(async (conn) => {
      const userId = await getOrCreateUserByDiscordId(conn, message.author.id);
      await ensureNewPlayerState(conn, userId);

      if (command === 'cash' || command === 'balance') {
        const balance = await getBalance(conn, userId);
        return `Bạn đang có **${balance.toLocaleString('vi-VN')} umicoin**.`;
      }

      if (command === 'hunt') return runGather(conn, userId, 'hunt');
      if (command === 'fish') return runGather(conn, userId, 'fish');
      if (command === 'inventory' || command === 'inv') return inventorySummary(conn, userId);

      if (command === 'sell') {
        if (args[0] === 'all-common') return sellAllCommon(conn, userId);
        if (!args[0] || !args[1]) {
          throw new AppError('UMI-INV-400', 'Thiếu tham số. Ví dụ: `umisell mat_beast_hide 2`.');
        }
        const qty = Number(args[1]);
        return sellItemByCode(conn, userId, args[0], qty);
      }

      if (command === 'help') return helpText();

      throw new AppError('UMI-CMD-404', 'Lệnh không tồn tại. Dùng `umihelp` để xem danh sách.');
    });

    await message.reply({ embeds: [successEmbed('Umi Bot', text)] });
  } catch (error) {
    const desc = error instanceof AppError ? `${error.message}\nMã lỗi: ${error.code}` : 'Đã có lỗi không xác định.';
    await message.reply({ embeds: [errorEmbed('Thao tác thất bại', desc)] });
  } finally {
    if (processedMessageIds.size > 5000) processedMessageIds.clear();
  }
}
