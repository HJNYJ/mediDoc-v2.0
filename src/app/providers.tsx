"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { supabase } from "@/api/supabase";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function Providers({
  children
}: React.PropsWithChildren<NonNullable<unknown>>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        {children}
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
