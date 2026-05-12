import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { getTransactions } from "@/lib/actions";
import { DashboardClient } from "./components/dashboard-client";

interface DashboardPageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const params = await searchParams;
  const now = new Date();
  const month = Number(params.month ?? now.getMonth() + 1);
  const year = Number(params.year ?? now.getFullYear());
  const category = params.category ?? "all";
  const search = params.search ?? "";

  const transactions = await getTransactions({ month, year, category, search });

  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-400 text-sm">Carregando...</div>}>
      <DashboardClient transactions={transactions} userEmail={user.email ?? ""} />
    </Suspense>
  );
}
