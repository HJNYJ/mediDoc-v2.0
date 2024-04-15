"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "./browserClient";
import { Session } from "@supabase/supabase-js";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, []);

  return session;
};

export default useSession;
