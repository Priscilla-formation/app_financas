"use client";

import { useState } from "react";
import { deleteTransaction } from "@/lib/actions";
import { TransactionForm } from "./transaction-form";
import { Badge } from "@/components/ui/badge";
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

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Alimentação": "bg-orange-100 text-orange-700",
  "Transporte": "bg-blue-100 text-blue-700",
  "Moradia": "bg-slate-100 text-slate-700",
  "Lazer": "bg-purple-100 text-purple-700",
  "Saúde": "bg-red-100 text-red-700",
  "Educação": "bg-indigo-100 text-indigo-700",
  "Salário": "bg-emerald-100 text-emerald-700",
  "Freelance": "bg-teal-100 text-teal-700",
  "Outros": "bg-gray-100 text-gray-700",
};

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { toast } = useToast();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await deleteTransaction(deletingId);
      toast({ title: "Transação excluída." });
    } catch {
      toast({ title: "Erro ao excluir.", variant: "destructive" });
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-sm">Nenhuma transação encontrada.<br />Adicione a primeira transação acima.</p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 py-3.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors group"
          >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              t.type === "receita" ? "bg-emerald-100" : "bg-red-100"
            }`}>
              {t.type === "receita"
                ? <TrendingUp className="w-4 h-4 text-emerald-600" />
                : <TrendingDown className="w-4 h-4 text-red-500" />
              }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{t.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {format(parseISO(t.date), "dd MMM yyyy", { locale: ptBR })}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-500 ${CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {t.category}
                </span>
              </div>
            </div>

            {/* Amount */}
            <p className={`text-sm font-700 shrink-0 ${t.type === "receita" ? "text-emerald-600" : "text-red-500"}`}>
              {t.type === "receita" ? "+" : "-"}
              {formatCurrency(Number(t.amount))}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setEditingTransaction(t)}
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                onClick={() => setDeletingId(t.id)}
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
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-700 text-slate-900">Excluir transação?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500">Esta ação não pode ser desfeita.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeletingId(null)} className="rounded-xl">
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl"
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
