export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly burst: number, private readonly windowMs: number) {}

  allow(key: string): boolean {
    const now = Date.now();
    const arr = this.hits.get(key) ?? [];
    const filtered = arr.filter((ts) => now - ts <= this.windowMs);
    if (filtered.length >= this.burst) {
      this.hits.set(key, filtered);
      return false;
    }
    filtered.push(now);
    this.hits.set(key, filtered);
    return true;
  }
}
