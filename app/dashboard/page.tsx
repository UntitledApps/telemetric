import { DashboardLayout } from "@/components/DashboardLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <p>Hello {data.user.email}</p>
    </DashboardLayout>
  );
}
