import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DISCORD_TOKEN: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  MYSQL_HOST: z.string().min(1),
  MYSQL_PORT: z.coerce.number().int().positive().default(3306),
  MYSQL_USER: z.string().min(1),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string().min(1),
  RATE_LIMIT_USER_BURST: z.coerce.number().int().positive().default(6),
  RATE_LIMIT_USER_WINDOW_MS: z.coerce.number().int().positive().default(10_000),
  IDEMPOTENCY_TTL_MS: z.coerce.number().int().positive().default(86_400_000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info')
});

export type Env = z.infer<typeof EnvSchema>;
export const env: Env = EnvSchema.parse(process.env);
