import type { Database } from "~/utils/database.types";
export const useSupabase = () => useSupabaseClient<Database>();
