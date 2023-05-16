import type { Database }from "./database.types"
 

export type Profiles = Database["public"]["Tables"]["profiles"]["Row"] & {
  domains: Domains;
  posts: Posts[];
}

export type Domains = Database["public"]["Tables"]["domains"]["Row"] &  {
  profiles?: Profiles;
}

export type Posts = Database["public"]["Tables"]["posts"]["Row"] & { 
  profiles: Profiles 
}

export type Tags = Database["public"]["Views"]["tags_view"] 
