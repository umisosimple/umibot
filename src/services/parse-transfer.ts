import { AppError } from '../domain/errors/app-error.js';

export function parseTransferAmount(raw: string | undefined): number {
  const amount = Number(raw ?? '');
  if (!Number.isFinite(amount) || !Number.isInteger(amount) || amount <= 0) {
    throw new AppError('UMI-ECO-400', 'Số tiền chuyển không hợp lệ.');
  }
  return amount;
}
