"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import OtpInput from "@/components/ui/otpinput";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  // sent otp
  const [sentOtp, setSentOtp] = useState(false);
  const [buttonText, setButtonText] = useState("Send Code"); // {{ edit_1 }}
  const [emailCount, setEmailCount] = useState(0); // {{ edit_1 }}
  const [lastSentTime, setLastSentTime] = useState<number | null>(null); // {{ edit_2 }}
  const MAX_EMAILS_PER_DAY = 10; // {{ edit_3 }}
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (data?.user && !error) {
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const supabase = createClient();
    const currentTime = Date.now(); // Moved here for reuse
    const oneDay = 24 * 60 * 60 * 1000; // Moved here for reuse

    // Check if the email has already reached the limit
    const storedEmail = localStorage.getItem("emailSent");
    const emailSent = storedEmail ? JSON.parse(storedEmail) : {};

    if (emailSent[email]) {
      if (
        emailSent[email].count >= MAX_EMAILS_PER_DAY &&
        currentTime - emailSent[email].lastSentTime < oneDay
      ) {
        toast.error("You have reached the limit of resending codes for today."); // {{ edit_5 }}
        setIsLoading(false);
        return;
      }
    }

    if (sentOtp) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "email",
        });
        if (error) throw error;
        toast.success("Code verified successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Error:", error);
        setMessage("Error verifying the code. Please try again.");
        toast.error("Error verifying the code. Please try again.");
      }
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw error;

      setMessage("Check your email for the login link!");
      setButtonText("Check your inbox"); // {{ edit_2 }}
      setIsButtonDisabled(true);
      setIsLoading(false);
      setSentOtp(true);

      // Disable button for 5 seconds
      setTimeout(() => {
        setButtonText("Verify Code");
        setIsButtonDisabled(false);
      }, 5000);

      // Update email sent count in local storage
      if (!emailSent[email]) {
        emailSent[email] = { count: 1, lastSentTime: currentTime };
      } else {
        emailSent[email].count += 1;
        emailSent[email].lastSentTime = currentTime;
      }
      localStorage.setItem("emailSent", JSON.stringify(emailSent));
    } catch (error) {
      setMessage("Error sending the login link. Please try again.");
      console.error("Error:", error);
      setIsLoading(false); // Ensure loading is false on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full px-4" style={{ maxWidth: "400px" }}>
        <div className="grid ">
          <div>
            <h1>Continue to Telemetric</h1>
            <p className="">
              Welcome! Enter your email to continue and we'll send a
              verification code to your email.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            {sentOtp && (
              <OtpInput
                length={6}
                onChange={(otp: string) => {
                  setOtp(otp);
                }}
              />
            )}
            {!sentOtp && (
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            )}
            <Button
              type="submit"
              disabled={isLoading || buttonDisabled}
              loading={isLoading}
              style={{ width: "100%" }}
            >
              {isLoading ? "Sending..." : buttonText}
            </Button>
          </form>
          {sentOtp && !buttonDisabled && (
            <div className="flex justify-center">
              <Button
                variant="text"
                onClick={handleLogin} // Updated to call handleLogin for resending
                style={{ marginTop: "1rem" }}
              >
                Resend Code
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
