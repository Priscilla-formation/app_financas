"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function LandingNav() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          💰 App Finanças
        </span>
        <div className="flex items-center gap-2">
          {/* Dark/light toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" size={18} /> : <Moon className="w-4.5 h-4.5" size={18} />}
          </button>

          <Link href="/login">
            <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 rounded-lg">
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
