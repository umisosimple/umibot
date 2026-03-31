export type GatherType = 'hunt' | 'fish';

export interface LootResult {
  itemCode: string;
  quantity: number;
  sellValue: number;
}

interface GatherLootEntry {
  itemCode: string;
  weight: number;
  sellValue: number;
}

const HUNT_LOOT_TABLE: GatherLootEntry[] = [
  { itemCode: 'mat_beast_hide', weight: 50, sellValue: 120 },
  { itemCode: 'mat_forest_bone', weight: 30, sellValue: 180 },
  { itemCode: 'mat_rift_claw', weight: 15, sellValue: 260 },
  { itemCode: 'mat_rare_horn', weight: 5, sellValue: 520 }
];

const FISH_LOOT_TABLE: GatherLootEntry[] = [
  { itemCode: 'mat_sea_scale', weight: 50, sellValue: 120 },
  { itemCode: 'mat_coral_piece', weight: 30, sellValue: 180 },
  { itemCode: 'mat_deep_ink', weight: 15, sellValue: 260 },
  { itemCode: 'mat_mythic_pearl', weight: 5, sellValue: 520 }
];

function pickWeighted(table: GatherLootEntry[], rng: number): GatherLootEntry {
  const total = table.reduce((acc, cur) => acc + cur.weight, 0);
  let roll = rng * total;
  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return table[table.length - 1];
}

export function resolveGather(type: GatherType, successRate = 0.6, rng = Math.random()): LootResult | null {
  if (rng > successRate) return null;
  const table = type === 'hunt' ? HUNT_LOOT_TABLE : FISH_LOOT_TABLE;
  const picked = pickWeighted(table, Math.random());
  return { itemCode: picked.itemCode, quantity: 1, sellValue: picked.sellValue };
}
