"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (data?.user && !error) {
        router.push("/app"); // Redirect to app if user is already logged in
      }
    };

    checkUser();
  }, [router]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw error;

      setMessage("Check your email for the login link!");
    } catch (error) {
      setMessage("Error sending the login link. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full lg:grid lg:grid-cols-2"
      style={{ overflow: "hidden" }}
    >
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px]">
          <div className="grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login to Telemetric</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email to receive a login link
              </p>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={!isLoading} loading={isLoading}>
                {isLoading ? "Sending..." : "Send Login Link"}
              </Button>
            </form>
            {message && <p className="text-center text-sm">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
