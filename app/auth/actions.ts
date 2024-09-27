"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}

export async function loginWithOAuth(provider: Provider, redirectTo: string) {
  const supabase = createClient();
  console.log(redirectTo);

  await supabase.auth.signInWithOAuth({
    provider: provider,

    options: { redirectTo: redirectTo },
  });
}
