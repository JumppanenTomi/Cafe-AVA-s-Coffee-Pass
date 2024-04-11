export interface VoucherType {
  voucher_id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  uses_per_user: number | null;
  stamps_required: number;
}