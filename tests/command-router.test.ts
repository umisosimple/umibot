import { describe, expect, test } from 'vitest';

describe('runCommand', () => {
  test('idempotency trả kết quả cũ khi cùng key', async () => {
    process.env.DISCORD_TOKEN = 'x';
    process.env.DISCORD_CLIENT_ID = 'x';
    process.env.MYSQL_HOST = '127.0.0.1';
    process.env.MYSQL_USER = 'root';
    process.env.MYSQL_PASSWORD = 'pass';
    process.env.MYSQL_DATABASE = 'umibot';

    const { runCommand } = await import('../src/interfaces/discord/handlers/command-router.js');

    let called = 0;
    const ctx = { userId: 'u1', commandName: 'hunt', idempotencyKey: 'same-key' };

    const first = await runCommand(ctx, async () => {
      called += 1;
      return { message: 'ok' };
    });
    const second = await runCommand(ctx, async () => {
      called += 1;
      return { message: 'new' };
    });

    expect(first.message).toBe('ok');
    expect(second.message).toBe('ok');
    expect(called).toBe(1);
  });
});
