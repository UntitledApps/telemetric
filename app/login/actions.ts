"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      // current page ,
      emailRedirectTo: "http://localhost:3000",
    },
  });

  if (error) {
    redirect("/error");
  }
}

//verify otp
export async function verifyOtp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    otp: formData.get("otp") as string,
  };

  const { error } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });

  if (error) {
    redirect("/error");
  }

  const { data: { user } } = await supabase.auth.getUser();

  supabase.from("customers").upsert([
    {
      id: user?.id,
      createdAt: new Date(),
    },
  ]);

  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
