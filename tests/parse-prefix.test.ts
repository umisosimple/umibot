import { describe, expect, test } from 'vitest';
import { parsePrefixInput } from '../src/interfaces/discord/handlers/parse-prefix.js';

describe('parsePrefixInput', () => {
  test('parse command và args', () => {
    expect(parsePrefixInput('sell mat_beast_hide 2')).toEqual({ command: 'sell', args: ['mat_beast_hide', '2'] });
  });

  test('chuỗi rỗng trả command rỗng', () => {
    expect(parsePrefixInput('   ')).toEqual({ command: '', args: [] });
  });
});
