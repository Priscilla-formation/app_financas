"use client";

import Link from "next/link";
import { PieChart, List, Download, TrendingUp, Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing-nav";
import { useLanguage } from "@/components/language-provider";

const HERO_BG = `
  radial-gradient(ellipse at 65% 40%, rgba(16,185,129,0.18) 0%, transparent 55%),
  radial-gradient(ellipse at 15% 75%, rgba(59,130,246,0.14) 0%, transparent 50%),
  linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #064e3b 100%)
`.trim();

export default function LandingPage() {
  const { t } = useLanguage();
  const l = t.landing;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <style>{`
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .dark .card-hover:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .stat-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12);
        }
      `}</style>

      <LandingNav />

      {/* Hero */}
      <section className="pt-32 pb-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: HERO_BG }}>
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-36 right-36 w-44 h-44 rounded-full border border-emerald-400/10 pointer-events-none" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-white dark:bg-slate-950 transition-colors duration-300"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-emerald-400/25">
            <Zap className="w-3.5 h-3.5" />
            {l.badge}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="text-white drop-shadow-sm">{l.headline1}</span>
            <br />
            <span className="text-emerald-400">{l.headline2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
            {l.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 h-12 text-base rounded-xl gap-2 shadow-lg shadow-black/30">
                {l.ctaStart}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#funcionalidades">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/15 hover:text-white font-semibold px-8 h-12 text-base rounded-xl bg-transparent">
                {l.ctaHow}
              </Button>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: l.statsCategories, value: "8" },
              { label: l.statsCharts, value: "✓" },
              { label: l.statsExport, value: "✓" },
            ].map((s) => (
              <div key={s.label} className="stat-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-slate-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {l.featuresTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
              {l.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <PieChart className="w-6 h-6" />,
                iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
                title: l.feature1Title,
                description: l.feature1Desc,
                extras: [l.feature1a, l.feature1b, l.feature1c],
              },
              {
                icon: <List className="w-6 h-6" />,
                iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
                title: l.feature2Title,
                description: l.feature2Desc,
                extras: [l.feature2a, l.feature2b, l.feature2c],
              },
              {
                icon: <Download className="w-6 h-6" />,
                iconBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
                title: l.feature3Title,
                description: l.feature3Desc,
                extras: [l.feature3a, l.feature3b, l.feature3c],
              },
            ].map((f) => (
              <div key={f.title} className="card-hover bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{f.description}</p>
                <ul className="space-y-2">
                  {f.extras.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
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

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-12 shadow-2xl">
            <TrendingUp className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">{l.ctaBannerTitle}</h2>
            <p className="text-slate-300 mb-8 text-lg">{l.ctaBannerSub}</p>
            <Link href="/cadastro">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 h-12 text-base rounded-xl gap-2 shadow-lg shadow-black/30">
                {l.ctaBannerBtn}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 px-4 sm:px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-900 dark:text-white font-bold">💰 {t.nav.appName}</span>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{l.footerRights}</p>
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
            <Shield className="w-4 h-4" />
            {l.footerSafe}
          </div>
        </div>
      </footer>
    </div>
  );
}
