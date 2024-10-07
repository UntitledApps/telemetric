"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import "@/components/ui/input/input.css"; // Import your CSS file
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // {{ edit_1 }}
  const [password, setPassword] = useState(""); // {{ edit_2 }}
  const [isLoading, setIsLoading] = useState(false); // {{ edit_3 }}
  const [message, setMessage] = useState(""); // {{ edit_4 }}
  const [isCodeSent, setIsCodeSent] = useState(false); // New state for OTP flow
  const [otp, setOtp] = useState(""); // New state for OTP input
  const supabase = createClient();
  const router = useRouter();

  const checkAuthStatus = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.push("/");
    }
  };

  // Use useEffect to check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const sendOtpToEmail = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    setIsCodeSent(true);
    setIsLoading(false);
  };

  const handleVerifyCode = async (value: string) => {
    console.log("value", value);
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: value,
      type: "email",
    });

    if (error) {
      setMessage(
        "This ain't the code we're looking for. Try again." +
          " " +
          error.message
      );
      setOtp(""); // Clear the OTP input
      // Set focus back to the first input after 10ms
      setTimeout(() => {
        setOtp(""); // Clear the OTP input
      }, 10);
    } else {
      const { data, error } = await supabase.from("users").upsert(
        {
          id: supabase.auth.getUser().then(({ data }) => data.user?.id),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("Error upserting user data:", error);
        setMessage(
          "Successfully logged in, but there was an error saving your data. Please try again."
        );
      } else {
        console.log("User data upserted successfully");
      }

      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 2000)
        );

      toast.promise(promise, {
        loading: "Logging in...",
        success: (data) => {
          return "Logged in!";
        },
        error: "Error",
      });
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <div>
            <p>
              {isCodeSent
                ? "Code has been sent! Give it a few minutes to arrive and then enter the code you received down below."
                : "Welcome! Enter your email and we'll send you a code to login."}
            </p>
          </div>
          {isCodeSent ? (
            <form>
              <OTPInput
                renderInput={(props: any, index: any) => (
                  <input
                    {...props}
                    className="input"
                    style={{
                      width: "20px",
                      height: "20px",
                      textAlign: "center",
                    }}
                  />
                )}
                value={otp}
                onChange={(value: any) => {
                  setOtp(value);
                  if (value.length === 6) {
                    handleVerifyCode(value); // Call handleVerifyCode directly
                  }
                }}
                numInputs={6}
                renderSeparator={<span style={{ margin: "0 5px" }}></span>}
                shouldAutoFocus={true} // Automatically focus on the first input
              />
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendOtpToEmail();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your coolest email address goes here"
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                style={{ width: "100%", height: "44px" }}
              >
                {isLoading ? "Sending code..." : "Send code"}
              </Button>
            </form>
          )}
          {message && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              {message}
            </p>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
