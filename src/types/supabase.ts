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
      agents: {
        Row: {
          id: string
          name: string
          description: string
          short_description: string | null
          logo_url: string | null
          website_url: string
          pricing_type: string | null
          pricing_starting_price: number | null
          pricing_currency: string | null
          pricing_url: string | null
          features: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          short_description?: string | null
          logo_url?: string | null
          website_url: string
          pricing_type?: string | null
          pricing_starting_price?: number | null
          pricing_currency?: string | null
          pricing_url?: string | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          short_description?: string | null
          logo_url?: string | null
          website_url?: string
          pricing_type?: string | null
          pricing_starting_price?: number | null
          pricing_currency?: string | null
          pricing_url?: string | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      agent_categories: {
        Row: {
          agent_id: string
          category_id: string
        }
        Insert: {
          agent_id: string
          category_id: string
        }
        Update: {
          agent_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_categories_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      agent_tags: {
        Row: {
          agent_id: string
          tag_id: string
        }
        Insert: {
          agent_id: string
          tag_id: string
        }
        Update: {
          agent_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tags_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          icon_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          icon_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          icon_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          display_name: string | null
          avatar_url: string | null
          role: string
          is_email_verified: boolean
          preferences: Json | null
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          is_email_verified?: boolean
          preferences?: Json | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          is_email_verified?: boolean
          preferences?: Json | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          user_id: string
          bio: string | null
          company: string | null
          job_title: string | null
          location: string | null
          website: string | null
          social_links: Json | null
          interests: string[] | null
          expertise: string[] | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          bio?: string | null
          company?: string | null
          job_title?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          interests?: string[] | null
          expertise?: string[] | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          bio?: string | null
          company?: string | null
          job_title?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          interests?: string[] | null
          expertise?: string[] | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
