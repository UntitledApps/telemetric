"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}

