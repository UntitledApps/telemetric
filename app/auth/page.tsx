"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // {{ edit_1 }}
  const [password, setPassword] = useState(""); // {{ edit_2 }}
  const [isLoading, setIsLoading] = useState(false); // {{ edit_3 }}
  const [message, setMessage] = useState(""); // {{ edit_4 }}
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    // {{ edit_5 }}
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // {{ edit_6 }}

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      // Optionally redirect or perform other actions
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full px-4" style={{ maxWidth: "400px" }}>
        <div className="grid ">
          <div>
            <h1>Login to Telemetric</h1>
            <p>Welcome! Please enter your email and password to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              style={{ width: "100%" }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {message && <p>{message}</p>} {/* Display message if any */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
