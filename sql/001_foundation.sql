CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(32) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at DATETIME(3) NOT NULL DEFAULT UTC_TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS wallets (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  balance DECIMAL(18,2) NOT NULL DEFAULT 0,
  updated_at DATETIME(3) NOT NULL DEFAULT UTC_TIMESTAMP(3),
  CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT chk_wallet_balance_non_negative CHECK (balance >= 0)
);

CREATE TABLE IF NOT EXISTS economy_transactions (
  tx_id CHAR(36) PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(18,2) NOT NULL,
  balance_after DECIMAL(18,2) NOT NULL,
  ref_id VARCHAR(64) NOT NULL,
  idempotency_key VARCHAR(128) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT UTC_TIMESTAMP(3),
  CONSTRAINT fk_tx_user FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY uq_tx_idempotency (idempotency_key),
  INDEX idx_tx_user_created (user_id, created_at)
);
