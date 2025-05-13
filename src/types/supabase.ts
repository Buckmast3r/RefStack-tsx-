export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          role: 'user' | 'pro' | 'admin'
          subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
          subscription_id: string | null
          customer_id: string | null
          custom_domain: string | null
          theme: 'light' | 'dark' | 'system'
          email_notifications: boolean
          marketing_emails: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          role?: 'user' | 'pro' | 'admin'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
          subscription_id?: string | null
          customer_id?: string | null
          custom_domain?: string | null
          theme?: 'light' | 'dark' | 'system'
          email_notifications?: boolean
          marketing_emails?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          role?: 'user' | 'pro' | 'admin'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
          subscription_id?: string | null
          customer_id?: string | null
          custom_domain?: string | null
          theme?: 'light' | 'dark' | 'system'
          email_notifications?: boolean
          marketing_emails?: boolean
        }
      }
      referrals: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          url: string
          image_url: string | null
          clicks: number
          views: number
          is_active: boolean
          position: number
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          url: string
          image_url?: string | null
          clicks?: number
          views?: number
          is_active?: boolean
          position?: number
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          url?: string
          image_url?: string | null
          clicks?: number
          views?: number
          is_active?: boolean
          position?: number
          metadata?: Json | null
        }
      }
      clicks: {
        Row: {
          id: string
          created_at: string
          referral_id: string
          user_agent: string | null
          ip_address: string | null
          country: string | null
          city: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          referral_id: string
          user_agent?: string | null
          ip_address?: string | null
          country?: string | null
          city?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          referral_id?: string
          user_agent?: string | null
          ip_address?: string | null
          country?: string | null
          city?: string | null
          referrer?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 