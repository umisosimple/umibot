import { createClient } from './bootstrap/create-client.js';
import { env } from './config/env.js';
import { logger } from './infrastructure/logging/logger.js';
import { handlePrefixMessage } from './interfaces/discord/handlers/message-handler.js';

async function main(): Promise<void> {
  const client = createClient();

  client.once('ready', () => {
    logger.info({ bot: client.user?.tag }, 'Umi Bot đã sẵn sàng.');
  });

  client.on('messageCreate', async (message) => {
    await handlePrefixMessage(message);
  });

  await client.login(env.DISCORD_TOKEN);
}

main().catch((error) => {
  logger.error({ error }, 'Khởi động thất bại.');
  process.exit(1);
});
