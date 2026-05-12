"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, ChevronDown } from "lucide-react";

interface DashboardNavProps {
  userEmail: string;
}

export function DashboardNav({ userEmail }: DashboardNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
          💰 App Finanças
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span className="text-sm font-500 hidden sm:block max-w-40 truncate">{userEmail}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 shadow-lg">
            <div className="px-3 py-2">
              <p className="text-xs text-slate-400">Conectado como</p>
              <p className="text-sm font-500 text-slate-700 truncate">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer rounded-lg mx-1"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
