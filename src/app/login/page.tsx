"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const l = t.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(l.errorInvalid);
      setLoading(false);
      return;
    }

    toast({ title: l.successTitle, description: l.successDesc });
    router.push("/dashboard");
    router.refresh();
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
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">{l.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-1">{l.subtitle}</p>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-6">
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
                  <Input id="password" type="password" placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-10 rounded-lg border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    required autoComplete="current-password" />
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

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              {l.noAccount}{" "}
              <Link href="/cadastro" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline">
                {l.signUp}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
