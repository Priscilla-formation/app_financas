-- Atualiza categorias: adiciona Transferência de Priscilla e Transferência de Andrea
-- Execute no SQL Editor do Supabase

ALTER TABLE transactions
  DROP CONSTRAINT IF EXISTS transactions_category_check;

ALTER TABLE transactions
  ADD CONSTRAINT transactions_category_check CHECK (category IN (
    'Salário', 'Transferência de Priscilla', 'Transferência de Andrea',
    'Pgto Lote em Gostoso', 'Pgto Advogada', 'Pgto Taxas Fiscais', 'Pgto Taxas',
    'Outros'
  ));
