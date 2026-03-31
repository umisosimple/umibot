interface RecordValue {
  expiresAt: number;
  payload: unknown;
}

export class InMemoryIdempotencyStore {
  private readonly map = new Map<string, RecordValue>();

  constructor(private readonly ttlMs: number) {}

  get(key: string): unknown | undefined {
    const found = this.map.get(key);
    if (!found) return undefined;
    if (Date.now() > found.expiresAt) {
      this.map.delete(key);
      return undefined;
    }
    return found.payload;
  }

  set(key: string, payload: unknown): void {
    this.map.set(key, { payload, expiresAt: Date.now() + this.ttlMs });
  }
}
