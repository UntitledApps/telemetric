"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import LoadingIndicator from "@/components/utils/loading";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const LoginPage = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: window.location.origin + "/app",
      },
    });

    setIsLoading(false);
    if (error) {
      console.error("Error:", error.message);
    } else {
      setButtonText("Check your inbox!");
      toast("Check your inbox for the magic link.", {});
    }
  }

  return (
    <div
      className="w-full lg:grid lg:grid-cols-2"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="flex items-center justify-center py-12 ">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login to Telemetric</h1>
            <p className="text-balance text-muted-foreground">
              You can either continue with your social account or use your email
              to sign in.
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const {} = supabase.auth.signInWithOAuth({
                  provider: "apple",
                });
              }}
            >
              <Image
                src="/images/apple.png"
                alt="Apple Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue With Apple
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const {} = supabase.auth.signInWithOAuth({
                  provider: "google",
                });
              }}
            >
              <Image
                src="/images/google.svg"
                alt="Google Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue With Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const {} = supabase.auth.signInWithOAuth({
                  provider: "twitter",
                });
              }}
            >
              <Image
                src="/images/x.svg"
                alt="X Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue With X
            </Button>
            <Button
              onClick={() => {
                const {} = supabase.auth.signInWithOAuth({
                  provider: "github",
                });
              }}
              variant="outline"
              className="w-full"
            >
              <Image
                src="/images/github.svg"
                alt="GitHub Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue With GitHub
            </Button>
            <p className="text-sm text-gray-500 text-center">or</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <LoadingIndicator color="#FFFFFF" />
                  ) : (
                    buttonText || "Send Magic Link"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:block"
        style={{
          height: "100vh",
          backgroundColor: "#E5F2FF",
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
