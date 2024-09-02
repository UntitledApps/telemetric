"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const supabase = createClient();
  // Define the submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-email-contact",
        {
          body: { email: values.email, tags: "Telemetric Waitlist" },
        }
      );

      if (error) {
        new Error(error.message);
      }

      toast("You've been added to the waitlist! 🎉");

      // Optional: Handle success feedback, e.g., show a success message
    } catch (error) {
      console.error("There was a problem with the subscription:", error);

      // Optional: Handle error feedback, e.g., show an error message
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join the waitlist and get early access</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join the waitlist</Button>
      </form>
    </Form>
  );
}
