export interface Voucher {
  voucher_log_id: number;
  timestamp: string;
  user_id: string;
  voucher_id: string;
  vouchers: {
    name: string;
    description: string;
  };
}
