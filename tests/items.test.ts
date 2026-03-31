import { describe, expect, test } from 'vitest';
import { getItemDefinition, isCommonOrUncommon } from '../src/domain/items.js';

describe('items domain', () => {
  test('lookup item definition', () => {
    const item = getItemDefinition('mat_beast_hide');
    expect(item?.sellValue).toBe(120);
  });

  test('classify common/uncommon', () => {
    expect(isCommonOrUncommon('mat_beast_hide')).toBe(true);
    expect(isCommonOrUncommon('mat_rift_claw')).toBe(false);
  });
});
