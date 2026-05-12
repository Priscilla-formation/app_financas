import Link from "next/link";
import {
  PieChart,
  BarChart3,
  List,
  Download,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .gradient-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #064e3b 100%);
        }
        .hero-glow {
          background: radial-gradient(ellipse at 60% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 50%);
        }
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .stat-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-800 text-slate-900 tracking-tight" style={{ fontWeight: 800 }}>
            💰 App Finanças
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-500">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-600 px-5 rounded-lg">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero hero-glow pt-32 pb-28 px-4 sm:px-6 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-32 right-32 w-40 h-40 rounded-full border border-emerald-500/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-sm font-600 px-4 py-1.5 rounded-full mb-8 border border-emerald-500/20">
            <Zap className="w-3.5 h-3.5" />
            Controle financeiro simples e visual
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Suas finanças,<br />
            <span className="text-emerald-400">sob controle.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Registre receitas e despesas, visualize seu saldo em tempo real e tome decisões financeiras mais inteligentes — tudo em um lugar só.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-700 px-8 h-12 text-base rounded-xl gap-2 shadow-lg shadow-emerald-900/30">
                Começar grátis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#funcionalidades">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white font-600 px-8 h-12 text-base rounded-xl bg-transparent">
                Ver como funciona
              </Button>
            </a>
          </div>

          {/* Mini stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: "Categorias", value: "9" },
              { label: "Gráficos", value: "✓" },
              { label: "Export CSV", value: "✓" },
            ].map((s) => (
              <div key={s.label} className="stat-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-800 text-white" style={{ fontWeight: 800 }}>{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Uma plataforma completa para você ter o controle total das suas finanças pessoais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <PieChart className="w-6 h-6" />,
                iconBg: "bg-blue-100 text-blue-600",
                title: "Dashboard Visual",
                description: "Veja um resumo completo do seu mês: total de receitas, despesas e saldo disponível com gráfico de pizza por categoria.",
                extras: ["Cards de resumo mensal", "Gráfico por categoria", "Visão instantânea"],
              },
              {
                icon: <List className="w-6 h-6" />,
                iconBg: "bg-emerald-100 text-emerald-600",
                title: "CRUD de Transações",
                description: "Registre, edite e exclua receitas e despesas com campos completos: descrição, valor, data, tipo e categoria.",
                extras: ["Criar e editar", "Filtro por mês", "Busca por descrição"],
              },
              {
                icon: <Download className="w-6 h-6" />,
                iconBg: "bg-violet-100 text-violet-600",
                title: "Exportar CSV",
                description: "Exporte suas transações filtradas em formato .csv para usar em planilhas Excel, Google Sheets e outros sistemas.",
                extras: ["Export com filtros", "Formato .csv padrão", "Compatível com Excel"],
              },
            ].map((f) => (
              <div key={f.title} className="card-hover bg-white rounded-2xl border border-slate-200 p-7">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-700 text-slate-900 mb-2" style={{ fontWeight: 700 }}>{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.description}</p>
                <ul className="space-y-2">
                  {f.extras.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-12 shadow-2xl">
            <TrendingUp className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Comece hoje mesmo
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Cadastre-se grátis e tenha o controle financeiro que você sempre quis.
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white font-700 px-10 h-12 text-base rounded-xl gap-2 shadow-lg shadow-emerald-900/40">
                Criar conta grátis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-900 font-700" style={{ fontWeight: 700 }}>💰 App Finanças</span>
          <p className="text-slate-400 text-sm">© 2025 App Finanças. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Shield className="w-4 h-4" />
            Seus dados são seguros
          </div>
        </div>
      </footer>
    </div>
  );
}
