export interface VoucherType {
  id: number;
  name: string;
  description: string | null;
  redeem_message: string | null;
  uses_per_voucher: number | null;
}