export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      domains: {
        Row: {
          active: boolean | null
          created_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          url?: string
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          active: boolean | null
          author_id: string | null
          body: string | null
          cover_img: string | null
          created_at: string | null
          featured: boolean
          id: string
          slug: string
          tags: string[] | null
          title: string | null
        }
        Insert: {
          active?: boolean | null
          author_id?: string | null
          body?: string | null
          cover_img?: string | null
          created_at?: string | null
          featured?: boolean
          id?: string
          slug: string
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          active?: boolean | null
          author_id?: string | null
          body?: string | null
          cover_img?: string | null
          created_at?: string | null
          featured?: boolean
          id?: string
          slug?: string
          tags?: string[] | null
          title?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string | null
          subdomain: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          name?: string | null
          subdomain?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          subdomain?: string | null
          username?: string | null
        }
      }
    }
    Views: {
      tags_view: {
        Row: {
          count: number | null
          name: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
