-- Tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('receita', 'despesa')),
  category TEXT NOT NULL CHECK (category IN (
    'Salário', 'Transferência de Priscilla', 'Transferência de Andrea',
    'Pgto Lote em Gostoso', 'Pgto Advogada', 'Pgto Taxas Fiscais', 'Pgto Taxas',
    'Outros'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON transactions(user_id);
CREATE INDEX IF NOT EXISTS transactions_date_idx ON transactions(date);
CREATE INDEX IF NOT EXISTS transactions_type_idx ON transactions(type);

-- Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Política: usuário só vê suas próprias transações
CREATE POLICY "Usuários veem apenas suas transações"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Política: usuário só insere suas próprias transações
CREATE POLICY "Usuários inserem apenas suas transações"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: usuário só atualiza suas próprias transações
CREATE POLICY "Usuários atualizam apenas suas transações"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política: usuário só exclui suas próprias transações
CREATE POLICY "Usuários excluem apenas suas transações"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);
