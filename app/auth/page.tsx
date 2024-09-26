"use client";
import { Button } from "@/components/shadcn/button";
import { createClient } from "@/utils/supabase/client";

const LoginPage = () => {
  const supabase = createClient();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="outline"
        onClick={async () => {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "apple",
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
          }
        }}
      >
        Continue With Apple
      </Button>
    </div>
  );
};

export default LoginPage;
