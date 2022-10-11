// generated from https://supabase-schema.vercel.app/
export interface Profiles {
  id: string /* primary key */
  username?: string
  avatar_url?: string
  name?: string
  created_at?: string
  subdomain?: string
  domains: Domains
  posts: Posts[]
}

export interface Domains {
  user_id?: string /* foreign key to profiles.id */
  url: string /* primary key */
  active?: boolean
  created_at?: string
  profiles?: Profiles
}

export interface Posts {
  id: string /* primary key */
  author_id?: string /* foreign key to profiles.id */
  created_at?: string
  slug?: string
  title?: string
  body?: string
  cover_img?: string
  active?: boolean
  tags?: string[]
  profiles?: Profiles
}

export interface Tags {
  name: string
  count: number
}
