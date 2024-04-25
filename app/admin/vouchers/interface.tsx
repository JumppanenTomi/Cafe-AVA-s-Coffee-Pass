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

export interface UpdatedVouchers {
  id: string | null;
  used: number | null;
  active: boolean | null;
  name: string | null;
  uses_per_voucher: number | null;
}

export interface VoucherType {
  voucher_id: number;
  name: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
}

