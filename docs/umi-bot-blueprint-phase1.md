# Umi Bot Blueprint — Phase 1 (Phần 1 → Phần 6)

## PHẦN 1 — PRODUCT VISION

### 1) Concept tổng thể
**Umi Bot** là Discord bot game/economy/social theo hướng **MMORPG-lite + creature collection + đội hình 3 pet + tiến trình dài hạn**, tập trung vào 3 trục:
- **Tích lũy bền vững** (umicoin, trang bị, bộ set, pet)
- **Quyết định build có chiều sâu** (stat, set bonus, vai trò pet, counterplay)
- **Tương tác xã hội có kiểm soát** (trade/transfer/duel có anti-abuse ngay từ lõi)

### 2) Fantasy / Theme
- Chủ đề: **Hải vực Umi và Lục địa Riftwood**
- Người chơi là “Nhà thám hiểm Umi”, săn bắt sinh vật biển/lục địa, lập đội 3 pet, tham gia thử thách hằng ngày và đấu trường.

### 3) Cảm giác chơi mục tiêu
- 10 phút: có tiến triển rõ (thêm đồ, thêm coin, thêm quest progress)
- 1 ngày: có quyết định build và mục tiêu mới
- 1 tuần: cảm thấy đội hình “khác đi thật” (set bonus + pet synergy)

### 4) Product pillars (5 trụ cột)
1. **Data Integrity First**: mọi action kinh tế/vật phẩm chạy transaction + idempotency.
2. **Economy bền, chống lạm phát**: nguồn tạo tiền và nguồn đốt tiền cân bằng theo tầng người chơi.
3. **Build có chiều sâu nhưng onboarding dễ**: mở khóa theo level, không dồn UI.
4. **Social có kiểm soát**: giao dịch/transfer không phá meta bằng alt account.
5. **LiveOps-ready**: data-driven content, patch balance không phá dữ liệu cũ.

### 5) Vì sao người chơi sẽ gắn bó
- Loop ngắn có thưởng ngay (hunt/fish/minigame)
- Loop trung hạn có mục tiêu build (set/pet/team)
- Loop dài hạn có danh vọng (achievement hiếm, leaderboard theo mùa)
- Không bị “pay/trade to win” vì anti-transfer và sink mạnh.

### 6) Khác biệt với bot economy phổ biến
- Không chỉ spam lệnh nhận coin: mọi coin phải đi qua **risk/cooldown/sink**.
- Pet không phải đồ trưng bày: vào battle thật, có role, counter và team cap = 3.
- Help/UX chuẩn hóa theo module + alias + ví dụ + pagination, giảm mù lệnh cho newbie.
- Anti-exploit là tính năng lõi, không phải vá sau.

### 7) Đối tượng người chơi chính
- **Midcore Discord gamer (16–30)**: thích progression, build, tranh thứ hạng nhẹ.
- Casual vẫn chơi được nhờ quest dẫn dắt 10 phút đầu và command rõ.

### 8) Định vị độ khó
- **Midcore-first**, casual-friendly, không hardcore quá sớm.

### 9) Thời lượng chơi lý tưởng/ngày
- Mục tiêu: **25–45 phút/ngày**
  - 10–15 phút loop cơ bản
  - 10–20 phút quest + battle
  - 5–10 phút social/trade/duel

---

## PHẦN 2 — CORE GAMEPLAY LOOP

### A. Vòng lặp 5 phút (micro loop)
1. `umihunt` hoặc `umifish` (cooldown ngắn)
2. Nhận vật phẩm/pet chance → vào inventory
3. `umiinventory` xem nhanh
4. `umisell` vật phẩm thường / giữ lại vật phẩm hiếm
5. Nhận EXP + umicoin + tiến độ quest/achievement

**Giá trị:** luôn có tiến độ ngắn hạn.

### B. Vòng lặp 1 ngày
1. Claim daily/newbie quest
2. Hoàn thành 8–12 hành động chính (hunt/fish/battle/shop)
3. Tối ưu set 2/4 món, ghép team 3 pet
4. Hoàn thành daily + một phần weekly
5. Chốt ngày bằng quản lý inventory, khóa đồ quan trọng

### C. Vòng lặp 1 tuần
- Hoàn thành weekly/milestone
- Nâng 1 mốc sức mạnh rõ ràng (VD: set 4 món + pet core lên tier)
- Tham gia event rotation/shop giới hạn
- Tái cân đối build theo meta patch nhẹ

### D. Vòng lặp dài hạn (4–12 tuần)
- Sưu tầm pet hiếm theo biome
- Hoàn thành set mục tiêu (6 món)
- Mở khóa achievement hiếm, leo leaderboard mùa
- Chuyển từ “farm tài nguyên” sang “farm hiệu suất build”

### E. Hành trình người chơi
- **New player (Lv1-5):** học command, có pet starter, hiểu inventory/sell
- **Early (Lv6-20):** làm quen hunt/fish/shop/set 2 món, battle PvE cơ bản
- **Mid (Lv21-40):** tối ưu team 3 pet, weekly chain, minigame EV thấp dương/âm có kiểm soát
- **Late (Lv41-60):** build đa archetype, PvP có điều kiện, săn achievement khó
- **Endgame (61+):** tối ưu hiệu suất, event cạnh tranh, prestige cosmetic/title

### F. 10 phút đầu cho người mới (kịch bản bắt buộc)
1. `umistart` → tạo profile + tặng starter pack
2. `umihelp newbie` → hướng dẫn 3 lệnh đầu tiên
3. `umihunt` (thành công base 60%)
4. `umiinventory`
5. `umisell all-common`
6. `umishop tools`
7. `umibuy <id>` (1 tool rẻ)
8. `umifish`
9. `umiquest`
10. `umicash` / `umibalance` (alias)

### G. Unlock hệ theo level
- Lv1: profile, wallet, hunt/fish, inventory, sell, help
- Lv3: newbie quests, daily quests
- Lv5: shop tool cơ bản, pet team slot #2
- Lv8: battle PvE, equip slot 1-2
- Lv12: minigame #1 (tài xỉu)
- Lv15: transfer giới hạn
- Lv18: trade item (2-step confirm)
- Lv20: pet team slot #3, weekly quest
- Lv25: PvP duel có MMR thô
- Lv30+: rotating shop, set nâng cao

### H. Tutorial/quest dẫn dắt
- Newbie chain 12 bước, mỗi bước mở đúng 1 khái niệm.
- Không mở shop nâng cao trước Lv8 để tránh overwhelm.

### I. Cách tránh overwhelm
- Chỉ hiển thị command “đề xuất tiếp theo”.
- Help theo ngữ cảnh (thất bại equip thì gợi ý `umiequip help`).
- Pagination bắt buộc cho list > 8 entries.

---

## PHẦN 3 — SCOPE BREAKDOWN (MVP / V1 / V2 / OOS)

| Hệ thống | Nhãn | Lý do |
|---|---|---|
| Account/Profile/Wallet | MVP | Nền dữ liệu lõi |
| Hunt/Fish (base 60%) | MVP | Loop giữ người chơi ngày đầu |
| Inventory + Sell + Lock | MVP | Chốt integrity item |
| Shop cơ bản + tool nâng tỉ lệ | MVP | Kết nối income/sink |
| Quest Newbie + Daily | MVP | Dẫn dắt và retention |
| Achievement core (12-18 cái) | MVP | Mục tiêu trung hạn sớm |
| Pet capture + team 3 slot | MVP | Bản sắc sản phẩm |
| Battle PvE cơ bản | MVP | Cho pet có giá trị dùng thật |
| Anti-dup lõi + transaction | MVP | Điều kiện sống còn |
| Help/onboarding full tiếng Việt | MVP | Giảm churn người mới |
| Weekly quests + chain dài | V1 | Mở rộng chiều sâu |
| Battle PvP + MMR nhẹ | V1 | Tăng social cạnh tranh |
| Trade 2 bước + gifting gated | V1 | Cần anti-abuse ổn định trước |
| Set system 30 set đầy đủ | V1 | MVP chỉ cần 10-12 set |
| Minigame #2,#3 (blackjack/bài cào) | V1 | Sau khi EV control ổn định |
| Seasonal event shop | V1 | LiveOps sau lõi ổn |
| Guild/Party co-op boss | V2 | Phức tạp đồng bộ & anti-boost |
| Auction House | V2 | Rủi ro laundering cao |
| Cross-guild tournaments lớn | V2 | Cần hạ tầng analytics mature |
| NFT/Web3/real-money | Out of scope | Rủi ro pháp lý và phá economy |
| Open API public trade bots | Out of scope | Tăng bề mặt exploit quá sớm |

---

## PHẦN 4 — FULL FEATURE MAP (tóm lược có thể code)

| Nhóm | Mục đích | Input | Output | Liên kết | Giá trị gameplay | Risk chính |
|---|---|---|---|---|---|---|
| Profile/Progression | Theo dõi cấp độ, mở khóa | battle/hunt/fish/quest exp | level up, unlock | economy, quest, shop | động lực dài hạn | exp farm script |
| Economy | Luân chuyển umicoin | earn/spend/transfer | balance + ledger | shop, trade, minigame | cảm giác tích lũy | lạm phát, laundering |
| Quests | Định hướng hành vi | action events | reward claim | mọi hệ | retention ngày/tuần | double claim |
| Achievements | Mục tiêu dài hạn | cumulative stats | badge/title/reward | profile, social | khoe tiến độ | cheese/farm |
| Pets | Team 3 chiến đấu | capture/feed/train | power tăng | battle, quest | bản sắc build | rare farm exploit |
| Battle | Sink + skill check | team/equip/buff | reward/MMR | pet, equip, quest | chiều sâu meta | boosting, one-shot meta |
| Items/Equipment/Sets | Tùy biến build | drop/buy/use/equip | stat delta | battle, shop | tối ưu build | dup/sell-equip race |
| Buffs | Nhịp dùng tài nguyên | consume item | temporary boost | hunt/fish/battle | quyết định chiến thuật | overlap exploit |
| Shop | Kênh sink chính | buy requests | owned item | economy, inventory | planning mua sắm | duplicate purchase |
| Inventory | Nguồn sự thật vật phẩm | add/use/sell/equip | state transitions | shop, hunt/fish | quản trị tài sản | desync / stale state |
| Hunting | Thu thập tài nguyên | command + tool | loot/pet chance | inventory, quest | loop nhanh | macro spam |
| Fishing | Thu thập song song | command + rod/bait | loot/pet chance | inventory, quest | loop thư giãn | macro spam |
| Casino/Minigames | Variance gameplay | bet amount | win/lose coin | economy, quest | giải trí/rủi ro | infinite-profit design |
| Social (transfer/trade) | tương tác người chơi | transfer/trade flow | ownership/balance swap | economy, inventory | cộng đồng | scam/alt abuse |
| Leaderboard | cạnh tranh | aggregated stats | rankings | profile,battle | động lực xã hội | boosting |
| Help/Onboarding | giảm rào cản | help command | hướng dẫn theo ngữ cảnh | tất cả | giảm churn | thông tin lỗi thời |
| Admin/Ops | vận hành an toàn | admin commands | moderation/hotfix | logging, anti-cheat | ổn định hệ thống | admin mistake |
| Logging/Analytics | quan sát & điều tra | domain events | dashboards/alerts | tất cả | phát hiện sớm exploit | thiếu dữ liệu forensic |
| Anti-Exploit | bảo vệ hệ | action traces | block/flag/sanction | DB + services | bảo toàn economy | false positive |

---

## PHẦN 5 — ECONOMY SKELETON (khung kinh tế lõi)

### 1) Tiền tệ
- Soft currency chính: **umicoin**.
- Không dùng hard currency ở MVP để giảm pay-to-win và độ phức tạp pháp lý.

### 2) Mục tiêu cân bằng số
- Người mới (Lv1-10): thu nhập ròng mục tiêu **2,500–4,000 umicoin/ngày**.
- Early (Lv11-30): **6,000–10,000/ngày**.
- Mid (Lv31-60): **12,000–20,000/ngày**.
- Late (61+): **18,000–28,000/ngày**.

**Net inflation target:** tăng tổng cung ròng toàn server **<= 3.0%/tuần**.

### 3) Nguồn tạo tiền (faucets)
- Hunt/Fish bán loot (chính)
- Quest rewards (điều tiết theo ngày)
- Battle PvE rewards (ổn định)
- Minigame rewards (phụ, EV bị khống chế)

### 4) Nguồn đốt tiền (sinks)
- Mua tool/bait/repair
- Phí nâng cấp trang bị/pet care
- Thuế transfer/trade
- Phí refresh shop giới hạn
- Entry fee một số battle/minigame

### 5) Công thức cốt lõi
**Giá bán loot:**
`SellPrice = BasePrice * RarityCoef * QualityCoef * MarketTuning`

**Chi phí tool theo tier:**
`ToolPrice(t) = 500 * (1.85^(t-1))`

**Phí transfer (anti-laundering):**
`Fee = max(100, amount * feeRate(levelBracket))`
- Lv<15: khóa transfer
- Lv15-24: fee 12%, cap/ngày 3,000
- Lv25-39: fee 8%, cap/ngày 10,000
- Lv40+: fee 5%, cap/ngày 25,000

**Thuế trade vật phẩm:** 6% theo giá tham chiếu hệ thống (không theo giá người dùng tự khai).

### 6) EV minigame (mục tiêu)
- Tài xỉu: EV người chơi **-2.5%** mỗi cược trước quest bonus
- Blackjack: EV **-1.5%** với luật chuẩn dealer hit soft 17
- Bài cào: EV **-3%**

=> đảm bảo minigame không thành máy in tiền.

### 7) Anti-inflation & anti-alt
- Transfer unlock muộn + fee cao đầu game + cap/ngày
- Không cho transfer từ tài khoản < 7 ngày tuổi Discord (tùy guild policy)
- Risk score theo cụm IP/device fingerprint (nếu có), hành vi giao dịch tròn số liên tục
- Quest coin lớn là **bind reward** (không transfer trực tiếp)

### 8) Money flow chuẩn
Hunt/Fish/Battle -> Inventory -> Sell -> Wallet -> Spend at Shop/Upgrades/Fees -> burn.

### 9) Guardrails chống “người giàu phá meta”
- Diminishing return phần trăm bonus từ set/buff chồng cao
- Entry fee hoạt động endgame tăng theo bracket
- Soft cap lợi nhuận minigame/ngày theo level

### 10) Trade-off quyết định
- **Chấp nhận giảm tự do chuyển coin** để giữ economy bền.
- **Ưu tiên anti-abuse hơn tiện lợi** ở giai đoạn MVP.

---

## PHẦN 6 — ANTI-EXPLOIT FOUNDATION (nền tảng bắt buộc)

### 1) Nguyên tắc kiến trúc
1. **Authoritative server-state**: client chỉ gửi intent, server quyết định kết quả.
2. **Atomic transaction** cho mọi action thay đổi coin/item/reward.
3. **Idempotency key** cho mọi action có thể retry.
4. **Pessimistic lock** khi đụng chung tài sản (wallet/item/pet/team slot).
5. **Unique constraints** chống claim/purchase lặp.
6. **Audit trail immutable** cho hành động nhạy cảm.

### 2) Ma trận exploit nền tảng (12 điểm ưu tiên MVP)

| Exploit | Cơ chế xảy ra | Chặn ở code | Chặn DB | Log & xử lý |
|---|---|---|---|---|
| Double click button | user bấm 2 lần trước ack | action nonce + disable button sau click | unique(action_id) | log duplicate_attempt |
| Retry network | Discord retry interaction | idempotency key theo interaction_id | unique(idempotency_key) | trả kết quả cũ |
| Duplicate claim quest | claim đồng thời 2 nơi | kiểm tra trạng thái trong TX | unique(user_id, quest_id, cycle_id, claim_seq) | flag critical |
| Duplicate purchase | slash + button cùng lúc | mutex theo user + item | unique(user_id, shop_item_id, order_nonce) | auto-refund nếu mismatch |
| Sell/equip race | 2 action chạm cùng item | lock item row FOR UPDATE | version column + check state | reject one action |
| Trade duplication | confirm gần đồng thời | 2-phase commit trade session | unique(item_instance_id, active_trade_id) | rollback toàn bộ trade |
| Cooldown bypass | gửi command đa client | server-side cooldown check | unique(user, command, cooldown_bucket) | suspicious score +1 |
| Pet team conflict | sell pet đang team | validate membership trong TX | FK + check constraint logical | reject + warn |
| Reward race button/slash | 2 interface cùng reward | reward token state machine | unique(reward_token_id, consumed=1) | consume-once |
| Stale cache ownership | cache chưa sync | write-through + version check | row version bigint | invalidate cache |
| Battle reward dup reconnect | reconnect nhận lại | battle_result_status consumed | unique(battle_id, reward_claimed) | reconciliation job |
| Transfer laundering | coin chạy vòng alt | graph heuristic + caps | transfer_limits table | auto-freeze threshold |

### 3) Khi nào optimistic vs pessimistic lock
- **Pessimistic (`SELECT ... FOR UPDATE`)**: wallet update, equip/sell item, quest claim, trade confirm.
- **Optimistic (`version`)**: profile display, non-critical settings, leaderboard snapshots.

### 4) Transaction boundaries chuẩn
- Boundary = “1 ý nghĩa kinh tế hoàn chỉnh”
  - Ví dụ buy item: (check funds -> debit wallet -> insert inventory -> insert transaction log -> mark purchase)
- Không tách giữa chừng bằng call external.
- Timeout TX 2s; fail thì rollback toàn bộ.

### 5) Idempotency tiêu chuẩn
- Key format: `userId:actionType:clientNonce|interactionId`
- TTL key: 24h (Redis) + persistent table cho action tài chính 30 ngày
- Duplicate request => trả response của lần đầu, **không chạy lại business logic**.

### 6) Rate-limit & anti-spam
- Per-user command bucket: 6 req / 10s (burst), refill 1 req/1.5s
- Per-guild safety bucket: 40 req / 10s
- Command tài chính: cooldown riêng 2–8s tùy lệnh
- Vi phạm nhiều lần: mute command tạm 5m -> 30m -> 24h

### 7) Suspicious scoring
- Điểm nghi ngờ theo hành vi (retry dày, transfer vòng tròn, action fail nhiều).
- >= 70 điểm: auto-limit transfer/trade
- >= 90 điểm: auto-freeze account soft + yêu cầu admin review

### 8) Rollback & compensation nguyên tắc
- Không sửa tay DB trực tiếp.
- Dùng “compensation transactions” ngược chiều có liên kết `ref_tx_id`.
- Nếu phát hiện exploit diện rộng: freeze hệ liên quan, snapshot, replay ledger.

### 9) Testability nền tảng
- Bắt buộc integration test concurrency (>= 20 requests đồng thời) cho:
  - claim quest
  - buy shop
  - sell/equip cùng item
  - trade confirm
  - transfer burst

### 10) Quy tắc không thỏa hiệp
- Không transaction = không merge.
- Không idempotency cho action có reward = không release.
- Không audit log admin action = không cho quyền admin command.

---

## Kết luận phase 1
Blueprint trên chốt 6 phần mở đầu theo thứ tự ưu tiên đúng: **đúng dữ liệu -> chống exploit -> economy ổn định -> UX rõ**. Giai đoạn tiếp theo sẽ mở rộng đầy đủ Phần 7–28 với schema SQL, command spec chi tiết, test plan 100+ case, roadmap code và checklist triển khai production.

---

## PHẦN 7 — QUEST SYSTEM

### 7.1 Mục đích
- Điều hướng người chơi qua tất cả hệ: hunt/fish/battle/shop/pet/social.
- Tạo retention ngày/tuần và mục tiêu trung hạn.

### 7.2 Loại quest và reset
- **Newbie (1 lần):** chuỗi 12 bước, không reset.
- **Daily (00:00 UTC):** 6 quest/ngày, chọn từ pool theo level bracket.
- **Weekly (Thứ Hai 00:00 UTC):** 8 quest/tuần.
- **Chain:** chuỗi 3-5 nhiệm vụ, mở theo milestone.
- **Milestone:** tích lũy dài hạn (ví dụ 1,000 lượt săn).
- **Hidden:** mở khi thỏa điều kiện bí mật (không hiện trước).

### 7.3 Reward logic
`QuestReward = BaseReward * LevelBracketCoef * DifficultyCoef * AntiAbuseCoef`
- AntiAbuseCoef = 0 nếu hành vi bất thường (macro score quá ngưỡng).
- Reward gồm: umicoin + exp + item token + pet food (không chỉ coin).

### 7.4 Random logic
- Daily pool theo trọng số: Hunt 25%, Fish 25%, Battle 20%, Shop 10%, Pet 10%, Social 10%.
- Cấm trùng 2 quest cùng action count > 80% tương tự.

### 7.5 Anti-abuse
- Progress chỉ tăng từ **server-verified events**.
- Không tính progress từ trận tự thua nhanh < 30 giây.
- Cooldown quest claim 1s + idempotency key.
- Unique claim `(user_id, quest_id, cycle_id)`.

### 7.6 Luồng chính
1. Generate cycle quest set
2. User hoàn thành hành động
3. Event -> progress updater
4. Validate điều kiện
5. Claim reward trong transaction
6. Emit quest_completed event

### 7.7 Edge cases
- Người chơi offline qua kỳ reset: giữ trạng thái cycle cũ = expired, không claim được.
- Reset đúng lúc claim: lock quest row theo user, dùng `cycle_id` làm điều kiện cứng.

---

## PHẦN 8 — ACHIEVEMENT SYSTEM

### 8.1 Quy tắc chung
- Achievement là **vĩnh viễn** theo account.
- Progress tracking từ event bus.
- Reward claim one-time, unique `(user_id, achievement_id)`.

### 8.2 36 achievements mẫu (>=30)

| # | Nhóm | Tên | Điều kiện | Reward | Rarity | Anti-cheese |
|---|---|---|---|---|---|---|
| 1 | Level | Chập Chững | đạt Lv5 | 500 coin | Thường | one-time |
| 2 | Level | Vượt Sóng | Lv15 | 1,500 coin | Thường | one-time |
| 3 | Level | Thuyền Trưởng | Lv30 | 1 vé buff | Hiếm | one-time |
| 4 | Level | Huyền Thoại Umi | Lv60 | title | Sử thi | one-time |
| 5 | Money | Đồng Đầu Tiên | kiếm 1,000 coin | 200 exp | Thường | ledger-based |
| 6 | Money | Tay Tích Lũy | kiếm 50,000 coin | 1,000 coin | Hiếm | net-earn only |
| 7 | Money | Kho Báu Biển Sâu | kiếm 500,000 coin | khung hồ sơ | Sử thi | exclude transfer-in |
| 8 | Quest | Người Mới Gương Mẫu | xong newbie chain | 1 tool T2 | Thường | one-time |
| 9 | Quest | Kỷ Luật Ngày Mới | 7 daily liên tiếp | 2,000 coin | Hiếm | streak validator |
|10 | Quest | Bền Bỉ Tuần | 4 weekly | buff token | Hiếm | weekly_cycle id |
|11 | Hunting | Mồi Chuẩn | săn thành công 50 | 600 coin | Thường | cooldown check |
|12 | Hunting | Thợ Săn Lão Luyện | săn 500 | 1 bait pack | Hiếm | anti macro score |
|13 | Hunting | Vua Săn Đêm | săn legendary 10 | pet shard | Sử thi | rarity-verified |
|14 | Fishing | Cần Thủ Tập Sự | câu 50 | 600 coin | Thường | cooldown check |
|15 | Fishing | Cần Thủ Umi | câu 500 | rod skin | Hiếm | anti macro score |
|16 | Fishing | Hải Vương | câu mythic 10 | title | Sử thi | server RNG only |
|17 | Battle | Làm Quen Chiến Trường | thắng PvE 20 | 800 coin | Thường | no surrender farm |
|18 | Battle | Chiến Thuật Gia | thắng PvE 200 | set token | Hiếm | time floor |
|19 | Battle | Đấu Trường | thắng PvP 50 | 2,500 coin | Hiếm | anti boosting |
|20 | Pets | Người Chăm Nuôi | bond 20 pet | food box | Thường | unique pet count |
|21 | Pets | Tam Hợp Hoàn Hảo | team 3 pet Lv20+ | buff | Hiếm | team snapshot |
|22 | Pets | Nhà Lai Tạo | evolve 10 pet | shard | Sử thi | event-based |
|23 | Collection | Sưu Tầm Biển | 15 pet biển | 1,200 coin | Hiếm | unique species |
|24 | Collection | Sưu Tầm Lục Địa | 15 pet cạn | 1,200 coin | Hiếm | unique species |
|25 | Collection | Bách Khoa Umi | 40 species | frame | Sử thi | unique only |
|26 | Equip/Set | Mặc Đúng Cách | equip đủ 6 slot | 500 coin | Thường | equip state |
|27 | Equip/Set | Song Set | kích hoạt bonus 2 món x2 | 1,000 coin | Hiếm | state validator |
|28 | Equip/Set | Toàn Bộ Hệ | hoàn tất set 6 món | set chest | Sử thi | ownership lock |
|29 | Shop | Khách Quen | mua 30 lần | 500 coin | Thường | purchase ledger |
|30 | Shop | Nhà Đầu Tư | tiêu 100,000 coin | discount token | Hiếm | spend-only |
|31 | Social | Hào Hiệp Có Kỷ Luật | transfer hợp lệ 20 lần | 700 coin | Hiếm | abuse filter |
|32 | Social | Thương Gia Trung Thực | trade 25 lần | badge | Hiếm | no alt rings |
|33 | Hidden | Sóng Ngầm | thắng 5 trận liên tiếp với 1 HP còn lại | title | Sử thi | combat log verify |
|34 | Hidden | Đêm Trăng Umi | câu 3 mythic trong 1 ngày | cosmetic | Huyền thoại | anti time spoof |
|35 | Hidden | Không Bỏ Cuộc | thua 30 trận vẫn chơi | 1,000 coin | Hiếm | valid battles |
|36 | Hidden | Sạch Tay | 30 ngày không vi phạm rate limit | halo | Huyền thoại | audit-based |

---

## PHẦN 9 — PET / CREATURE SYSTEM

### 9.1 Rarity và biome
- Rarity: Common 55%, Uncommon 25%, Rare 12%, Epic 5%, Legendary 2.5%, Mythic 0.5% (trước modifier).
- Biome: Reef, DeepSea, Coast, Forest, Canyon, Ruins.

### 9.2 Danh sách sinh vật (30 biển + 30 cạn)
**Biển (30):** Cá Cơm Bạc, Cá Mòi Đêm, Cá Hề Lửa, Cá Bướm Lam, Cá Kiếm Mini, Lươn Điện Non, Sứa Tím, Sứa Vương Miện, Cua Đá, Cua Kìm Đỏ, Tôm Bật, Tôm Pha Lê, Mực Chớp, Mực Than, Bạch Tuộc Lá, Bạch Tuộc Gai, Cá Đuối Cát, Cá Đuối Bão, Hải Mã Vàng, Hải Mã Đen, Rùa Xanh, Rùa Cổ, Cá Mập Tre, Cá Mập Vệt, Cá Voi Lưng Xám, Cá Voi Umi, San Hô Sống, Sao Biển Đỏ, Sao Biển Vàng, Long Ngư Biển Sâu.

**Cạn (30):** Sóc Đá, Sói Xám Non, Sói Hắc, Chồn Cát, Chồn Sương, Gấu Mật, Gấu Nâu, Nai Sừng Mờ, Nai Sừng Ánh, Hươu Cổ Trắng, Cáo Bạc, Cáo Đuôi Lửa, Mèo Rừng, Linh Miêu, Thỏ Đồi, Thỏ Băng, Chim Cắt Trẻ, Đại Bàng Nâu, Cú Đêm, Cú Trăng, Rắn Lá, Rắn Cát, Thằn Lằn Gai, Tê Tê Đá, Lợn Rừng, Hổ Phách, Báo Đêm, Voi Rừng, Tê Giác Cổ, Kỳ Lân Rạn.

### 9.3 Spawn & catch
`EncounterChance(species) = BiomeWeight * TimeWindowCoef * ToolCoef`
`CatchChance = BaseCatchByRarity * ToolCatchCoef * BuffCoef * (1 - ResistCoef)`
- Base catch: C 85, U 70, R 55, E 40, L 25, M 12 (%).
- Anti-rare farm: pity cap mềm tăng nhẹ sau 80 lần fail rarity cao, reset khi trúng.

### 9.4 Pet stats/roles
- Stats: HP, ATK, DEF, SPD, CRIT, CRITDAME, HIT, RES.
- Role archetype: Bruiser, Tank, Burst, Controller, Support, DoT.

### 9.5 Growth/bond
- Pet level bằng pet exp; cap theo player level + 5.
- Bond 0-100: tăng 0.1-0.3% hiệu quả skill mỗi mốc 10.
- Feeding: 3 lần/ngày/pet; vượt hạn mức giảm hiệu quả (anti spam).

### 9.6 Team & lock rules
- Team tối đa 3 pet.
- Pet trong team: `is_team_locked = 1`, cấm sell/delete/trade/fuse.
- Remove from team cần cooldown 10s để chặn spam hoán đổi exploit.

---

## PHẦN 10 — ITEM / EQUIPMENT / SET / STAT / BUFF

### 10.1 Item categories
- Material, Consumable, QuestItem, PetFood, Bait, Rod, Trap, Equipment, SetToken, Cosmetic.

### 10.2 Equipment
- 6 slots: Weapon, Helm, Armor, Gloves, Boots, Charm.
- Stats chuẩn: ATK, DEF, HP, SPD, CRIT, CRITDAME (base 150%), HIT, RES.

### 10.3 Rarity tiers
- Common, Uncommon, Rare, Epic, Legendary, Mythic.

### 10.4 Buff rules
- Buff loại: Combat, Gathering, Economy, Utility.
- Duration: theo phút hoặc số lượt hành động.
- Stack: cùng `buff_family` không cộng dồn, lấy giá trị cao nhất.
- Cooldown dùng consumable: 3s global + 10s theo item.

### 10.5 Tradable/bind
- QuestItem: non-tradable
- Event hiếm: account-bound
- Equipment mua shop: tradable sau 24h (anti flip bot)

### 10.6 30 set (mỗi set 6 món)
1. Sóng Triều
2. Rạn San Hô
3. Bão Đêm
4. Mũi Neo
5. Mực Khói
6. Hải Vương
7. Lưới Thợ Săn
8. Cát Nóng
9. Rừng Đêm
10. Trăng Rằm
11. Gai Đá
12. Thú Hoang
13. Cổ Thụ
14. Lửa Than
15. Băng Mỏng
16. Sương Sớm
17. Kỵ Sĩ Umi
18. Xạ Thủ Cảng
19. Thuật Sĩ Thủy Triều
20. Vệ Binh Rạn
21. Dao Găm Sóng
22. Pháo Đài Bùn
23. Lôi Đình
24. Kết Giới
25. Kháng Ma
26. Kiểm Soát
27. Bạo Kích
28. Sinh Tồn
29. Săn Boss
30. Thử Nghiệm

### 10.7 Ví dụ 10 set bonus mẫu
- Sóng Triều: 2 món +8% SPD; 4 món +10% HIT; 6 món đòn đầu +15% dmg.
- Rạn San Hô: 2 +12% DEF; 4 giảm 10% crit nhận; 6 lá chắn 8% HP đầu trận.
- Bão Đêm: 2 +10% CRIT; 4 +20% CRITDAME; 6 sau crit tăng 5 SPD (1 turn).
- Mực Khói: 2 +8 RES; 4 kháng CC +12%; 6 khi bị CC nhận cleanse 1 lần/trận.
- Hải Vương: 2 +10% HP; 4 heal nhận +15%; 6 hồi 3% HP mỗi 2 turn.
- Lưới Thợ Săn: 2 hunt success +6%; 4 rarity +4%; 6 thêm 5% loot.
- Cát Nóng: 2 +8% ATK; 4 +6 HIT; 6 xuyên 8% DEF mục tiêu.
- Trăng Rằm: 2 +10 SPD đêm event; 4 +12 RES; 6 mở đầu +10% dodge 1 turn.
- Lôi Đình: 2 +12 SPD; 4 +8 CRIT; 6 sau kill nhận thêm lượt mini (0.5 action).
- Sinh Tồn: 2 +15% HP; 4 -8% dmg nhận; 6 khi <30% HP tăng 20 RES.

### 10.8 Ví dụ 10 consumable/buff
1. Thuốc Tập Trung (+8 HIT, 20 phút)
2. Dầu Bôi Cần (+7% fish success, 15 phút)
3. Mồi Thơm (+5% fish rarity, 10 lần câu)
4. Bẫy Sắc (+6% hunt success, 10 lần săn)
5. Tinh Chất Sóng (+6 SPD, 3 trận)
6. Vảy Cứng (+10 DEF, 3 trận)
7. Huyết Thanh Umi (+12% HP, 2 trận)
8. Vé May Mắn (+2% loot rarity, 30 phút)
9. Bùa Tỉnh Táo (miễn 1 debuff, 1 trận)
10. Khóa Vật Phẩm (lock item tránh bán nhầm)

### 10.9 Anti-dup/overlap/meta
- Item instance có `instance_uuid` duy nhất.
- Buff apply theo `buff_family`; reject nếu xung đột không hợp lệ.
- Meta guardrail: tổng CRIT không vượt 75%; tổng giảm dmg không vượt 45%.

---

## PHẦN 11 — SHOP SYSTEM

### 11.1 Loại shop
- **Thường:** vật phẩm cơ bản.
- **Giới hạn ngày/tuần:** suất mua có quota.
- **Rotating:** đổi catalog mỗi 48h.
- **Event:** theo mùa.

### 11.2 Pricing logic
`Price = Base * RarityCoef * DemandCoef * LevelBracketCoef`
- DemandCoef cập nhật hàng ngày theo lượng mua toàn server (biên 0.9 - 1.15).

### 11.3 Owned-state tracking
- Hiển thị tag: `Đã sở hữu`, `Đã đủ số lượng`, `Đã khóa level`.
- Mua trùng item unique: chặn server-side, trả embed lỗi rõ.

### 11.4 Anti-misclick / anti-desync
- Confirm button 2 bước với item giá cao.
- Interaction token TTL 30s.
- Nếu timeout, hủy phiên mua, không trừ tiền.

---

## PHẦN 12 — INVENTORY SYSTEM

### 12.1 State model
- Stack item: gộp theo `item_def_id + bind_state + expiry`.
- Unique item: mỗi bản ghi riêng `instance_uuid`.
- Flags: `is_locked`, `is_equipped`, `is_quest_item`, `is_team_locked`, `is_tradable`.

### 12.2 Flow
- Use: validate loại + cooldown + ownership -> apply effect.
- Equip: kiểm tra slot + class rule + lock item row.
- Unequip: kiểm tra battle state không active.
- Sell: cấm nếu equipped/locked/quest/team-locked.

### 12.3 Desync prevention
- Client luôn render từ snapshot server mới nhất.
- Action thành công trả luôn `inventory_version`.
- Nếu mismatch version, client phải refetch trước hành động mới.

---

## PHẦN 13 — BATTLE SYSTEM

### 13.1 Battle loop
1. Build turn queue theo SPD.
2. Mỗi lượt: chọn skill/target.
3. Resolve hit/crit/effect.
4. Cập nhật DOT/HoT/shield.
5. Check win/loss/timeout.

### 13.2 Formula
- `TurnOrder = sort(SPD + random(0..3))`
- `BaseDamage = (ATK * SkillCoef) - (DEF * DefCoef)`
- `Crit? = rand < CRIT%`
- `CritDamage = BaseDamage * (CRITDAME/100)` (mặc định CRITDAME=150)
- `FinalDamage = max(1, CritDamage * ElementCoef * MitigationCoef)`
- `HitChance = clamp(70 + HIT - TargetRES, 15, 98)`

### 13.3 CC/RES logic
- Debuff apply nếu `rand < HitChance`.
- Hard CC chịu diminishing return lần 2/3 trong cùng trận.

### 13.4 Mode
- PvE, Boss, PvP duel.
- PvP có anti-boost: không thưởng nếu đối thủ lặp >3 lần/ngày hoặc chênh MMR quá lớn.

### 13.5 Duration target
- PvE: 45–90 giây.
- PvP: 60–120 giây.

### 13.6 3 archetype và counter
- Burst (ATK/CRIT cao) > trị Support mỏng.
- Tank-Control > trị Burst thiếu RES.
- Sustain-DoT > trị Tank thuần DEF.

### 13.7 Anti one-shot / stall
- Cap crit chain bonus.
- Healing received cap 35% max HP/turn.
- Turn limit 20, quá giới hạn xét theo damage dealt + HP remaining.

---

## PHẦN 14 — HUNTING / FISHING / MINIGAMES

### 14.1 Hunting/Fishing
- Base success cố định: **60%**.
- Tool tăng success + rarity:
  - T1 +5% success, +1% rarity
  - T2 +10%, +2.5%
  - T3 +15%, +4.5%
  - T4 +20%, +7%

### 14.2 Sell flow
- Loot -> inventory -> `umisell` -> wallet ledger entry.
- Chỉ cho bulk sell với rarity <= Rare (mặc định), tránh bán nhầm đồ quý.

### 14.3 Minigames (3 game)
1. **Tài xỉu**: chọn Tài/Xỉu, settle theo 3 xúc xắc.
2. **Blackjack**: luật chuẩn, dealer hit soft 17, payout 3:2 cho blackjack tự nhiên.
3. **Bài cào 3 lá**: điểm mod 10, cao hơn thắng.

### 14.4 Anti spam/macro/infinite gain
- Cooldown 5–12s tùy game.
- Captcha-lite prompt ngẫu nhiên khi tần suất quá cao.
- EV âm nhẹ cố định, giới hạn lợi nhuận/ngày theo level.
- Detect mẫu click đều tuyệt đối (macro signature).

---

## PHẦN 15 — SOCIAL SYSTEM

### 15.1 Tính năng
- Transfer umicoin, Trade item 2 bước, Gift giới hạn, Duel PvP, Leaderboard.

### 15.2 Gating
- Transfer unlock Lv15, Trade unlock Lv18, Duel unlock Lv25.
- Fee transfer theo bracket (đã định ở Phần 5).
- Trade yêu cầu cả hai online + xác nhận kép.

### 15.3 Anti scam/alt/boost
- Preview đầy đủ vật phẩm và trạng thái bind trước confirm.
- 10s “cool-off” sau khi cả hai bấm confirm trước commit.
- Cancel nếu bất kỳ item thay đổi state trước commit.
- Matchmaking PvP hạn chế farm cùng người liên tục.

---

## PHẦN 16 — HELP / UX / ONBOARDING

### 16.1 Cấu trúc help
- `umihelp` tổng quan module.
- `umihelp <module>` danh sách lệnh + alias.
- `umihelp <command>` syntax, ví dụ, lỗi thường gặp.

### 16.2 Nguyên tắc UX writing
- Câu ngắn, động từ rõ, 1 embed <= 12 dòng chính.
- Mỗi lỗi có: lý do + cách sửa + lệnh gợi ý tiếp theo.

### 16.3 Ví dụ alias bắt buộc
- `umicash` = `umibalance`
- `umiinv` = `umiinventory`
- `umipetteam` = `umiteam`

### 16.4 5 embed help mẫu
1. Help tổng quan module
2. Help newbie 10 phút đầu
3. Help shop mua đồ an toàn
4. Help battle stat glossary
5. Help lỗi phổ biến/cooldown

---

## PHẦN 17 — ANTI-SPAM / ANTI-DUP / ANTI-EXPLOIT (MỞ RỘNG)

### 17.1 Danh sách exploit và đối sách
| Exploit | Nguy hiểm | Dấu hiệu | Chặn code | Chặn DB | Rollback/Test |
|---|---|---|---|---|---|
| spam command | Cao | req/s tăng đột biến | token bucket + cooldown | rate_limit_records | stress 500 rps |
| spam interaction | Cao | click burst | disable components + nonce | unique(interaction_id) | UI race test |
| double click | Cao | duplicate action_id | idempotency cache | unique action key | replay test |
| duplicate response | TB | 2 reply/1 intent | response guard flag | n/a | integration handler |
| retry action lặp | Cao | cùng payload nhiều lần | idem middleware | unique idempotency | retry chaos test |
| race condition | Rất cao | negative balance/dup | TX + row lock | FK+unique | concurrency 100 threads |
| duplicate reward claim | Rất cao | claim count >1 | claim state machine | unique(user,claim_key) | dual-interface test |
| duplicate purchase | Rất cao | stock âm | purchase mutex | unique(order_nonce) | slash+button race |
| sell/equip race | Cao | equip rồi vẫn bán | item lock FOR UPDATE | state check constraint | parallel sell/equip |
| trade duplication | Rất cao | item tồn tại 2 ví | 2PC trade session | unique item ownership | confirm race test |
| rollback abuse | Cao | lợi dụng crash | write-ahead ledger | immutable tx log | crash-recovery drill |
| reconnect abuse | Cao | reward nhận lại | battle/session token | unique reward settle | reconnect test |
| pet team conflict | Cao | team chứa pet đã bán | pre-commit validate | FK team pet | remove/sell race |
| cooldown bypass | TB | action gap bất thường | server monotonic time | cooldown unique key | skew time test |
| alt account abuse | Rất cao | transfer ring | risk scoring graph | transfer_limits | synthetic alt graph |
| laundering | Rất cao | vòng giao dịch | aml rules + freeze | suspicious_logs | AML scenario tests |
| PvP boosting | TB | gặp cùng user liên tục | reward diminishing | match_log index | boost simulation |
| scripted farming | Cao | nhịp lệnh đều | behavior fingerprint | suspicious_logs | bot script replay |
| macro abuse | Cao | delay fixed | random challenge | rate caps | macro detector eval |
| bot abuse | Cao | API spam | gateway ratelimit | blocked_users | abuse harness |
| inventory desync | Cao | client lệch state | versioned snapshot | inventory_version | stale cache test |
| battle reward dup | Rất cao | settle >1 | one-shot settle fn | unique(battle_id) | forced reconnect |
| quest claim dup | Rất cao | duplicate claim | idem+lock | unique quest claim | concurrent claim |
| shop refresh abuse | TB | refresh flood | refresh cooldown | refresh ledger | spam refresh test |
| concurrent same item | Cao | state split | item scoped mutex | row lock | multi-action test |
| reward race UI/slash | Cao | 2 kênh claim | central claim service | unique reward key | A/B interface race |
| stale cache | TB | old ownership | cache version guard | version column | cache invalidation test |
| inconsistent ownership | Rất cao | 1 item 2 owner | ownership invariant | unique(instance_uuid) | invariant scanner |

### 17.2 Kỹ thuật bắt buộc
- Idempotency keys: tất cả action mutate state.
- Pessimistic lock: wallet/item/pet/trade rows.
- Optimistic lock: profile/settings read-heavy.
- Audit log immutable cho admin/economy critical.
- Action nonce theo session UI.
- Integrity verifier job mỗi 5 phút: scan negative balance, duplicated instance_uuid, orphan FK.

---

## PHẦN 18 — SYSTEM ARCHITECTURE

### 18.1 Module boundaries
- `interfaces/discord` (slash/prefix/controller)
- `application` (use-cases)
- `domain` (entities/rules)
- `infrastructure` (mysql/redis/queue/log)
- `antiCheat` (risk scoring/rules engine)

### 18.2 Lý do cấu trúc
- Domain tách khỏi Discord transport => dễ test và mở rộng.
- Use-case rõ transaction boundary.
- Repositories cô lập SQL, dễ thay đổi schema.

### 18.3 Event bus
- Internal event bus (in-memory + outbox table).
- Event-driven cho quest/achievement/projection analytics.

### 18.4 Error handling
- Mã lỗi chuẩn: `UMI-<MODULE>-<CODE>`
- Error embed tiếng Việt + trace id.

---

## PHẦN 19 — DATABASE DESIGN (chi tiết rút gọn nhưng triển khai được)

> Kiểu dữ liệu chuẩn: `BIGINT` cho id, `DECIMAL(18,2)` cho coin, `JSON` cho payload, `DATETIME(3)` cho thời gian.

| Bảng | Purpose | Cột chính | PK/FK/Index/Unique | Ghi chú giao dịch |
|---|---|---|---|---|
| users | account Discord | id, discord_id, created_at, status | PK(id), UQ(discord_id), IDX(status) | lock khi sanction |
| profiles | tiến trình | user_id, level, exp, title | PK(user_id), FK->users | update cùng rewards |
| wallets | số dư coin | user_id, balance, updated_at, version | PK(user_id), FK->users, CHECK balance>=0 | `FOR UPDATE` khi mutate |
| economy_transactions | sổ cái | tx_id, user_id, type, amount, balance_after, ref_id | PK(tx_id), IDX(user_id,created_at), UQ(idempotency_key) | immutable |
| cooldowns | cooldown lệnh | user_id, command, expires_at | PK(id), UQ(user_id,command) | server-time only |
| inventories | header | inventory_id, user_id, version | PK(inventory_id), UQ(user_id) | version increment |
| inventory_items | item instance/stack | item_row_id, inventory_id, item_def_id, qty, instance_uuid, flags | PK(item_row_id), UQ(instance_uuid), IDX(inventory_id,item_def_id) | lock row khi sell/equip |
| pets | pet instance | pet_id, user_id, species_id, rarity, level, bond, is_team_locked | PK(pet_id), IDX(user_id,rarity) | lock khi team/sell |
| pet_teams | đội hình 3 | team_id, user_id, slot, pet_id | PK(team_id), UQ(user_id,slot), UQ(pet_id) | enforce no duplicate pet |
| equipments | định nghĩa equip | equip_def_id, set_id, slot, rarity, base_stats | PK(equip_def_id), IDX(set_id,slot) | content table |
| user_equipments | equip sở hữu | ue_id, user_id, instance_uuid, equip_def_id, is_equipped, slot | PK(ue_id), UQ(instance_uuid), IDX(user_id,is_equipped) | lock on equip flow |
| buffs | buff active | buff_id, user_id, buff_family, value, expires_at | PK(buff_id), IDX(user_id,expires_at), UQ(user_id,buff_family,source_key) | prevent overlap |
| quests | định nghĩa quest | quest_id, type, reset_rule, condition_json, reward_json | PK(quest_id), IDX(type) | content versioned |
| user_quest_progress | tiến độ quest | uq_id, user_id, quest_id, cycle_id, progress, completed_at, claimed_at | PK(uq_id), UQ(user_id,quest_id,cycle_id), IDX(user_id,cycle_id) | claim in TX |
| achievements | định nghĩa | achievement_id, category, condition_json, reward_json | PK(achievement_id), IDX(category) | content |
| user_achievement_progress | tiến độ | ua_id, user_id, achievement_id, progress, claimed_at | PK(ua_id), UQ(user_id,achievement_id) | one-time claim |
| shops | catalog | shop_item_id, shop_type, item_def_id, price, stock, reset_at | PK(shop_item_id), IDX(shop_type,reset_at) | stock lock |
| shop_purchases | log mua | purchase_id, user_id, shop_item_id, qty, total_price, order_nonce | PK(purchase_id), UQ(user_id,order_nonce), IDX(shop_item_id) | anti-dup purchase |
| battle_logs | log trận | battle_id, mode, p1_id, p2_id, result, duration, reward_claimed | PK(battle_id), IDX(p1_id,created_at), IDX(p2_id,created_at), UQ(battle_id,reward_claimed) | settle once |
| trade_logs | log trade | trade_id, user_a, user_b, state, payload_json | PK(trade_id), IDX(user_a,user_b,created_at) | 2-phase commit |
| suspicious_logs | log nghi vấn | s_id, user_id, signal, score_delta, context | PK(s_id), IDX(user_id,created_at), IDX(signal) | immutable forensics |
| admin_logs | log admin action | a_id, admin_id, action, target_user, payload, approved_by, created_at | PK(a_id), IDX(admin_id,created_at) | immutable |
| reward_claims | claim generic | claim_id, user_id, claim_key, source, claimed_at | PK(claim_id), UQ(user_id,claim_key) | one-shot guard |
| rate_limit_records | rate stats | r_id, scope, key, window_start, hits | PK(r_id), UQ(scope,key,window_start) | anti-spam |
| action_locks | lock phân tán | lock_key, owner, expires_at | PK(lock_key), IDX(expires_at) | fallback mutex |
| content_versions | version content | content_type, version, checksum, activated_at | PK(content_type,version) | patch safe |
| outbox_events | event outbox | event_id, aggregate_type, aggregate_id, event_type, payload, published_at | PK(event_id), IDX(published_at) | reliable async |

---

## PHẦN 20 — COMMAND SPEC (rút gọn có hệ thống)

### 20.1 Quy ước
- Prefix: `umi<command>` (vd `umicash`)
- Slash: `/cash` tương đương.
- Cooldown mặc định 2s; lệnh tài chính 5s.

### 20.2 Danh mục chính
- Profile: `umistart`, `umiprofile`, `umilevel`
- Economy: `umicash|umibalance`, `umitransfer`, `umiledger`
- Quest: `umiquest`, `umiquest claim`
- Achievement: `umiachv`, `umiachv claim`
- Pet: `umipet`, `umicatch`, `umiteam`
- Inventory: `umiinventory|umiinv`, `umisell`, `umiuse`, `umilock`
- Equipment: `umiequip`, `umiunequip`, `umiset`
- Shop: `umishop`, `umibuy`, `umishop refresh`
- Battle: `umibattle pve`, `umiduel`
- Hunting/Fishing: `umihunt`, `umifish`
- Casino: `umidice`, `umiblackjack`, `umibacao`
- Social: `umitrade`, `umigift`, `umileaderboard`
- Admin: `umiadmin setlog`, `umiadmin freeze`, `umiadmin inspect`
- Debug/log: `umidebug tx`, `umidebug integrity`

> Mỗi command dùng cùng pipeline: validate -> rate-limit -> lock -> tx -> log -> respond.

---

## PHẦN 21 — ADMIN / OPS SYSTEM

- Set log channel theo guild + fallback global.
- Inspect user/economy/inventory read-only.
- Hotfix balance qua **compensation tx** (không update tay).
- Feature toggle theo module (`battle.enabled`, `trade.enabled`).
- Emergency freeze cấp hệ hoặc cấp user.
- Rollback tool theo `ref_tx_id`.
- Sanction tools: warn, mute command, freeze trade, blacklist.
- Safe-guard admin:
  - 2-step confirm cho action nguy hiểm
  - yêu cầu reason + ticket id
  - role-based permission + dual approval cho rollback diện rộng

---

## PHẦN 22 — LOGGING / ANALYTICS

### 22.1 Log types
- DB immutable: economy, claim, trade, admin, suspicious.
- Discord log channel: admin action, high-risk alert, system incident.
- Admin-only dashboard: AML ring, inflation trend, dup alerts.

### 22.2 Metrics
- Daily: DAU, coin faucet/sink, quest completion rate, fail rate command.
- Weekly: retention D7, inflation %, top sink, abuse incidents.
- Battle: avg duration, pick rate set/pet, win rate archetype.

### 22.3 Retention policy
- economy/admin/trade/suspicious: 365 ngày.
- battle logs chi tiết: 90 ngày; aggregate giữ 365 ngày.
- rate-limit raw: 30 ngày.

---

## PHẦN 23 — TEST PLAN (100 test cases)

### A. Happy path (1-20)
1. Tạo tài khoản mới -> `umistart` -> tạo users/profiles/wallet thành công -> đảm bảo onboarding chạy.
2. `umicash` hiển thị 0 coin ban đầu -> tránh null balance.
3. `umihunt` thành công đưa item vào inventory -> loop cơ bản.
4. `umifish` thành công đưa item vào inventory -> loop cơ bản.
5. `umisell` item thường tăng wallet đúng -> ledger chính xác.
6. `umishop` hiển thị catalog đúng level -> UX rõ.
7. `umibuy` tool T1 trừ coin + add item -> buy flow chuẩn.
8. `umiequip` trang bị đúng slot -> stat cập nhật.
9. `umiunequip` trả item về inventory -> trạng thái đúng.
10. `umibattle pve` thắng nhận reward 1 lần -> settle chuẩn.
11. `umiquest` hiển thị daily/newbie -> reset logic đúng.
12. `umiquest claim` nhận thưởng 1 lần -> claim flow đúng.
13. `umiachv` hiển thị tiến độ -> tracking đúng.
14. `umiachv claim` thưởng one-time -> unique đúng.
15. `umipet` xem danh sách pet sở hữu -> pet query đúng.
16. `umiteam set` gán pet slot 1 -> lock team đúng.
17. `umidice` cược hợp lệ settle đúng payout -> casino core.
18. `umiblackjack` hit/stand đúng luật -> game logic đúng.
19. `umitransfer` hợp lệ trừ fee đúng bracket -> anti-inflation đúng.
20. `umileaderboard` trả top đúng metric -> social loop.

### B. Edge cases (21-35)
21. Hunt fail vẫn ăn cooldown -> anti spam.
22. Fish fail không thêm item -> integrity.
23. Mua thiếu tiền -> từ chối không trừ gì.
24. Equip item sai slot -> từ chối.
25. Sell item locked -> fail.
26. Sell item quest -> fail.
27. Transfer amount <=0 -> fail validate.
28. Transfer cho chính mình -> fail.
29. Battle timeout -> kết quả hợp lệ.
30. Blackjack timeout auto-stand -> deterministic.
31. Quest reset đúng 00:00 UTC -> cycle chính xác.
32. Weekly reset thứ Hai UTC -> cycle chính xác.
33. Inventory full stack merge đúng -> không overflow.
34. Pet level cap vượt player+5 -> fail.
35. Remove pet team khi battle active -> fail.

### C. Concurrency (36-50)
36. Double click `umibuy` chỉ mua 1 lần.
37. Slash + button claim quest đồng thời -> 1 claim.
38. Song song equip/sell cùng item -> chỉ 1 action thắng.
39. 20 request transfer cùng ví -> balance không âm.
40. 20 request sell cùng item unique -> 1 thành công.
41. 20 request trade confirm -> trade commit 1 lần.
42. Reconnect battle + settle đồng thời -> reward 1 lần.
43. Refresh shop song song -> không giảm stock âm.
44. Add/remove team pet đồng thời -> invariant team giữ đúng.
45. 100 req `umicash` read-only không lock write.
46. 30 req `umiquest claim` với idempotency giống nhau -> response cache.
47. 20 req dùng consumable cùng family -> buff không stack sai.
48. 20 req `umilock` cùng item -> state nhất quán.
49. 2 admin freeze cùng user -> trạng thái cuối đúng.
50. Event outbox publish retry -> không phát event trùng.

### D. Anti-dup (51-60)
51. Duplicate interaction_id -> block.
52. Duplicate idempotency_key -> trả kết quả cũ.
53. Duplicate reward_claim key -> reject.
54. Duplicate instance_uuid insert -> DB reject.
55. Duplicate order_nonce -> purchase reject.
56. Duplicate trade finalize -> no-op.
57. Duplicate battle settle -> no-op.
58. Duplicate quest completion event -> progress không nhân đôi.
59. Duplicate achievement claim -> reject.
60. Duplicate compensation tx ref -> reject.

### E. Anti-spam (61-66)
61. 10 lệnh/giây user -> bị rate-limit.
62. 100 lệnh/10s guild -> bucket guild kích hoạt.
63. Spam button minigame -> component disabled.
64. Spam transfer -> cooldown fail.
65. Spam trade invite -> auto mute command.
66. Spam refresh shop -> cooldown + fee áp dụng.

### F. Anti-abuse (67-74)
67. Vòng transfer 3 acc alt -> score tăng, auto-limit.
68. PvP gặp cùng đối thủ >3 lần/ngày -> reward giảm 0.
69. Farm surrender nhanh 20 lần -> không có progress quest battle.
70. Macro delay cố định 200ms -> flag suspicious.
71. New account <7 ngày transfer -> blocked.
72. Trade bất thường giá thấp cực đoan -> flag AML.
73. Multi-account login pattern -> risk score tăng.
74. Admin thử chỉnh tay balance (không qua tool) -> bị audit cảnh báo.

### G. Economy integrity (75-80)
75. Tổng faucet-sink ngày tính đúng.
76. Không có ví âm sau 10k giao dịch giả lập.
77. Fee transfer vào sink account đúng.
78. Minigame EV sau 100k phiên nằm trong ngưỡng thiết kế.
79. Giá shop DemandCoef nằm [0.9,1.15].
80. Inflation tuần <=3% trong mô phỏng.

### H. Inventory/Pet/Battle/Shop/Social/Admin/Recovery (81-100)
81. Hunt->inventory->sell end-to-end pass.
82. Fish->inventory->sell end-to-end pass.
83. Buy equip->inventory->equip->battle pass.
84. Pet in team -> sell fail.
85. Transfer fee theo level pass.
86. Double click button không nhân đôi kết quả.
87. Quest claim không claim 2 lần.
88. Purchase không bị nhân đôi.
89. Trade confirm race không dup item.
90. Cooldown bypass fail.
91. Reconnect không nhận reward 2 lần.
92. Shop owned-state hiển thị đúng sau mua.
93. Buff hết hạn đúng giờ.
94. Admin freeze chặn mọi mutate command.
95. Rollback compensation hoàn nguyên chính xác.
96. Backup restore không mất ledger.
97. Integrity scan phát hiện orphan records.
98. Cache stale tự invalid khi version lệch.
99. Outbox retry sau crash không mất sự kiện.
100. Full regression qua closed-beta checklist pass.

---

## PHẦN 24 — ACCEPTANCE CRITERIA

### Definition of Done (DoD) theo hệ
- Economy: 0 giao dịch âm, 0 duplicate tx, reconciliation pass 100%.
- Inventory: không thể bán item equipped/locked/quest/team-lock.
- Quest/Achv: claim one-time tuyệt đối.
- Battle: reward settle one-shot, timeout xử lý đúng.
- Shop: không purchase dup khi concurrency 20.
- Social: trade/transfer tuân gating + fee + AML.

### QA pass criteria
- 100/100 test trên pass ở staging.
- P95 response < 700ms cho lệnh read, < 1.2s cho mutate.

### Release blockers
- Bất kỳ bug dup coin/item/reward.
- Bất kỳ đường bypass cooldown/rate-limit.
- Thiếu audit log admin action.

### Dấu hiệu chưa đủ an toàn
- xuất hiện ví âm
- chênh ledger và wallet snapshot
- reward_claim tăng bất thường

---

## PHẦN 25 — IMPLEMENTATION ROADMAP

1. **Foundation**: config, db connector, logging, error code.
2. **Core engine**: command pipeline, middleware rate-limit/idempotency.
3. **Economy + progression**: wallet/ledger/exp/level.
4. **Inventory + shop**: item state machine + purchase TX.
5. **Pets + battle**: pet data, team lock, battle resolver.
6. **Quests + achievements**: event-driven progress + claim.
7. **Hunting + fishing + minigame**: gather/casino with EV caps.
8. **Social + anti-abuse**: transfer/trade/duel + AML scoring.
9. **Polish + deploy**: help UX, dashboard, alerting, runbook.

Mỗi phase hoàn tất khi: test nhóm liên quan pass + không có blocker exploit.

---

## PHẦN 26 — CODEBASE BLUEPRINT

```text
src/
  app.ts
  bootstrap/
    loadConfig.ts
    registerCommands.ts
  interfaces/
    discord/
      handlers/
      embeds/
      components/
  application/
    commands/
    services/
    transactions/
  domain/
    entities/
    rules/
    valueObjects/
  infrastructure/
    db/
    cache/
    queue/
    logger/
  antiCheat/
    scoring/
    detectors/
  jobs/
    resetDaily.ts
    resetWeekly.ts
    integrityScan.ts
  tests/
    unit/
    integration/
    concurrency/
```

Thứ tự code MVP:
1) db + transaction manager
2) wallet/ledger service
3) inventory service
4) shop purchase
5) hunt/fish
6) quest claim
7) anti-dup middleware
8) battle settle

---

## PHẦN 27 — DEPLOYMENT & FINAL CHECKLIST

### Env/config/secrets
- `.env` theo môi trường dev/staging/prod tách biệt.
- Secrets qua Vault/SSM, không commit repo.

### Migrations/seed
- Migration forward-only, rollback bằng migration đảo có kiểm thử.
- Seed content versioned theo `content_versions`.

### Backup/restore
- Full backup DB mỗi 24h, binlog PITR 7 ngày.
- Test restore hàng tuần trên staging.

### Monitoring/alert
- Alert khi:
  - duplicate key errors tăng > ngưỡng
  - suspicious score spike
  - inflation > 3%/tuần
  - command error rate > 2%

### Discord rate-limit/shard
- Dùng queue gửi message + retry exponential backoff.
- Shard khi >2,000 guild active.

### Readiness
- Closed beta: pass top 20 test critical + no dup.
- Public release: pass 100 test + 7 ngày soak staging ổn định.

---

## PHẦN 28 — TOP RISKS & EXECUTION ORDER

### 28.1 Top 20 rủi ro lớn
1. Dup coin qua race transfer
2. Dup item qua trade confirm race
3. Duplicate reward claim UI/slash
4. Inventory desync
5. Stale cache ownership
6. Quest reset lệch timezone
7. Battle settle nhiều lần
8. Alt laundering rings
9. Macro farm hunt/fish
10. PvP boosting
11. Admin thao tác nhầm rollback
12. Migration làm mất dữ liệu
13. Ledger-wallet mismatch
14. Buff stack sai family
15. Shop stock âm
16. Event outbox mất sự kiện
17. Cooldown bypass bằng multi-client
18. Monitoring thiếu tín hiệu
19. Live patch phá balance
20. Không có runbook incident

### 28.2 Top 20 lỗi dev dễ mắc
1. Update wallet không lock
2. Thiếu idempotency ở mutate commands
3. Log không ghi ref_tx_id
4. Tin client state
5. Không kiểm tra team lock khi sell pet
6. Không dùng unique(order_nonce)
7. Dùng thời gian local thay UTC
8. Không clamp công thức damage
9. Không check ownership trước equip/use
10. Không chuẩn hóa error code
11. Dùng cache write-behind cho state critical
12. Không test concurrency
13. Quên audit admin actions
14. Sửa tay DB khi sự cố
15. Quest progress không chống duplicate events
16. Không cap EV minigame
17. Không cảnh báo anti-abuse false positive
18. Không có compensation tx
19. Không revalidate trước commit trade
20. Không snapshot trước hotfix lớn

### 28.3 Top 20 test bắt buộc trước closed beta
- #39, #41, #42, #51, #53, #54, #55, #57, #58, #59,
- #61, #67, #68, #75, #76, #81, #83, #84, #89, #91.

### 28.4 File-by-file build order MVP
1. `src/bootstrap/loadConfig.ts`
2. `src/infrastructure/db/mysql.ts`
3. `src/application/transactions/txManager.ts`
4. `src/domain/entities/Wallet.ts`
5. `src/application/services/walletService.ts`
6. `src/application/services/ledgerService.ts`
7. `src/domain/entities/InventoryItem.ts`
8. `src/application/services/inventoryService.ts`
9. `src/application/services/shopService.ts`
10. `src/application/services/huntFishService.ts`
11. `src/application/services/questService.ts`
12. `src/antiCheat/scoring/riskScoreService.ts`
13. `src/interfaces/discord/handlers/commandRouter.ts`
14. `src/interfaces/discord/embeds/errorEmbed.ts`
15. `src/jobs/integrityScan.ts`

### 28.5 Module implementation order MVP
Config -> DB/Tx -> RateLimit/Idempotency -> Economy -> Inventory -> Shop -> Hunt/Fish -> Quest -> Achievement -> Pet Team Lock -> Battle PvE -> Help -> Admin Logs -> Analytics.

