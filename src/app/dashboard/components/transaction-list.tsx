"use client";

import { useState } from "react";
import { deleteTransaction } from "@/lib/actions";
import { TransactionForm } from "./transaction-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import type { Transaction } from "@/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useLanguage } from "@/components/language-provider";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Salário": "bg-emerald-100 text-emerald-700",
  "Transferência de Priscilla": "bg-teal-100 text-teal-700",
  "Transferência de Andrea": "bg-cyan-100 text-cyan-700",
  "Pgto Lote em Gostoso": "bg-orange-100 text-orange-700",
  "Pgto Advogada": "bg-purple-100 text-purple-700",
  "Pgto Taxas Fiscais": "bg-red-100 text-red-700",
  "Pgto Taxas": "bg-rose-100 text-rose-700",
  "Outros": "bg-gray-100 text-gray-700",
};

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await deleteTransaction(deletingId);
      toast({ title: t.successDelete });
    } catch {
      toast({ title: t.errorDelete, variant: "destructive" });
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-sm">{t.dashboard.noTransactions}<br />{t.dashboard.noTransactionsHint}</p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 py-3.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors group"
          >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              tx.type === "receita" ? "bg-emerald-100" : "bg-red-100"
            }`}>
              {tx.type === "receita"
                ? <TrendingUp className="w-4 h-4 text-emerald-600" />
                : <TrendingDown className="w-4 h-4 text-red-500" />
              }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{tx.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {format(parseISO(tx.date), "dd MMM yyyy", { locale: ptBR })}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-500 ${CATEGORY_COLORS[tx.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {tx.category}
                </span>
              </div>
            </div>

            {/* Amount */}
            <p className={`text-sm font-700 shrink-0 ${tx.type === "receita" ? "text-emerald-600" : "text-red-500"}`}>
              {tx.type === "receita" ? "+" : "-"}
              {formatCurrency(Number(tx.amount))}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setEditingTransaction(tx)}
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                onClick={() => setDeletingId(tx.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editingTransaction && (
        <TransactionForm
          open={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          transaction={editingTransaction}
        />
      )}

      {/* Delete confirmation */}
      <Dialog open={!!deletingId} onOpenChange={(v) => !v && setDeletingId(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl dark:bg-slate-800 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-base font-700 text-slate-900 dark:text-white">{t.deleteTitle}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.deleteDesc}</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeletingId(null)} className="rounded-xl dark:border-slate-600 dark:text-slate-300">
              {t.deleteCancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl"
            >
              {deleting ? t.deleting : t.deleteConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
