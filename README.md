# Umi Bot (Foundation + Core Loop v0)

## Đã triển khai
- Nền tảng kỹ thuật: config validation, logger, MySQL pool, transaction manager.
- Anti-abuse primitives: rate limiter, idempotency command pipeline.
- Core schema migrations: users, wallets, transactions, profiles, inventories, inventory_items, cooldowns.
- Prefix command đầu tiên (`umi...`):
  - `umicash` / `umibalance`
  - `umihunt`
  - `umifish`
- Auto bootstrap state người chơi mới khi chạy lệnh lần đầu.

## Chạy local
1. `cp .env.example .env`
2. Cập nhật biến trong `.env`.
3. `npm install`
4. Chạy migration SQL theo thứ tự:
   - `sql/001_foundation.sql`
   - `sql/002_core_gameplay.sql`
5. `npm run typecheck`
6. `npm run test`
7. `npm run dev`

## Nguyên tắc an toàn đang áp dụng
- Mọi mutate flow đi qua transaction.
- Ví được lock `FOR UPDATE` trước khi cập nhật số dư.
- Command có idempotency key chống double submit.
- Có kiểm thử tự động cho rate-limit/idempotency.
