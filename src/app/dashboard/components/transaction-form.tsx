"use client";

import { useState } from "react";
import { createTransaction, updateTransaction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Transaction, TransactionFormData, Category } from "@/types";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/types";
import { useLanguage } from "@/components/language-provider";

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

export function TransactionForm({ open, onClose, transaction }: TransactionFormProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const f = t.form;
  const isEdit = !!transaction;

  const [type, setType] = useState<"receita" | "despesa">(transaction?.type ?? "despesa");
  const [description, setDescription] = useState(transaction?.description ?? "");
  const [amount, setAmount] = useState(transaction ? String(transaction.amount) : "");
  const [date, setDate] = useState(transaction?.date ?? new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<Category>(transaction?.category ?? "Outros");
  const [loading, setLoading] = useState(false);

  const availableCategories = type === "receita" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(newType: "receita" | "despesa") {
    setType(newType);
    const cats = newType === "receita" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!cats.includes(category)) {
      setCategory(cats[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData: TransactionFormData = {
      description,
      amount: parseFloat(amount),
      date,
      type,
      category,
    };

    try {
      if (isEdit && transaction) {
        await updateTransaction(transaction.id, formData);
        toast({ title: f.successUpdate });
      } else {
        await createTransaction(formData);
        toast({ title: f.successCreate });
      }
      onClose();
    } catch {
      toast({ title: f.errorSave, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl dark:bg-slate-800 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-700 text-slate-900 dark:text-white">
            {isEdit ? f.editTitle : f.newTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Type */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleTypeChange("receita")}
              className={`py-2.5 rounded-xl text-sm font-600 border transition-all ${
                type === "receita"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-300"
              }`}
            >
              {f.income}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("despesa")}
              className={`py-2.5 rounded-xl text-sm font-600 border transition-all ${
                type === "despesa"
                  ? "bg-red-500 text-white border-red-500 shadow-sm"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-red-300"
              }`}
            >
              {f.expense}
            </button>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-500 text-slate-700 dark:text-slate-300">{f.description}</Label>
            <Input
              id="description"
              placeholder={f.descPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-10"
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-sm font-500 text-slate-700 dark:text-slate-300">{f.amount}</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder={f.amountPlaceholder}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-10"
            />
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-sm font-500 text-slate-700 dark:text-slate-300">{f.date}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-10"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-sm font-500 text-slate-700 dark:text-slate-300">{f.category}</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger className="rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-slate-200 dark:border-slate-600 dark:text-slate-300"
            >
              {f.cancel}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={`flex-1 rounded-xl font-600 ${
                type === "receita"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEdit ? f.save : f.add}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
