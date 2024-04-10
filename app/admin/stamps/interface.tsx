export interface Stamp {
  stamp_log_id: number;
  timestamp: string;
  user_id: string;
  is_used: boolean;
}

export interface User {
  id: string;
  email: string;
}
