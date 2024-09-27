"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}
