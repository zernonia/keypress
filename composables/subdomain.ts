import type { Profiles } from "~~/utils/types"

export const useSubdomain = () => useState<string>("subdomain", () => null)
export const useProfile = () => useState<Profiles>("subdomain-profile", () => null)
