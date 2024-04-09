import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isThereClientSession = async () => {
  const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const user = session?.user;
  return { supabase, session, user };
};
