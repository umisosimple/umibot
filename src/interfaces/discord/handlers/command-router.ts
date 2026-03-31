import { AppError } from '../../../domain/errors/app-error.js';
import { env } from '../../../config/env.js';
import { InMemoryIdempotencyStore } from '../../../core/idempotency-store.js';
import { SlidingWindowRateLimiter } from '../../../core/rate-limiter.js';

export interface CommandContext {
  userId: string;
  commandName: string;
  idempotencyKey: string;
}

export interface CommandResult {
  message: string;
}

export type CommandHandler = (ctx: CommandContext) => Promise<CommandResult>;

const idempotency = new InMemoryIdempotencyStore(env.IDEMPOTENCY_TTL_MS);
const limiter = new SlidingWindowRateLimiter(env.RATE_LIMIT_USER_BURST, env.RATE_LIMIT_USER_WINDOW_MS);

export async function runCommand(ctx: CommandContext, handler: CommandHandler): Promise<CommandResult> {
  const rateKey = `${ctx.userId}:${ctx.commandName}`;
  if (!limiter.allow(rateKey)) {
    throw new AppError('UMI-RATE-429', 'Bạn thao tác quá nhanh, vui lòng thử lại sau vài giây.');
  }

  const cached = idempotency.get(ctx.idempotencyKey);
  if (cached) return cached as CommandResult;

  const result = await handler(ctx);
  idempotency.set(ctx.idempotencyKey, result);
  return result;
}
