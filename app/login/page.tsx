"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { login, verifyOtp } from "../login/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [isApplePlatform, setIsApplePlatform] = useState(false);

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const isApple = /mac|iphone|ipad|ipod/.test(platform);
    setIsApplePlatform(isApple);
  }, []);
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmitEmail = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      await login(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitOtp = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      await verifyOtp(formData);
      setIsVerified(true);
    } catch (error) {
      console.error("OTP Verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailValid =
    email.length > 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const isOtpValid = otp.length === 6;

  return (
    <div className="flex flex-col lg:flex-row items-center min-h-screen">
      <div className="flex-1 lg:w-1/2 p-6">
        <form
          className=" p-6 w-full"
          style={{
            maxWidth: "350px",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!isSuccess) {
              const formData = new FormData(e.currentTarget);
              handleSubmitEmail(formData);
            } else if (isSuccess && isOtpValid) {
              handleSubmitOtp();
            }
          }}
        >
          {!isSuccess ? (
            <>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              />

              <Button
                type="submit"
                disabled={!isEmailValid || isSubmitting}
                style={{
                  width: "100%",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Sending code
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-700">
                A verification code has been sent to your email. Please enter
                the OTP below:
              </p>
              <InputOTP maxLength={6} onChange={handleOtpChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                type="submit"
                disabled={!isOtpValid || isSubmitting}
                style={{
                  width: "100%",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Verifying OTP
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm text-gray-700">
                  Quickly access your E-Mail client:
                </p>
                <Button
                  type="button"
                  variant={"outline"}
                  style={{
                    width: "100%",
                    gap: "5px",
                  }}
                  onClick={() =>
                    window.open("https://mail.google.com/", "_blank")
                  }
                >
                  <Image
                    src="/images/gmail.webp"
                    width={20}
                    height={20}
                    alt="Gmail"
                  />
                  Open Gmail
                </Button>

                <Button
                  type="button"
                  variant={"outline"}
                  style={{
                    width: "100%",
                    gap: "5px",
                  }}
                  onClick={() =>
                    window.open("https://outlook.live.com/owa/", "_blank")
                  }
                >
                  <Image
                    src="/images/outlook.webp"
                    width={20}
                    height={20}
                    alt="Outlook"
                  />
                  Open Outlook
                </Button>
                {isApplePlatform && (
                  <Button
                    type="button"
                    variant={"outline"}
                    style={{
                      width: "100%",
                      gap: "5px",
                    }}
                    onClick={() => window.open("message://", "_self")}
                  >
                    <Image
                      src="/images/apple_mail.webp"
                      width={20}
                      height={20}
                      alt="Apple Mail"
                    />{" "}
                    Open Apple Mail
                  </Button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
