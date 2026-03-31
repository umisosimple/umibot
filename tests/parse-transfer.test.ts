import { describe, expect, test } from 'vitest';
import { parseTransferAmount } from '../src/services/parse-transfer.js';

describe('parseTransferAmount', () => {
  test('parse hợp lệ', () => {
    expect(parseTransferAmount('1000')).toBe(1000);
  });

  test('reject số âm', () => {
    expect(() => parseTransferAmount('-5')).toThrowError();
  });
});
