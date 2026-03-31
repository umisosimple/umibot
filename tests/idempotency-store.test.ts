import { describe, expect, test, vi } from 'vitest';
import { InMemoryIdempotencyStore } from '../src/core/idempotency-store.js';

describe('InMemoryIdempotencyStore', () => {
  test('lưu và lấy được bản ghi trong TTL', () => {
    const store = new InMemoryIdempotencyStore(1000);
    store.set('k1', { ok: true });
    expect(store.get('k1')).toEqual({ ok: true });
  });

  test('tự hết hạn sau TTL', () => {
    vi.useFakeTimers();
    const store = new InMemoryIdempotencyStore(1000);
    store.set('k2', { ok: true });
    vi.advanceTimersByTime(1001);
    expect(store.get('k2')).toBeUndefined();
    vi.useRealTimers();
  });
});
