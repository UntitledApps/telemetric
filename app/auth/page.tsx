"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import "@/components/ui/input/input.css"; // Import your CSS file
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

const Message = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success";
}) => {
  return (
    <p
      style={{
        color: "var(--secondary )",
        textAlign: "center",
        fontSize: "12px",
      }}
    >
      {message}
    </p>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState(""); // {{ edit_1 }}
  const [password, setPassword] = useState(""); // {{ edit_2 }}
  const [isLoading, setIsLoading] = useState(false); // {{ edit_3 }}
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null); // {{ edit_4 }}
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
    setMessage({
      message: "Verifying code...",
      type: "success",
    });
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: value,
      type: "email",
    });

    if (error) {
      setMessage({
        message:
          "This ain't the code we're looking for. Try again." +
          " " +
          error.message,
        type: "error",
      });
      setOtp(""); // Clear the OTP input
      // Set focus back to the first input after 10ms
      setTimeout(() => {
        setOtp(""); // Clear the OTP input
      }, 10);
    } else {
      setMessage({
        message: "Signing in...",
        type: "success",
      });
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (userId) {
        const { data: existingUser, error: fetchError } = await supabase
          .from("customers")
          .select()
          .eq("id", userId)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("Error fetching user data:", fetchError);
          setMessage({
            message: "Something went wrong. Please try again.",
            type: "error",
          });
        } else if (!existingUser) {
          const { error: insertError } = await supabase
            .from("users")
            .insert({ id: userId });

          if (insertError) {
            console.error("Error inserting user data:", insertError);
            setMessage({
              message: "Something went wrong. Please try again.",
              type: "error",
            });
          } else {
            setMessage({
              message: "Signing in...",
              type: "success",
            });
            router.push("/");
          }
        } else {
          setMessage({
            message: "Signing in...",
            type: "success",
          });
          router.push("/");
        }
      } else {
        setMessage({
          message: "User ID not found. Please try again.",
          type: "error",
        });
      }
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
        backgroundColor: "var(--dominant)",
      }}
    >
      <div style={{ maxWidth: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <p
              style={{
                color: "var(--secondary)",
                fontSize: "14px",
                textAlign: "start",
              }}
            >
              {isCodeSent
                ? "Code has been sent! Give it a few minutes to arrive and then enter the code you received down below. It might land in your spam folder."
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    color: "var(--secondary)",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Quickly access your email client
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    window.open("https://mail.google.com", "_blank")
                  }
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    gap: "10px",
                    color: "var(--secondary)",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <Image
                    src="/images/gmail.webp"
                    alt="Gmail"
                    width={20}
                    height={14}
                  />
                  Open Gmail
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    window.open("https://outlook.live.com/mail/0/", "_blank")
                  }
                  style={{
                    flex: 1,
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--secondary)",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <Image
                    src="/images/outlook.webp"
                    alt="Outlook"
                    width={22}
                    height={20}
                  />
                  Open Outlook
                </Button>
              </div>
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
          {message && <Message message={message.message} type={message.type} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
