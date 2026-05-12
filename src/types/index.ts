export type TransactionType = "receita" | "despesa";

export type Category =
  | "Salário"
  | "Pgto Lote em Gostoso"
  | "Pgto Advogada"
  | "Pgto Taxas Fiscais"
  | "Pgto Taxas"
  | "Outros";

export const CATEGORIES: Category[] = [
  "Salário",
  "Pgto Lote em Gostoso",
  "Pgto Advogada",
  "Pgto Taxas Fiscais",
  "Pgto Taxas",
  "Outros",
];

export const INCOME_CATEGORIES: Category[] = ["Salário", "Outros"];
export const EXPENSE_CATEGORIES: Category[] = [
  "Pgto Lote em Gostoso",
  "Pgto Advogada",
  "Pgto Taxas Fiscais",
  "Pgto Taxas",
  "Outros",
];

export interface Transaction {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: Category;
  created_at: string;
}

export interface TransactionFormData {
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: Category;
}
