"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Mail, Lock, CheckCircle2, AlertCircle, Inbox } from "lucide-react";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message === "User already registered"
        ? "Este email já está cadastrado."
        : authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-1">
            <span className="text-4xl">💰</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">App Finanças</span>
          </Link>
        </div>

        <Card className="border-slate-200 shadow-lg shadow-slate-100 rounded-2xl">
          <CardHeader className="pb-2 pt-8 px-8">
            <h1 className="text-2xl font-extrabold text-slate-900 text-center tracking-tight">
              {success ? "Quase lá!" : "Criar sua conta"}
            </h1>
            <p className="text-slate-500 text-sm text-center mt-1">
              {success ? "Verifique seu email para ativar a conta" : "Comece a controlar suas finanças hoje"}
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-6">
            {success ? (
              <div className="py-2 space-y-4">
                {/* Ícone de sucesso */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Enviamos um email de confirmação para{" "}
                    <strong className="text-slate-900">{email}</strong>.
                    <br />
                    Clique no link para ativar sua conta.
                  </p>
                </div>

                {/* Passo a passo */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Próximos passos</p>
                  {[
                    { icon: <Inbox className="w-4 h-4 text-blue-500" />, text: "Abra sua caixa de entrada" },
                    { icon: <Mail className="w-4 h-4 text-emerald-500" />, text: 'Procure o email de "App Finanças"' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Clique em Confirmar meu cadastro" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                        {i + 1}
                      </span>
                      {step.icon}
                      {step.text}
                    </div>
                  ))}
                </div>

                {/* Aviso de spam */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    <strong>Não encontrou o email?</strong> Verifique também a pasta de{" "}
                    <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong> — às vezes o email de confirmação cai por lá.
                  </p>
                </div>

                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-slate-200 text-slate-700 font-semibold mt-1"
                  >
                    Ir para o login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 font-600 text-sm">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 font-600 text-sm">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-600 text-sm">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repita a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-700 rounded-xl text-sm mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </form>
            )}

            {!success && (
              <p className="text-center text-sm text-slate-500 mt-6">
                Já tem conta?{" "}
                <Link href="/login" className="text-emerald-600 font-600 hover:text-emerald-700 hover:underline">
                  Entrar
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
