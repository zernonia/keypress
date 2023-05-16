import type { Profiles } from "~~/utils/types";

export const useSubdomain = () => useState<string | null>("subdomain", () => null);
export const useSubdomainProfile = () => useState<Profiles | null>("subdomain-profile", () => null);
