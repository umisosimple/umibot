import { describe, expect, test } from 'vitest';
import { extractIdempotentText } from '../src/services/idempotency-db-service.js';

describe('extractIdempotentText', () => {
  test('đọc text từ json hợp lệ', () => {
    expect(extractIdempotentText('{"text":"xin chào"}')).toBe('xin chào');
  });

  test('json lỗi trả chuỗi rỗng', () => {
    expect(extractIdempotentText('{bad json')).toBe('');
  });
});
