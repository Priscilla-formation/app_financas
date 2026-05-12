"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TransactionForm } from "./transaction-form";
import { TransactionList } from "./transaction-list";
import { SummaryCards } from "./summary-cards";
import { CategoryChart } from "./category-chart";
import { Filters } from "./filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Transaction } from "@/types";

interface DashboardClientProps {
  transactions: Transaction[];
  userEmail: string;
}

export function DashboardClient({ transactions, userEmail }: DashboardClientProps) {
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  const month = Number(searchParams.get("month") ?? new Date().getMonth() + 1);
  const year = Number(searchParams.get("year") ?? new Date().getFullYear());
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search") ?? "";

  const filtered = transactions.filter((t) => {
    const d = new Date(t.date + "T00:00:00");
    if (d.getMonth() + 1 !== month || d.getFullYear() !== year) return false;
    if (category !== "all" && t.category !== category) return false;
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const MONTH_NAMES = [
    "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {MONTH_NAMES[month]} {year} · {userEmail}
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-600 rounded-xl h-10 px-5 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Transação
        </Button>
      </div>

      {/* Summary Cards */}
      <SummaryCards transactions={filtered} />

      {/* Chart + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="lg:col-span-1">
          <CategoryChart transactions={filtered} />
        </div>

        {/* Transaction list */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-700 dark:text-slate-200">Transações</CardTitle>
                <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 rounded-full px-2.5 py-1">
                  {filtered.length} {filtered.length === 1 ? "item" : "itens"}
                </span>
              </div>
              <div className="mt-3">
                <Filters transactions={filtered} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <TransactionList transactions={filtered} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New transaction modal */}
      <TransactionForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
