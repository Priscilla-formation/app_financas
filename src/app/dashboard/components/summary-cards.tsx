import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Transaction } from "@/types";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const receitas = transactions
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const despesas = transactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const saldo = receitas - despesas;

  const cards = [
    {
      label: "Receitas",
      value: receitas,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      valueColor: "text-emerald-600",
    },
    {
      label: "Despesas",
      value: despesas,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
      valueColor: "text-red-500",
    },
    {
      label: "Saldo",
      value: saldo,
      icon: Wallet,
      color: saldo >= 0 ? "text-blue-600" : "text-red-500",
      bg: saldo >= 0 ? "bg-blue-50" : "bg-red-50",
      border: saldo >= 0 ? "border-blue-100" : "border-red-100",
      valueColor: saldo >= 0 ? "text-blue-600" : "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className={`border ${card.border} dark:border-slate-700 dark:bg-slate-800 shadow-sm`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</span>
                <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${card.color}`} size={18} />
                </div>
              </div>
              <p className={`text-2xl font-extrabold ${card.valueColor} tracking-tight`}>
                {formatCurrency(card.value)}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {transactions.filter((t) => t.type === (card.label === "Receitas" ? "receita" : card.label === "Despesas" ? "despesa" : t.type)).length}{" "}
                {card.label === "Saldo" ? `transaç${transactions.length === 1 ? "ão" : "ões"} no período` : `transaç${transactions.filter((t) => t.type === (card.label === "Receitas" ? "receita" : "despesa")).length === 1 ? "ão" : "ões"}`}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
