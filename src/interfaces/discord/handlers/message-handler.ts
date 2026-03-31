import type { Message } from 'discord.js';
import { withTransaction } from '../../../core/tx-manager.js';
import { getOrCreateUserByDiscordId } from '../../../repositories/user-repository.js';
import { ensureNewPlayerState } from '../../../services/bootstrap-service.js';
import { getBalance, transferUmicoin } from '../../../services/economy-service.js';
import { runGather } from '../../../services/gather-service.js';
import { AppError } from '../../../domain/errors/app-error.js';
import { errorEmbed, successEmbed } from '../embeds/basic-embeds.js';
import { inventorySummary, sellAllCommon, sellItemByCode } from '../../../services/inventory-service.js';
import { parsePrefixInput } from './parse-prefix.js';
import { enforceCooldown } from '../../../services/cooldown-service.js';
import { extractIdempotentText, loadIdempotentResponse, saveIdempotentResponse } from '../../../services/idempotency-db-service.js';
import { parseTransferAmount } from '../../../services/parse-transfer.js';

const PREFIX = 'umi';
const processedMessageIds = new Set<string>();

function helpText(): string {
  return [
    'Lệnh hiện có:',
    '- `umicash` / `umibalance`: xem số dư umicoin',
    '- `umihunt`: săn (base success 60%)',
    '- `umifish`: câu cá (base success 60%)',
    '- `umiinventory` / `umiinv`: xem kho đồ',
    '- `umisell <item_code> <qty>`: bán vật phẩm',
    '- `umisell all-common`: bán hàng loạt vật phẩm thường/phổ biến',
    '- `umitransfer @nguoi_choi <amount>`: chuyển umicoin có phí',
    '- `umihelp`: xem trợ giúp'
  ].join('\n');
}

function buildIdemKey(message: Message, command: string, args: string[]): string {
  return `${message.author.id}:${command}:${args.join('|')}:${message.id}`;
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

      const idemKey = buildIdemKey(message, command, args);
      const cached = await loadIdempotentResponse(conn, idemKey);
      if (cached) {
        const cachedText = extractIdempotentText(cached);
        if (cachedText) return cachedText;
      }

      let response = '';

      if (command === 'cash' || command === 'balance') {
        const balance = await getBalance(conn, userId);
        response = `Bạn đang có **${balance.toLocaleString('vi-VN')} umicoin**.`;
      } else if (command === 'hunt') {
        await enforceCooldown(conn, userId, 'hunt', 5);
        response = await runGather(conn, userId, 'hunt');
      } else if (command === 'fish') {
        await enforceCooldown(conn, userId, 'fish', 5);
        response = await runGather(conn, userId, 'fish');
      } else if (command === 'inventory' || command === 'inv') {
        response = await inventorySummary(conn, userId);
      } else if (command === 'sell') {
        await enforceCooldown(conn, userId, 'sell', 2);
        if (args[0] === 'all-common') {
          response = await sellAllCommon(conn, userId);
        } else {
          if (!args[0] || !args[1]) {
            throw new AppError('UMI-INV-400', 'Thiếu tham số. Ví dụ: `umisell mat_beast_hide 2`.');
          }
          const qty = Number(args[1]);
          response = await sellItemByCode(conn, userId, args[0], qty);
        }
      } else if (command === 'transfer') {
        await enforceCooldown(conn, userId, 'transfer', 8);
        const mentioned = message.mentions.users.first();
        if (!mentioned) throw new AppError('UMI-ECO-400', 'Bạn cần mention người nhận. Ví dụ: `umitransfer @A 1000`.');

        const toUserId = await getOrCreateUserByDiscordId(conn, mentioned.id);
        await ensureNewPlayerState(conn, toUserId);

        const amount = parseTransferAmount(args[1]);
        const result = await transferUmicoin(conn, userId, toUserId, amount);
        response = `Đã chuyển ${result.net.toLocaleString('vi-VN')} umicoin cho ${mentioned.username}. Phí: ${result.fee.toLocaleString('vi-VN')}.`;
      } else if (command === 'help') {
        response = helpText();
      } else {
        throw new AppError('UMI-CMD-404', 'Lệnh không tồn tại. Dùng `umihelp` để xem danh sách.');
      }

      await saveIdempotentResponse(conn, idemKey, response);
      return response;
    });

    await message.reply({ embeds: [successEmbed('Umi Bot', text)] });
  } catch (error) {
    const desc = error instanceof AppError ? `${error.message}\nMã lỗi: ${error.code}` : 'Đã có lỗi không xác định.';
    await message.reply({ embeds: [errorEmbed('Thao tác thất bại', desc)] });
  } finally {
    if (processedMessageIds.size > 5000) processedMessageIds.clear();
  }
}
