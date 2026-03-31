export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic';

export interface ItemDefinition {
  code: string;
  name: string;
  rarity: ItemRarity;
  sellValue: number;
}

const ITEM_DEFINITIONS: ItemDefinition[] = [
  { code: 'mat_beast_hide', name: 'Da Thú', rarity: 'common', sellValue: 120 },
  { code: 'mat_forest_bone', name: 'Xương Rừng', rarity: 'uncommon', sellValue: 180 },
  { code: 'mat_rift_claw', name: 'Vuốt Khe Nứt', rarity: 'rare', sellValue: 260 },
  { code: 'mat_rare_horn', name: 'Sừng Hiếm', rarity: 'epic', sellValue: 520 },
  { code: 'mat_sea_scale', name: 'Vảy Biển', rarity: 'common', sellValue: 120 },
  { code: 'mat_coral_piece', name: 'Mảnh San Hô', rarity: 'uncommon', sellValue: 180 },
  { code: 'mat_deep_ink', name: 'Mực Biển Sâu', rarity: 'rare', sellValue: 260 },
  { code: 'mat_mythic_pearl', name: 'Ngọc Trai Thần Bí', rarity: 'epic', sellValue: 520 }
];

const map = new Map(ITEM_DEFINITIONS.map((i) => [i.code, i]));

export function getItemDefinition(code: string): ItemDefinition | null {
  return map.get(code) ?? null;
}

export function isCommonOrUncommon(code: string): boolean {
  const item = map.get(code);
  if (!item) return false;
  return item.rarity === 'common' || item.rarity === 'uncommon';
}
