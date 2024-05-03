export interface Voucher {
  id: number;
  created_at: string;
  user_id: string;
  used: number;
  active: boolean;
  start: string;
  end: string;
  voucher_type: {
    id: number;
    name: string;
    description: string;
  };
}

export interface VoucherType {
  created_at: string;
  description: string | null;
  id: number;
  name: string | null;
  redeem_message: string | null;
  uses_per_voucher: number | null;
}

export interface User {
  id: string;
  email: string;
}
