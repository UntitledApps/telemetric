"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { login } from "../login/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      await login(formData);
      setIsSuccess(true);
    } catch (error) {
      // Handle error accordingly
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailValid =
    email.length > 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full "
        style={{
          maxWidth: "350px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <Button
          type="submit"
          disabled={!isEmailValid || isSubmitting || isSuccess}
          style={{
            width: "100%",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : isSuccess ? (
            "Check your inbox"
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
}
