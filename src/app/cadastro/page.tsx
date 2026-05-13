"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Loader2, Mail, Lock, CheckCircle2, AlertCircle, Inbox } from "lucide-react";

export default function CadastroPage() {
  const { t, locale } = useLanguage();
  const l = t.register;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) { setError(l.errorMatch); return; }
    if (password.length < 6) { setError(l.errorLength); return; }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (authError) {
      setError(authError.message === "User already registered" ? l.errorExists : authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-1">
            <span className="text-4xl">💰</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.nav.appName}</span>
          </Link>
        </div>

        <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 shadow-lg rounded-2xl">
          <CardHeader className="pb-2 pt-8 px-8">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">
              {success ? l.successTitle : l.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-1">
              {success ? l.successSubtitle : l.subtitle}
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-6">
            {success ? (
              <div className="py-2 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {l.successDesc}{" "}
                    <strong className="text-slate-900 dark:text-white">{email}</strong>.
                    <br />{l.successDesc2}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {locale === "fr" ? "Prochaines étapes" : "Próximos passos"}
                  </p>
                  {[
                    { icon: <Inbox className="w-4 h-4 text-blue-500" />, text: l.step1 },
                    { icon: <Mail className="w-4 h-4 text-emerald-500" />, text: l.step2 },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: l.step3 },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">{i + 1}</span>
                      {step.icon}
                      {step.text}
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                    <strong>{l.spamTitle}</strong> {l.spamDesc}{" "}
                    <strong>{l.spamFolder}</strong> {l.spamOr}{" "}
                    <strong>{l.spamTrash}</strong>{l.spamDesc2}
                  </p>
                </div>

                <Link href="/login">
                  <Button variant="outline" className="w-full rounded-xl border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold mt-1">
                    {l.goLogin}
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm">{l.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="email" type="email" placeholder="seu@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      required autoComplete="email" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 text-sm">{l.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="password" type="password" placeholder={l.passwordPlaceholder} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      required autoComplete="new-password" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300 text-sm">{l.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="confirmPassword" type="password" placeholder={l.confirmPlaceholder} value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-10 rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      required autoComplete="new-password" />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm mt-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />{l.loading}</> : l.submit}
                </Button>
              </form>
            )}

            {!success && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                {l.hasAccount}{" "}
                <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline">
                  {l.signIn}
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
