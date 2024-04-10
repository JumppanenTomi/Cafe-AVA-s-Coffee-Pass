export interface VoucherType {
  voucher_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  uses_per_user: number;
  stamps_required: number;
}