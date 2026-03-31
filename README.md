# Umi Bot (Foundation + Core Loop v1)

## Đã triển khai
- Nền tảng kỹ thuật: config validation, logger, MySQL pool, transaction manager.
- Anti-abuse primitives: rate limiter, idempotency command pipeline.
- Core schema migrations: users, wallets, transactions, profiles, inventories, inventory_items, cooldowns.
- Prefix command đã chạy:
  - `umicash` / `umibalance`
  - `umihunt`
  - `umifish`
  - `umiinventory` / `umiinv`
  - `umisell <item_code> <qty>`
  - `umisell all-common`
  - `umihelp`
- Auto bootstrap state người chơi mới khi chạy lệnh đầu tiên.

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
- Lệnh bán cấm với item lock/equipped/quest.
- Command có idempotency key chống double submit.
- Có kiểm thử tự động cho rate-limit/idempotency/parser/domain.
