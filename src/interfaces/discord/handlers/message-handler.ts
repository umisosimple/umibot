import type { Message } from 'discord.js';
import { withTransaction } from '../../../core/tx-manager.js';
import { getOrCreateUserByDiscordId } from '../../../repositories/user-repository.js';
import { ensureNewPlayerState } from '../../../services/bootstrap-service.js';
import { getBalance } from '../../../services/economy-service.js';
import { runGather } from '../../../services/gather-service.js';
import { AppError } from '../../../domain/errors/app-error.js';
import { errorEmbed, successEmbed } from '../embeds/basic-embeds.js';

const PREFIX = 'umi';
const processedMessageIds = new Set<string>();

export async function handlePrefixMessage(message: Message): Promise<void> {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  if (processedMessageIds.has(message.id)) return;
  processedMessageIds.add(message.id);

  const raw = message.content.slice(PREFIX.length).trim();
  const [cmd] = raw.split(/\s+/);
  const command = cmd?.toLowerCase() ?? '';

  try {
    const text = await withTransaction(async (conn) => {
      const userId = await getOrCreateUserByDiscordId(conn, message.author.id);
      await ensureNewPlayerState(conn, userId);

      if (command === 'cash' || command === 'balance') {
        const balance = await getBalance(conn, userId);
        return `Bạn đang có **${balance.toLocaleString('vi-VN')} umicoin**.`;
      }

      if (command === 'hunt') {
        return runGather(conn, userId, 'hunt');
      }

      if (command === 'fish') {
        return runGather(conn, userId, 'fish');
      }

      throw new AppError('UMI-CMD-404', 'Lệnh không tồn tại. Dùng `umihelp` để xem danh sách.');
    });

    await message.reply({ embeds: [successEmbed('Umi Bot', text)] });
  } catch (error) {
    const desc = error instanceof AppError ? `${error.message}\nMã lỗi: ${error.code}` : 'Đã có lỗi không xác định.';
    await message.reply({ embeds: [errorEmbed('Thao tác thất bại', desc)] });
  } finally {
    if (processedMessageIds.size > 5000) {
      processedMessageIds.clear();
    }
  }
}
