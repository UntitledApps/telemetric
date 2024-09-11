"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const supabase = createClient();
  useEffect(() => {
    const autoLoginWithGoogle = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Error logging in with Google:", error);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        supabase.from("customers").upsert([
          {
            id: user?.id,
            createdAt: new Date(),
          },
        ]);
        redirect("/dashboard");
      }
    };

    autoLoginWithGoogle();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Sign in with Google</h1>
      {/* Add your login form or UI here */}
    </div>
  );
};

export default LoginPage;
