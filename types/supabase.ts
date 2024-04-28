export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      all_vouchers: {
        Row: {
          active: boolean | null
          created_at: string
          end_date: string | null
          end_time: string | null
          id: string
          start_date: string | null
          start_time: string | null
          used: number | null
          user_id: string | null
          voucher_type: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          end_date?: string | null
          end_time?: string | null
          id?: string
          start_date?: string | null
          start_time?: string | null
          used?: number | null
          user_id?: string | null
          voucher_type?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          end_date?: string | null
          end_time?: string | null
          id?: string
          start_date?: string | null
          start_time?: string | null
          used?: number | null
          user_id?: string | null
          voucher_type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_private_voucher_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_private_voucher_voucher_type_fkey"
            columns: ["voucher_type"]
            isOneToOne: false
            referencedRelation: "voucher_type"
            referencedColumns: ["id"]
          },
        ]
      }
      public_voucher_logs: {
        Row: {
          created_at: string
          id: number
          public_voucher_id: number | null
          used_per_user: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          public_voucher_id?: number | null
          used_per_user?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          public_voucher_id?: number | null
          used_per_user?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_public_voucher_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_voucher_logs_public_voucher_id_fkey"
            columns: ["public_voucher_id"]
            isOneToOne: false
            referencedRelation: "public_vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      public_vouchers: {
        Row: {
          created_at: string
          end_date: string | null
          end_time: string | null
          id: number
          start_date: string | null
          start_time: string | null
          used: number | null
          voucher_id: number | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          end_time?: string | null
          id?: number
          start_date?: string | null
          start_time?: string | null
          used?: number | null
          voucher_id?: number | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          end_time?: string | null
          id?: number
          start_date?: string | null
          start_time?: string | null
          used?: number | null
          voucher_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_vouchers_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "voucher_type"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          desc: string | null
          id: number
          key: string
          readableName: string
          value: string | null
        }
        Insert: {
          desc?: string | null
          id?: number
          key: string
          readableName: string
          value?: string | null
        }
        Update: {
          desc?: string | null
          id?: number
          key?: string
          readableName?: string
          value?: string | null
        }
        Relationships: []
      }
      stamp_logs: {
        Row: {
          is_used: boolean
          stamp_log_id: number
          timestamp: string
          user_id: string
        }
        Insert: {
          is_used?: boolean
          stamp_log_id?: number
          timestamp?: string
          user_id: string
        }
        Update: {
          is_used?: boolean
          stamp_log_id?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stamp_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      temp_codes: {
        Row: {
          code: string
          created_at: string
          id: number
          used: boolean
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          used?: boolean
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          used?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_temp_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          email: string
          id: number
          last_sign_in_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          email: string
          id?: number
          last_sign_in_at?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          email?: string
          id?: number
          last_sign_in_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher_logs: {
        Row: {
          timestamp: string | null
          user_id: string
          voucher_id: number
          voucher_log_id: number
        }
        Insert: {
          timestamp?: string | null
          user_id: string
          voucher_id: number
          voucher_log_id?: number
        }
        Update: {
          timestamp?: string | null
          user_id?: string
          voucher_id?: number
          voucher_log_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "voucher_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_logs_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["voucher_id"]
          },
        ]
      }
      voucher_type: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          redeem_message: string | null
          uses_per_voucher: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          redeem_message?: string | null
          uses_per_voucher?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          redeem_message?: string | null
          uses_per_voucher?: number | null
        }
        Relationships: []
      }
      vouchers: {
        Row: {
          description: string | null
          end_date: string
          name: string
          stamps_required: number
          start_date: string
          uses_per_user: number | null
          voucher_id: number
        }
        Insert: {
          description?: string | null
          end_date: string
          name: string
          stamps_required: number
          start_date: string
          uses_per_user?: number | null
          voucher_id?: number
        }
        Update: {
          description?: string | null
          end_date?: string
          name?: string
          stamps_required?: number
          start_date?: string
          uses_per_user?: number | null
          voucher_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      delete_temp_codes_rows: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_private_voucher: {
        Args: {
          p_voucher_type: number
          p_user_id: string
        }
        Returns: undefined
      }
      increment_public_voucher: {
        Args: {
          p_voucher_id: number
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "owner" | "barista" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
