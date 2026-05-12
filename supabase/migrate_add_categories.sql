-- Remove categorias antigas e mantém apenas as categorias personalizadas
-- Execute este script no SQL Editor do Supabase

ALTER TABLE transactions
  DROP CONSTRAINT IF EXISTS transactions_category_check;

ALTER TABLE transactions
  ADD CONSTRAINT transactions_category_check CHECK (category IN (
    'Salário',
    'Pgto Lote em Gostoso', 'Pgto Advogada', 'Pgto Taxas Fiscais', 'Pgto Taxas',
    'Outros'
  ));
