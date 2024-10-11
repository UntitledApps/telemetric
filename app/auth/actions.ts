"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utilsss/supabase/server";

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}
