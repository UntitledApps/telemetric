"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

import { OTPInput } from "input-otp";
import OtpInput from "@/components/ui/otpinput/otpinput";
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
      router.push("/dashboard");
    }
  };

  // Use useEffect to check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const sendOtpToEmail = async () => {
    setIsLoading(true);
    // Simulate sending OTP to email

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    setIsCodeSent(true);
    setIsLoading(false);
  };

  const handleVerifyCode = async () => {
    // Simulate verifying the OTP
    setIsLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full px-4" style={{ maxWidth: "400px" }}>
        <div className="grid ">
          <div>
            <h1>{isCodeSent ? "Enter OTP" : "Login to Telemetric"}</h1>
            <p>
              {isCodeSent
                ? "Please enter the code sent to your email."
                : "Welcome! Please enter your email and password to continue."}
            </p>
          </div>
          <form
            onSubmit={
              isCodeSent
                ? (e) => {
                    e.preventDefault();
                    handleVerifyCode();
                  }
                : (e) => {
                    e.preventDefault();
                    sendOtpToEmail();
                  }
            }
            className="grid gap-4"
          >
            {!isCodeSent ? (
              <>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
              </>
            ) : (
              <>
                <OtpInput
                  onChange={(value) => {
                    setOtp(value);
                    if (value.length === 6) {
                      handleVerifyCode();
                    }
                  }}
                  length={6}
                />
              </>
            )}
          </form>
          {message && <p>{message}</p>} {/* Display message if any */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
