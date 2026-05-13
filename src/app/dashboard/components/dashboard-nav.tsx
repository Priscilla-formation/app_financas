"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/components/language-provider";

interface DashboardNavProps {
  userEmail: string;
}

export function DashboardNav({ userEmail }: DashboardNavProps) {
  const router = useRouter();
  const { theme, toggle: toggleTheme } = useTheme();
  const { locale, toggle: toggleLang, t } = useLanguage();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          💰 {t.nav.appName}
        </span>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="h-8 px-3 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors tracking-wide"
          >
            {locale === "pt" ? "FR" : "PT"}
          </button>

          {/* Dark/light toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-3 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <span className="text-sm hidden sm:block max-w-40 truncate">{userEmail}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 shadow-lg">
              <div className="px-3 py-2">
                <p className="text-xs text-slate-400">{t.nav.connectedAs}</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 truncate">{userEmail}</p>
              </div>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer rounded-lg mx-1"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.nav.signOut}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
