"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Download } from "lucide-react";
import { CATEGORIES } from "@/types";
import type { Transaction } from "@/types";
import { useLanguage } from "@/components/language-provider";

interface FiltersProps {
  transactions: Transaction[];
}

function exportCSV(transactions: Transaction[]) {
  const headers = ["Data", "Descrição", "Tipo", "Categoria", "Valor (R$)"];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.type,
    t.category,
    Number(t.amount).toFixed(2).replace(".", ","),
  ]);

  const csvContent = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
  const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transacoes-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function Filters({ transactions }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const month = searchParams.get("month") ?? String(new Date().getMonth() + 1);
  const year = searchParams.get("year") ?? String(new Date().getFullYear());
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  function clearFilters() {
    const now = new Date();
    router.push(`${pathname}?month=${now.getMonth() + 1}&year=${now.getFullYear()}`);
  }

  const years = ["2030", "2029", "2028", "2027", "2026", "2025"];
  const hasActiveFilters = category !== "all" || search !== "";
  const monthNames = t.months.slice(1) as string[];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {/* Month */}
        <Select value={month} onValueChange={(v) => updateParam("month", v)}>
          <SelectTrigger className="w-36 h-9 rounded-lg border-slate-200 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {monthNames.map((m, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year */}
        <Select value={year} onValueChange={(v) => updateParam("year", v)}>
          <SelectTrigger className="w-24 h-9 rounded-lg border-slate-200 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category */}
        <Select value={category} onValueChange={(v) => updateParam("category", v)}>
          <SelectTrigger className="w-40 h-9 rounded-lg border-slate-200 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
            <SelectValue placeholder={t.dashboard.allCategories} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.dashboard.allCategories}</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 min-w-40">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input
            placeholder={t.dashboard.searchPlaceholder}
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            className="pl-9 h-9 rounded-lg border-slate-200 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400"
          />
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9 px-3 text-slate-500 hover:text-slate-700 rounded-lg"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            {t.dashboard.clear}
          </Button>
        )}

        {/* Export */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportCSV(transactions)}
          className="h-9 px-4 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 font-500 ml-auto dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          disabled={transactions.length === 0}
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          {t.dashboard.exportCsv}
        </Button>
      </div>
    </div>
  );
}
