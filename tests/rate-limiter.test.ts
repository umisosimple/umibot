import { describe, expect, test } from 'vitest';
import { SlidingWindowRateLimiter } from '../src/core/rate-limiter.js';

describe('SlidingWindowRateLimiter', () => {
  test('cho phép trong giới hạn burst và chặn vượt ngưỡng', () => {
    const limiter = new SlidingWindowRateLimiter(2, 10_000);
    expect(limiter.allow('u1:cmd')).toBe(true);
    expect(limiter.allow('u1:cmd')).toBe(true);
    expect(limiter.allow('u1:cmd')).toBe(false);
  });
});
