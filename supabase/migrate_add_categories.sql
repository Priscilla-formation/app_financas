-- Adiciona as novas categorias ao CHECK constraint da tabela transactions
-- Execute este script no SQL Editor do Supabase

ALTER TABLE transactions
  DROP CONSTRAINT IF EXISTS transactions_category_check;

ALTER TABLE transactions
  ADD CONSTRAINT transactions_category_check CHECK (category IN (
    'Alimentação', 'Transporte', 'Moradia', 'Lazer',
    'Saúde', 'Educação', 'Salário', 'Freelance',
    'Pgto Lote em Gostoso', 'Pgto Advogada', 'Pgto Taxas Fiscais', 'Pgto Taxas',
    'Outros'
  ));
