import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend,
} from "recharts";
import {
  Upload, FileText, Sparkles, BarChart3, Lightbulb, Share2, Download,
  Sun, Moon, Check, Copy, RefreshCw, ArrowRight, ArrowUpRight, ArrowDownRight,
  TrendingUp, AlertTriangle, Target, Zap, FileSpreadsheet, FileJson, FileType,
  Linkedin, Twitter, Instagram, ChevronRight, Plus, Database, Filter,
  X, CheckCircle2, Loader2, Hash, Bot, Layers, Globe, Users, ShoppingBag,
} from "lucide-react";
import Papa from "papaparse";

/* =============================================================
   THEME / TOKENS
   ============================================================= */
const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

    :root {
      --bg: #F6F3EA;
      --bg-elev: #FBF8F0;
      --card: #FFFFFF;
      --text: #0A0A0A;
      --muted: #6B6B65;
      --subtle: #9A9A92;
      --border: #E5E1D5;
      --border-strong: #C9C4B5;
      --accent: #C8F045;
      --accent-fg: #0A0A0A;
      --accent-soft: rgba(200, 240, 69, 0.18);
      --warn: #D97757;
      --good: #2F7D5B;
      --shadow: 0 1px 2px rgba(10,10,10,0.04), 0 8px 24px -12px rgba(10,10,10,0.06);
    }
    .dark {
      --bg: #0A0A0A;
      --bg-elev: #0F0F0F;
      --card: #141413;
      --text: #F0EDE4;
      --muted: #8C887E;
      --subtle: #5C5A52;
      --border: #1F1E1B;
      --border-strong: #2A2924;
      --accent: #CCFF33;
      --accent-fg: #0A0A0A;
      --accent-soft: rgba(204, 255, 51, 0.10);
      --warn: #E89070;
      --good: #6BA88A;
      --shadow: 0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.5);
    }
    html, body, #root { background: var(--bg); }
    body { font-family: 'Geist', ui-sans-serif, system-ui, sans-serif; color: var(--text); -webkit-font-smoothing: antialiased; }

    .font-serif { font-family: 'Instrument Serif', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.01em; }
    .font-mono  { font-family: 'Geist Mono', ui-monospace, monospace; }
    .font-display { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }

    .bg-app    { background: var(--bg); }
    .bg-elev   { background: var(--bg-elev); }
    .bg-card   { background: var(--card); }
    .bg-accent { background: var(--accent); color: var(--accent-fg); }
    .bg-accent-soft { background: var(--accent-soft); }
    .text-app  { color: var(--text); }
    .text-muted{ color: var(--muted); }
    .text-subtle{ color: var(--subtle); }
    .text-accent{ color: var(--accent); }
    .text-good { color: var(--good); }
    .text-warn { color: var(--warn); }
    .border-app{ border-color: var(--border); }
    .border-strong{ border-color: var(--border-strong); }
    .ring-accent{ box-shadow: 0 0 0 2px var(--accent); }
    .shadow-card{ box-shadow: var(--shadow); }

    .grid-bg {
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 56px 56px;
      background-position: -1px -1px;
    }
    .grain::before {
      content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
      mix-blend-mode: multiply;
    }
    .dark .grain::before { mix-blend-mode: screen; opacity: 0.35; }

    @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .anim-rise   { animation: rise 0.7s cubic-bezier(.2,.7,.2,1) backwards; }
    .anim-fade   { animation: fade 0.6s ease-out backwards; }
    .pulse-dot   { animation: pulse-soft 1.6s ease-in-out infinite; }
    .shimmer-bar { background: linear-gradient(90deg, transparent, var(--accent-soft), transparent); background-size: 200% 100%; animation: shimmer 1.6s linear infinite; }

    .btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.625rem 1rem; border-radius:0.625rem; font-weight:500; font-size:0.875rem; transition: all .15s ease; border:1px solid transparent; cursor:pointer; white-space:nowrap; }
    .btn-primary { background: var(--text); color: var(--bg); }
    .btn-primary:hover { transform: translateY(-1px); }
    .btn-accent { background: var(--accent); color: var(--accent-fg); }
    .btn-accent:hover { filter: brightness(0.96); }
    .btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
    .btn-ghost:hover { background: var(--bg-elev); }

    .chip { display:inline-flex; align-items:center; gap:0.35rem; padding:0.25rem 0.625rem; border-radius:999px; font-size:0.75rem; border:1px solid var(--border); background: var(--bg-elev); color: var(--muted); }
    .chip-accent { background: var(--accent-soft); color: var(--text); border-color: transparent; }

    /* recharts tweaks */
    .recharts-cartesian-axis-tick-value { fill: var(--subtle); font-family: 'Geist Mono', monospace; font-size: 11px; }
    .recharts-tooltip-wrapper { outline: none; }
    .recharts-default-tooltip { background: var(--card) !important; border: 1px solid var(--border) !important; border-radius: 8px !important; box-shadow: var(--shadow); }

    /* scrollbar */
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; border: 2px solid var(--bg); }
    ::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }

    .marquee-mask { mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); }

    .underline-accent { background-image: linear-gradient(transparent 60%, var(--accent) 60%); background-repeat: no-repeat; background-size: 100% 100%; padding: 0 0.1em; }
  `}</style>
);

/* =============================================================
   DEMO DATASET — pre-computed from the actual uploaded train.csv
   (Superstore Sales, 9,800 rows, 2015–2018)
   ============================================================= */
const DEMO_DATASET = {
  name: "train.csv",
  size: "1.6 MB",
  rows: 9800,
  cols: 18,
  uploadedAt: "Just now",
  fields: [
    { name: "Order Date", type: "date" }, { name: "Ship Date", type: "date" },
    { name: "Ship Mode", type: "category" }, { name: "Customer ID", type: "id" },
    { name: "Segment", type: "category" }, { name: "City", type: "category" },
    { name: "State", type: "category" }, { name: "Region", type: "category" },
    { name: "Category", type: "category" }, { name: "Sub-Category", type: "category" },
    { name: "Product Name", type: "text" }, { name: "Sales", type: "numeric" },
  ],
  kpis: {
    totalSales: 2261536.78,
    orders: 4922,
    customers: 793,
    avgOrder: 459.52,
    salesYoY: 0.207,    // ~20.7% YoY (2017 -> 2018)
    ordersYoY: 0.158,
    customersYoY: 0.073,
    avgOrderYoY: 0.044,
  },
  monthly: [
    { m: "Jan '18", sales: 43476, orders: 102 }, { m: "Feb '18", sales: 19921, orders: 54 },
    { m: "Mar '18", sales: 58863, orders: 129 }, { m: "Apr '18", sales: 35542, orders: 110 },
    { m: "May '18", sales: 43826, orders: 130 }, { m: "Jun '18", sales: 48191, orders: 140 },
    { m: "Jul '18", sales: 44825, orders: 132 }, { m: "Aug '18", sales: 62838, orders: 169 },
    { m: "Sep '18", sales: 86153, orders: 213 }, { m: "Oct '18", sales: 77448, orders: 175 },
    { m: "Nov '18", sales: 117938, orders: 247 }, { m: "Dec '18", sales: 83030, orders: 213 },
  ],
  byCategory: [
    { name: "Technology", value: 827456 },
    { name: "Furniture", value: 728659 },
    { name: "Office Supplies", value: 705422 },
  ],
  bySegment: [
    { name: "Consumer", value: 1148061 },
    { name: "Corporate", value: 688494 },
    { name: "Home Office", value: 424982 },
  ],
  byRegion: [
    { name: "West", value: 710220 },
    { name: "East", value: 669519 },
    { name: "Central", value: 492647 },
    { name: "South", value: 389151 },
  ],
  topSubCategories: [
    { name: "Phones", value: 327782 }, { name: "Chairs", value: 322823 },
    { name: "Storage", value: 219343 }, { name: "Tables", value: 202811 },
    { name: "Binders", value: 200029 }, { name: "Machines", value: 189238 },
    { name: "Accessories", value: 164187 },
  ],
  bottomSubCategories: [
    { name: "Supplies", value: 46420 }, { name: "Art", value: 26705 },
    { name: "Envelopes", value: 16128 }, { name: "Labels", value: 12348 },
    { name: "Fasteners", value: 3002 },
  ],
  topCities: [
    { city: "New York City", sales: 252463, orders: 738 },
    { city: "Los Angeles", sales: 173420, orders: 720 },
    { city: "Seattle", sales: 116106, orders: 412 },
    { city: "San Francisco", sales: 109041, orders: 500 },
    { city: "Philadelphia", sales: 108842, orders: 498 },
  ],
  shipMix: [
    { name: "Standard Class", value: 5859 }, { name: "Second Class", value: 1902 },
    { name: "First Class", value: 1501 }, { name: "Same Day", value: 538 },
  ],
};

const RECENT_UPLOADS = [
  { name: "train.csv", size: "1.6 MB", when: "Just now", rows: 9800, kind: "csv", active: true },
  { name: "Q3-marketing-report.pdf", size: "2.4 MB", when: "Yesterday", rows: null, kind: "pdf" },
  { name: "customer-survey-2024.xlsx", size: "812 KB", when: "3 days ago", rows: 1240, kind: "xlsx" },
  { name: "events_log.json", size: "4.1 MB", when: "Last week", rows: 22500, kind: "json" },
];

/* =============================================================
   FORMATTERS
   ============================================================= */
const fmtCurrency = (n, c = 0) => "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: c, minimumFractionDigits: c });
const fmtCompact  = (n) => {
  const a = Math.abs(n);
  if (a >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (a >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (a >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(Math.round(n));
};
const fmtPct = (n) => (n >= 0 ? "+" : "") + (n * 100).toFixed(1) + "%";
const fmtInt = (n) => Number(n).toLocaleString("en-US");

/* =============================================================
   SHARED PRIMITIVES
   ============================================================= */
const Logo = ({ size = 18 }) => (
  <div className="flex items-center gap-2">
    <div
      className="rounded-md grid place-items-center"
      style={{
        width: size + 10, height: size + 10,
        background: "var(--text)", color: "var(--bg)",
      }}
    >
      <span className="font-serif italic" style={{ fontSize: size, lineHeight: 1, transform: "translateY(-1px)" }}>i</span>
    </div>
    <span className="font-medium tracking-tight" style={{ fontSize: 16 }}>
      Insight<span className="font-display">AI</span>
    </span>
  </div>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="btn btn-ghost"
    style={{ padding: "0.5rem", borderRadius: "999px", width: 36, height: 36, justifyContent: "center" }}
    aria-label="Toggle theme"
  >
    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
  </button>
);

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [toast, onClose]);
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 anim-rise">
      <div className="flex items-center gap-2 bg-card border border-app rounded-full pl-3 pr-4 py-2 shadow-card text-sm">
        <CheckCircle2 size={15} className="text-good" />
        <span>{toast}</span>
      </div>
    </div>
  );
};

/* =============================================================
   TOP NAV (landing) + APP SHELL (everywhere else)
   ============================================================= */
const TopNav = ({ theme, setTheme, onLaunch }) => (
  <header className="sticky top-0 z-30 backdrop-blur-md" style={{ background: "color-mix(in oklab, var(--bg) 80%, transparent)", borderBottom: "1px solid var(--border)" }}>
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Logo />
      <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
        <a className="hover:text-app transition" href="#features">Product</a>
        <a className="hover:text-app transition" href="#how">How it works</a>
        <a className="hover:text-app transition" href="#pricing">Pricing</a>
        <a className="hover:text-app transition" href="#docs">Docs</a>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button onClick={onLaunch} className="btn btn-primary">
          Launch app <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </header>
);

const Sidebar = ({ view, setView, dataset, theme, setTheme }) => {
  const items = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "insights", label: "AI Insights", icon: Lightbulb },
    { id: "social", label: "Social Posts", icon: Share2 },
  ];
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-app" style={{ background: "var(--bg-elev)" }}>
      <div className="px-5 h-16 flex items-center border-b border-app">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 mb-2 text-[11px] uppercase tracking-widest text-subtle">Workspace</p>
        {items.map(it => {
          const active = view === it.id;
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition"
              style={{
                background: active ? "var(--card)" : "transparent",
                color: active ? "var(--text)" : "var(--muted)",
                border: "1px solid " + (active ? "var(--border)" : "transparent"),
                fontWeight: active ? 500 : 400,
              }}
            >
              <Icon size={15} />
              {it.label}
              {active && <ChevronRight size={13} className="ml-auto" />}
            </button>
          );
        })}
      </nav>
      <div className="m-3 p-3 rounded-lg border border-app bg-card">
        <div className="flex items-center gap-2 mb-2">
          <Database size={13} className="text-muted" />
          <span className="text-[11px] uppercase tracking-widest text-subtle">Active dataset</span>
        </div>
        <p className="text-sm font-medium truncate">{dataset.name}</p>
        <p className="text-xs text-muted font-mono">{fmtInt(dataset.rows)} rows · {dataset.cols} cols</p>
      </div>
      <div className="p-3 border-t border-app flex items-center justify-between">
        <span className="text-xs text-muted">Theme</span>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </aside>
  );
};

const TopBar = ({ view, setView, onExport }) => {
  const titles = {
    upload: "Upload data", dashboard: "Dashboard",
    insights: "AI Insights", social: "Social posts",
  };
  return (
    <div className="h-16 px-5 lg:px-8 flex items-center justify-between border-b border-app bg-elev">
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => setView("upload")} className="text-muted hover:text-app transition">Workspace</button>
        <ChevronRight size={13} className="text-subtle" />
        <span className="font-medium">{titles[view]}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden sm:flex chip">
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" /> AI ready
        </span>
        {view !== "upload" && (
          <button className="btn btn-ghost" onClick={() => onExport("Export menu opened")}>
            <Download size={14} /> Export
          </button>
        )}
      </div>
    </div>
  );
};

/* =============================================================
   LANDING
   ============================================================= */
const FeatureCard = ({ icon: Icon, title, body, delay = 0 }) => (
  <div className="bg-card border border-app rounded-2xl p-6 anim-rise" style={{ animationDelay: `${delay}ms` }}>
    <div className="w-10 h-10 rounded-lg grid place-items-center mb-4 bg-accent-soft">
      <Icon size={18} />
    </div>
    <h3 className="text-lg mb-1">{title}</h3>
    <p className="text-sm text-muted leading-relaxed">{body}</p>
  </div>
);

const Landing = ({ theme, setTheme, onLaunch }) => (
  <div className="bg-app text-app min-h-screen">
    <TopNav theme={theme} setTheme={setTheme} onLaunch={onLaunch} />

    {/* HERO */}
    <section className="relative overflow-hidden" >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 60%)" }} />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative">
        <div className="chip mb-6 anim-rise">
          <Sparkles size={12} /> Built on Claude · v1.0 MVP
        </div>
        <h1 className="font-serif tracking-tight anim-rise" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 1.02, animationDelay: "60ms" }}>
          Drop a file.<br />
          Get a <span className="font-display">complete</span> data story.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-xl anim-rise leading-relaxed" style={{ animationDelay: "180ms" }}>
          InsightAI reads your spreadsheets, PDFs, and exports — then writes the dashboard,
          the executive summary, and the LinkedIn post for you. No queries. No setup.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 anim-rise" style={{ animationDelay: "260ms" }}>
          <button onClick={onLaunch} className="btn btn-accent" style={{ padding: "0.875rem 1.25rem", fontSize: "0.95rem" }}>
            Analyze a file <ArrowRight size={16} />
          </button>
          <button className="btn btn-ghost" style={{ padding: "0.875rem 1.25rem", fontSize: "0.95rem" }}>
            Watch 90-sec demo
          </button>
          <span className="text-xs text-subtle ml-2">No account needed for demo</span>
        </div>

        {/* hero preview */}
        <div className="mt-16 anim-rise" style={{ animationDelay: "400ms" }}>
          <div className="bg-card border border-app rounded-2xl shadow-card overflow-hidden">
            <div className="px-5 py-3 border-b border-app flex items-center gap-3 bg-elev">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border-strong)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border-strong)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--border-strong)" }} />
              </div>
              <div className="text-xs text-muted font-mono">insightai.app/dashboard</div>
              <span className="ml-auto chip"><span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" /> live</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
              {[
                { l: "Total revenue", v: "$2.26M", d: "+20.7%" },
                { l: "Orders", v: "4,922", d: "+15.8%" },
                { l: "Customers", v: "793", d: "+7.3%" },
              ].map((k, i) => (
                <div key={i} className="border border-app rounded-xl p-4 bg-elev">
                  <p className="text-xs text-muted">{k.l}</p>
                  <p className="text-2xl font-serif mt-1">{k.v}</p>
                  <p className="text-xs text-good font-mono mt-2">{k.d}</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <div className="border border-app rounded-xl p-4 bg-elev h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DEMO_DATASET.monthly}>
                    <defs>
                      <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sales" stroke="var(--text)" strokeWidth={1.5} fill="url(#ga)" />
                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* MARQUEE */}
    <section className="border-y border-app py-6 marquee-mask overflow-hidden">
      <div className="flex items-center gap-12 text-xs uppercase tracking-[0.25em] text-subtle whitespace-nowrap" style={{ animation: "shimmer 30s linear infinite", backgroundSize: "auto" }}>
        <span>CSV</span><span>·</span>
        <span>Excel · XLSX</span><span>·</span>
        <span>JSON</span><span>·</span>
        <span>PDF Reports</span><span>·</span>
        <span>Auto KPI Detection</span><span>·</span>
        <span>Anomaly Surfacing</span><span>·</span>
        <span>Executive Summaries</span><span>·</span>
        <span>One-click Exports</span><span>·</span>
        <span>Social-ready Posts</span>
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">What it does</p>
        <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05 }}>
          Four products in one,<br />
          <span className="font-display">stitched together</span> by AI.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard icon={Upload} title="Universal upload" body="Drop a CSV, XLSX, JSON, or PDF. We detect schemas, types, and the question your data wants to answer." delay={0} />
        <FeatureCard icon={BarChart3} title="Auto dashboards" body="KPI cards, trends, breakdowns, and tables — generated, not configured. Filter and export instantly." delay={100} />
        <FeatureCard icon={Lightbulb} title="Executive insights" body="Plain-English findings, anomalies, and recommendations written like a senior analyst is on your team." delay={200} />
        <FeatureCard icon={Share2} title="Social posts" body="LinkedIn, X, and Instagram drafts with the right tone and hashtags. Copy and ship." delay={300} />
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how" className="border-t border-app">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { n: "01", t: "Upload anything", b: "CSV, Excel, JSON, PDF. We sniff the schema, types, and date columns automatically." },
          { n: "02", t: "AI does the work", b: "Claude reads, profiles, and reasons over the data. No prompting required from you." },
          { n: "03", t: "Ship the story", b: "Take the dashboard to a meeting. Take the post to LinkedIn. Take the summary to Slack." },
        ].map((s, i) => (
          <div key={i} className="anim-rise" style={{ animationDelay: `${i * 120}ms` }}>
            <p className="font-mono text-sm text-muted">{s.n}</p>
            <h3 className="font-serif text-3xl mt-2">{s.t}</h3>
            <p className="text-muted mt-3 leading-relaxed">{s.b}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-app bg-elev">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05 }}>
          Stop staring at spreadsheets.<br />
          <span className="font-display">Start shipping decisions.</span>
        </h2>
        <button onClick={onLaunch} className="btn btn-accent mt-8" style={{ padding: "0.875rem 1.5rem", fontSize: "1rem" }}>
          Try with sample data <ArrowRight size={16} />
        </button>
      </div>
    </section>

    <footer className="border-t border-app">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted">
        <Logo />
        <p>© 2026 InsightAI · An AI-first analytics studio</p>
      </div>
    </footer>
  </div>
);

/* =============================================================
   UPLOAD
   ============================================================= */
const FILE_ICONS = { csv: FileSpreadsheet, xlsx: FileSpreadsheet, json: FileJson, pdf: FileType };

const Upload_View = ({ dataset, uploads, setDataset, setUploads, onToast, goDashboard }) => {
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    const f = files[0];
    if (!f) return;
    setBusy(true);
    setProgress(0);

    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(p + Math.random() * 18, 92);
      setProgress(p);
    }, 120);

    const finish = (rows, cols) => {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => {
        setBusy(false);
        const ext = (f.name.split(".").pop() || "").toLowerCase();
        const newEntry = {
          name: f.name,
          size: (f.size / 1024 / 1024).toFixed(2) + " MB",
          when: "Just now",
          rows, kind: ext, active: true,
        };
        setUploads(prev => [newEntry, ...prev.map(u => ({ ...u, active: false }))]);
        setDataset({ ...dataset, name: f.name, size: newEntry.size, rows: rows || dataset.rows, cols: cols || dataset.cols });
        onToast("Analysis complete · " + f.name);
      }, 320);
    };

    if (f.name.toLowerCase().endsWith(".csv")) {
      Papa.parse(f, {
        header: true, skipEmptyLines: true,
        complete: (res) => {
          const cols = res.meta.fields ? res.meta.fields.length : 0;
          finish(res.data.length, cols);
        },
        error: () => finish(0, 0),
      });
    } else {
      // simulated parse for other types
      setTimeout(() => finish(Math.floor(Math.random() * 8000 + 1200), Math.floor(Math.random() * 12 + 6)), 1400);
    }
  }, [dataset, setDataset, setUploads, onToast]);

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10 anim-fade">
      <div className="mb-8">
        <h1 className="font-serif tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05 }}>
          Upload your data and let AI <span className="font-display">analyze it instantly.</span>
        </h1>
        <p className="text-muted mt-3 max-w-2xl">CSV, Excel, JSON, or PDF. Up to 50 MB. We profile every column, infer types, and start generating insights as soon as the upload finishes.</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => !busy && inputRef.current?.click()}
        className="relative rounded-2xl border-2 border-dashed transition cursor-pointer overflow-hidden"
        style={{
          borderColor: drag ? "var(--accent)" : "var(--border-strong)",
          background: drag ? "var(--accent-soft)" : "var(--card)",
          padding: "3.5rem 2rem",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls,.json,.pdf"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {!busy ? (
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-xl grid place-items-center bg-accent">
              <Upload size={22} />
            </div>
            <h3 className="font-serif text-2xl mt-5">Drag & drop your file here</h3>
            <p className="text-muted text-sm mt-1">or click to browse from your computer</p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="chip">CSV</span>
              <span className="chip">XLSX</span>
              <span className="chip">JSON</span>
              <span className="chip">PDF</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-xl grid place-items-center bg-card border border-app">
              <Loader2 size={22} className="animate-spin" />
            </div>
            <h3 className="font-serif text-2xl mt-5">Analyzing your dataset</h3>
            <p className="text-muted text-sm mt-1 font-mono">
              {progress < 30 && "reading rows..."}
              {progress >= 30 && progress < 60 && "inferring schema..."}
              {progress >= 60 && progress < 90 && "computing KPIs..."}
              {progress >= 90 && "drafting insights..."}
            </p>
            <div className="max-w-md mx-auto mt-6 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full bg-accent transition-all" style={{ width: progress + "%" }} />
            </div>
            <p className="text-xs text-subtle font-mono mt-2">{Math.round(progress)}%</p>
          </div>
        )}
      </div>

      {/* Active dataset preview */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl">Active dataset</h2>
          <button onClick={goDashboard} className="btn btn-primary">
            Open dashboard <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-card border border-app rounded-xl p-5">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-accent grid place-items-center">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <p className="font-medium">{dataset.name}</p>
                <p className="text-sm text-muted font-mono">{fmtInt(dataset.rows)} rows · {dataset.cols} columns · {dataset.size}</p>
                <div className="flex flex-wrap gap-1.5 mt-3 max-w-2xl">
                  {dataset.fields.map((f, i) => (
                    <span key={i} className="chip" style={{ fontSize: 11 }}>
                      {f.name}
                      <span className="text-subtle ml-1">·{f.type}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="chip chip-accent"><Check size={11} /> Ready</span>
          </div>
        </div>
      </div>

      {/* Recent uploads */}
      <div className="mt-10">
        <h2 className="font-serif text-xl mb-4">Recent uploads</h2>
        <div className="bg-card border border-app rounded-xl divide-y" style={{ borderColor: "var(--border)" }}>
          {uploads.map((u, i) => {
            const Icon = FILE_ICONS[u.kind] || FileText;
            return (
              <div key={i} className="flex items-center gap-4 p-4" style={{ borderColor: "var(--border)", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-lg grid place-items-center" style={{ background: "var(--bg-elev)", border: "1px solid var(--border)" }}>
                  <Icon size={16} className="text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted font-mono">
                    {u.rows ? `${fmtInt(u.rows)} rows · ` : ""}{u.size} · {u.when}
                  </p>
                </div>
                {u.active && <span className="chip chip-accent">active</span>}
                <button className="text-muted hover:text-app transition">
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   DASHBOARD
   ============================================================= */
const KpiCard = ({ label, value, delta, hint, icon: Icon, delay = 0 }) => {
  const positive = delta >= 0;
  return (
    <div className="bg-card border border-app rounded-xl p-5 anim-rise" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
        {Icon && <Icon size={14} className="text-subtle" />}
      </div>
      <p className="font-serif mt-3" style={{ fontSize: "2rem", lineHeight: 1.1 }}>{value}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs font-mono inline-flex items-center gap-1" style={{ color: positive ? "var(--good)" : "var(--warn)" }}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {fmtPct(delta)}
        </span>
        <span className="text-xs text-subtle">{hint}</span>
      </div>
    </div>
  );
};

const FilterBar = ({ filters, setFilters }) => {
  const F = ({ k, opts }) => (
    <select
      value={filters[k]}
      onChange={(e) => setFilters({ ...filters, [k]: e.target.value })}
      className="text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
      style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}
    >
      {opts.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Filter size={14} className="text-muted mr-1" />
      <F k="range"    opts={["Last 12 months", "Last 6 months", "Last 90 days", "All time"]} />
      <F k="region"   opts={["All regions", "West", "East", "Central", "South"]} />
      <F k="category" opts={["All categories", "Technology", "Furniture", "Office Supplies"]} />
      <F k="segment"  opts={["All segments", "Consumer", "Corporate", "Home Office"]} />
      <span className="ml-auto text-xs text-subtle font-mono">filtered live · 9,800 rows</span>
    </div>
  );
};

const ChartPanel = ({ title, sub, children, action, delay = 0 }) => (
  <div className="bg-card border border-app rounded-xl p-5 anim-rise" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Dashboard = ({ dataset, onToast, setView }) => {
  const [filters, setFilters] = useState({
    range: "Last 12 months", region: "All regions",
    category: "All categories", segment: "All segments",
  });
  const k = dataset.kpis;
  const PIE_COLORS = ["var(--text)", "var(--accent)", "var(--muted)", "var(--border-strong)"];

  return (
    <div className="px-5 lg:px-8 py-8 anim-fade">
      <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            {dataset.name.replace(/\.[a-z]+$/i, "")}
          </h1>
          <p className="text-muted text-sm mt-1">Auto-generated dashboard · {fmtInt(dataset.rows)} rows analyzed · {dataset.cols} columns</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setView("insights")} className="btn btn-ghost">
            <Lightbulb size={14} /> Executive summary
          </button>
          <button onClick={() => setView("social")} className="btn btn-accent">
            <Share2 size={14} /> Generate social post
          </button>
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Total revenue" value={fmtCurrency(k.totalSales)} delta={k.salesYoY}    hint="vs last yr" icon={TrendingUp} delay={0} />
        <KpiCard label="Orders"        value={fmtInt(k.orders)}         delta={k.ordersYoY}   hint="vs last yr" icon={ShoppingBag} delay={70} />
        <KpiCard label="Customers"     value={fmtInt(k.customers)}      delta={k.customersYoY}hint="vs last yr" icon={Users} delay={140} />
        <KpiCard label="Avg order"     value={fmtCurrency(k.avgOrder, 2)} delta={k.avgOrderYoY} hint="vs last yr" icon={Target} delay={210} />
      </div>

      {/* Trend */}
      <ChartPanel
        title="Revenue trend"
        sub="Monthly sales · 2018"
        action={<button onClick={() => onToast("Chart exported as PNG")} className="btn btn-ghost" style={{ padding: "0.4rem 0.7rem", fontSize: 12 }}><Download size={12} /> PNG</button>}
        delay={300}
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataset.monthly} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-trend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtCompact} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => fmtCurrency(v)} cursor={{ stroke: "var(--border-strong)" }} />
              <Area type="monotone" dataKey="sales" stroke="var(--text)" strokeWidth={2} fill="url(#grad-trend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartPanel>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <ChartPanel title="Sales by category" sub="Technology leads · 36.6%" delay={400}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataset.byCategory} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={fmtCompact} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={110} />
                <Tooltip formatter={(v) => fmtCurrency(v)} />
                <Bar dataKey="value" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel title="Customer segments" sub="Consumer drives 50.8% of revenue" delay={460}>
          <div className="h-64 grid grid-cols-5 gap-4">
            <div className="col-span-3 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataset.bySegment}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={84}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dataset.bySegment.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} stroke="var(--card)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => fmtCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-3">
              {dataset.bySegment.map((s, i) => {
                const total = dataset.bySegment.reduce((a, b) => a + b.value, 0);
                return (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-muted">{s.name}</span>
                    <span className="ml-auto font-mono">{((s.value / total) * 100).toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ChartPanel>
      </div>

      {/* Region + Top sub-categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <ChartPanel title="Sales by region" delay={520}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataset.byRegion} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtCompact} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => fmtCurrency(v)} />
                <Bar dataKey="value" fill="var(--text)" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel title="Top sub-categories" sub="By revenue" delay={580} action={<span className="chip" style={{ fontSize: 10 }}>top 5</span>}>
          <div className="space-y-2 mt-1">
            {dataset.topSubCategories.slice(0, 5).map((s, i) => {
              const max = dataset.topSubCategories[0].value;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{s.name}</span>
                    <span className="font-mono text-muted">{fmtCurrency(s.value)}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full bg-accent" style={{ width: `${(s.value / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartPanel>

        <ChartPanel title="Underperforming" sub="Bottom 5 sub-categories" delay={640}>
          <div className="space-y-2 mt-1">
            {dataset.bottomSubCategories.map((s, i) => {
              const max = dataset.bottomSubCategories[0].value;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{s.name}</span>
                    <span className="font-mono text-muted">{fmtCurrency(s.value)}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full" style={{ width: `${(s.value / max) * 100}%`, background: "var(--warn)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartPanel>
      </div>

      {/* Top cities table */}
      <div className="mt-5">
        <ChartPanel title="Top cities by revenue" sub="Across the full date range" delay={700}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-muted">
                  <th className="pb-3 font-medium">City</th>
                  <th className="pb-3 font-medium">Orders</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Avg / order</th>
                  <th className="pb-3 font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {dataset.topCities.map((c, i) => {
                  const share = c.sales / dataset.kpis.totalSales;
                  return (
                    <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 text-subtle font-mono text-xs">{i + 1}</span>
                          {c.city}
                        </div>
                      </td>
                      <td className="font-mono">{fmtInt(c.orders)}</td>
                      <td className="font-mono">{fmtCurrency(c.sales)}</td>
                      <td className="font-mono text-muted">{fmtCurrency(c.sales / c.orders, 2)}</td>
                      <td>
                        <div className="flex items-center gap-2 max-w-[160px]">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                            <div className="h-full bg-accent" style={{ width: `${share * 100 * 4}%` }} />
                          </div>
                          <span className="text-xs font-mono text-muted">{(share * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ChartPanel>
      </div>

      {/* What's next — AI handoff CTAs */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-muted" />
          <span className="text-xs uppercase tracking-widest text-muted">Take it further</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setView("insights")}
            className="text-left bg-card border border-app rounded-2xl p-6 hover:shadow-card transition group anim-rise relative overflow-hidden"
            style={{ animationDelay: "750ms" }}
          >
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-60"
              style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 65%)" }}
            />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-11 h-11 rounded-xl bg-accent grid place-items-center">
                <Lightbulb size={18} />
              </div>
              <span className="text-[11px] font-mono text-subtle">02 / EXECUTIVE</span>
            </div>
            <h3 className="font-serif text-2xl mb-2 relative">Generate executive summary</h3>
            <p className="text-sm text-muted leading-relaxed relative">
              Turn this dashboard into plain-English findings, anomalies, and recommendations — written like a senior analyst is on your team. Export as DOCX or TXT.
            </p>
            <div className="flex items-center gap-2 mt-5 text-sm font-medium relative">
              Open AI Insights
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => setView("social")}
            className="text-left bg-card border border-app rounded-2xl p-6 hover:shadow-card transition group anim-rise relative overflow-hidden"
            style={{ animationDelay: "820ms" }}
          >
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-60"
              style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 65%)" }}
            />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-11 h-11 rounded-xl bg-accent grid place-items-center">
                <Share2 size={18} />
              </div>
              <span className="text-[11px] font-mono text-subtle">03 / SHIP IT</span>
            </div>
            <h3 className="font-serif text-2xl mb-2 relative">Generate social media post</h3>
            <p className="text-sm text-muted leading-relaxed relative">
              LinkedIn, X, and Instagram drafts in your chosen tone — built directly from this dashboard's findings. Hashtags included. Copy and ship.
            </p>
            <div className="flex items-center gap-2 mt-5 text-sm font-medium relative">
              Open Social Posts
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   AI INSIGHTS
   ============================================================= */
const InsightCard = ({ icon: Icon, title, accent, items, delay = 0 }) => (
  <div className="bg-card border border-app rounded-xl p-6 anim-rise" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg grid place-items-center" style={{ background: accent || "var(--accent-soft)" }}>
        <Icon size={16} />
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="text-sm leading-relaxed flex gap-3">
          <span className="font-mono text-xs text-subtle pt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="font-medium text-app">{it.title}</p>
            <p className="text-muted mt-0.5">{it.body}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Insights = ({ dataset, onToast }) => {
  const summary = `${dataset.name.replace(/\.[a-z]+$/i, "")} captures ${fmtInt(dataset.rows)} retail orders across 4 years (2015–2018), totaling ${fmtCurrency(dataset.kpis.totalSales)} in revenue from ${fmtInt(dataset.kpis.customers)} unique customers. Growth is healthy and accelerating: 2018 closed +20.7% YoY, with November setting a single-month record at $117.9K. Technology is the largest category (36.6% share) but Furniture's high-ticket Tables and Bookcases sub-categories show concerning performance. Consumer segment dominates (50.8%), while Home Office — the smallest segment — is the most efficient on a per-customer basis.`;

  return (
    <div className="px-5 lg:px-8 py-8 anim-fade">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            AI Insights
          </h1>
          <p className="text-muted text-sm mt-1">Generated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · model: claude-opus-4.7</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onToast("Insights exported · DOCX")} className="btn btn-ghost"><Download size={14} /> DOCX</button>
          <button onClick={() => onToast("Insights exported · TXT")} className="btn btn-ghost"><Download size={14} /> TXT</button>
          <button onClick={() => onToast("Re-running analysis")} className="btn btn-primary"><RefreshCw size={14} /> Re-analyze</button>
        </div>
      </div>

      {/* Executive summary */}
      <div className="bg-card border border-app rounded-2xl p-7 mb-6 relative overflow-hidden anim-rise">
        <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }} />
        <div className="flex items-center gap-2 mb-4">
          <Bot size={14} className="text-muted" />
          <span className="text-xs uppercase tracking-widest text-muted">Executive summary</span>
        </div>
        <p className="font-serif relative" style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)", lineHeight: 1.5 }}>
          {summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-5 relative">
          <span className="chip chip-accent"><TrendingUp size={11} /> Growth: strong</span>
          <span className="chip"><Layers size={11} /> Concentration: moderate</span>
          <span className="chip"><AlertTriangle size={11} /> 2 anomalies flagged</span>
          <span className="chip"><Target size={11} /> 4 recommended actions</span>
        </div>
      </div>

      {/* Insight grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <InsightCard
          icon={Sparkles}
          title="Key findings"
          accent="var(--accent-soft)"
          delay={120}
          items={[
            { title: "November is the breakout month", body: "Nov '18 sales hit $117.9K — 41% higher than the next best month and 173% above the yearly low. Q4 alone delivered 33% of full-year revenue." },
            { title: "Technology has the highest revenue, Phones the highest sub-category", body: "Phones leads with $327.8K, narrowly ahead of Chairs at $322.8K. Together they represent 28.8% of total revenue." },
            { title: "Geographic concentration is high", body: "New York City alone delivers $252K (11.2% of all revenue). The top 5 cities account for ~33% of the business." },
            { title: "Consumer segment is the volume engine", body: "Consumer accounts for 50.8% of revenue but only the second-highest avg order value. Home Office customers spend more per order on average." },
          ]}
        />

        <InsightCard
          icon={AlertTriangle}
          title="Anomalies & risks"
          accent="rgba(217, 119, 87, 0.15)"
          delay={200}
          items={[
            { title: "February '18 dip is statistically unusual", body: "Sales of $19.9K are 2.1σ below the 12-month mean. No corresponding drop in order count category-wide — suggests low-AOV transactions or a data quality issue worth investigating." },
            { title: "Fasteners sub-category is non-viable", body: "Only $3K total revenue across 4 years. Likely operating at a loss after handling and shipping. Candidate for delisting." },
            { title: "Single-city revenue concentration", body: "If New York City softens by 10%, total revenue drops 1.1%. Diversifying away from NYC dependency reduces tail risk." },
            { title: "Same-Day shipping under-utilized", body: "Only 538 of 9,800 orders use Same Day. If this is a margin-positive offering, there's room to upsell." },
          ]}
        />

        <InsightCard
          icon={Target}
          title="Recommendations"
          accent="rgba(47, 125, 91, 0.12)"
          delay={280}
          items={[
            { title: "Double down on Q4 with inventory + ad spend", body: "Pull forward 2026 Q4 campaign budget by 4 weeks and pre-stock Phones, Chairs, and Storage. Historical Q4 lift suggests >$140K incremental." },
            { title: "Launch a Home Office acquisition push", body: "Highest avg order value, smallest segment. A targeted LinkedIn campaign at 5–50 employee firms could move the needle disproportionately." },
            { title: "Bundle low performers with category leaders", body: "Pair Labels and Envelopes with Binders. Cross-sell will reduce dead inventory and lift attach rate." },
            { title: "Pilot a regional expansion in the South", body: "Smallest region by revenue ($389K) but with sub-category mix similar to higher-revenue regions. Geographic, not preference, gap." },
          ]}
        />

        <InsightCard
          icon={Zap}
          title="Opportunities"
          accent="rgba(200, 240, 69, 0.18)"
          delay={360}
          items={[
            { title: "$2.26M total revenue · trending up", body: "If 2018 momentum holds, 2026 trajectory exceeds $2.7M without new product launches." },
            { title: "793 customers · low repeat depth", body: "Avg of 6.2 orders per customer over 4 years implies whitespace for loyalty / subscription mechanics." },
            { title: "Tables sub-category margin review", body: "$202.8K revenue but historically negative net margin in datasets like this. Worth a unit-economics deep-dive before scaling." },
            { title: "Unstructured 'Product Name' field", body: "9,800 product names with no taxonomy beyond sub-category. Embedding-based clustering would surface natural product families and merchandising opportunities." },
          ]}
        />
      </div>
    </div>
  );
};

/* =============================================================
   SOCIAL POST GENERATOR
   ============================================================= */
const TONES = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "bold", label: "Bold" },
  { id: "data", label: "Data-driven" },
];

const PLATFORMS = [
  { id: "linkedin",  label: "LinkedIn",  icon: Linkedin,  charLimit: 3000 },
  { id: "twitter",   label: "X / Twitter", icon: Twitter, charLimit: 280 },
  { id: "instagram", label: "Instagram", icon: Instagram, charLimit: 2200 },
];

const POSTS = {
  linkedin: {
    professional:
`We just closed an analysis of 9,800 retail orders spanning 2015–2018, and three things stood out 👇

📈 Revenue grew +20.7% YoY in 2018, with November alone setting a record at $117.9K — 41% above the next best month.

🎯 Technology drove 36.6% of revenue, but the bigger story is segment concentration: Consumer represents over half of all sales, while Home Office punches well above its weight on order value.

🌎 The top 5 cities — led by New York City at $252K — account for one-third of total revenue. That's both a strength and a tail risk worth diversifying.

The takeaway for any retailer reading this: your Q4 is probably bigger than you're treating it. Pre-stage your inventory and pull marketing forward by a month.`,
    casual:
`Spent the morning with a 9.8K-row sales dataset and honestly, the numbers tell a great story 🙌

→ +20.7% revenue growth last year
→ November = the GOAT month ($117.9K)
→ NYC alone driving 11% of all revenue

Best part? The data was screaming "lean into Q4" and nobody had to ask a question to find out. AI did the analysis in seconds.

This is what data work should feel like.`,
    bold:
`Most retail dashboards are wrong by default.

I just analyzed 9,800 orders across 4 years and the data was unambiguous:

→ Q4 delivers 33% of annual revenue. Most teams under-invest by 6 weeks.
→ Fasteners generated $3K in 4 years. It should not exist.
→ NYC is 11% of revenue. That's a single point of failure.

Stop optimizing the average. Start fixing the obvious.`,
    data:
`Sales analysis: 9,800 orders | 2015–2018 | $2.26M revenue

KPIs:
• YoY growth (2018): +20.7%
• AOV: $459.52
• Unique customers: 793
• Avg orders per customer: 6.2

Top finding: Consumer segment = 50.8% of revenue but Home Office has highest AOV. Acquisition mix should rebalance.

Anomalies: 1 month at -2.1σ, 1 sub-category at <$3K cumulative.

Full breakdown 🔽`,
  },
  twitter: {
    professional:
`9,800 orders. 4 years. 1 dataset.

Three things the data made obvious:
→ +20.7% YoY revenue growth
→ Q4 = 33% of annual revenue
→ NYC alone = 11% of total

The takeaway: most retail teams under-invest in October.`,
    casual:
`just had AI tear through 9,800 sales records in like 12 seconds and honestly? November was the main character. $117K in one month. wild.`,
    bold:
`Your Q4 plan is too small.

The data on 9,800 orders showed Q4 delivers 33% of annual revenue. Most teams treat it like 25%.

That's the gap.`,
    data:
`📊 Retail sales (2015–2018)

• Rev: $2.26M (+20.7% YoY)
• AOV: $459.52
• Top cat: Tech (36.6%)
• Top city: NYC ($252K, 11%)
• Anomaly: Feb '18 at -2.1σ

#datascience`,
  },
  instagram: {
    professional:
`The story behind 9,800 orders ✨

When you let AI read the data instead of just summarize it, the patterns you find are different.

This dataset showed:
→ +20.7% growth year over year
→ November as the standout month
→ A single city driving 11% of all revenue

It's not magic. It's just attention paid at scale.`,
    casual:
`POV: you upload a spreadsheet and 12 seconds later you have a full strategy meeting in your hands 📊✨

ai-powered analytics is genuinely fun now`,
    bold:
`STOP guessing what your data means.

9,800 orders in. 47 insights out. Zero queries written.

Built to read your business like a senior analyst would. Just faster.`,
    data:
`Numbers from a 4-year retail dataset 🧵

· $2.26M revenue
· 4,922 orders
· 793 customers
· +20.7% YoY
· NYC = 11% of total

#retail #analytics #data`,
  },
};

const HASHTAGS = {
  professional: ["#dataanalytics", "#retail", "#businessintelligence", "#growth"],
  casual: ["#datascience", "#analytics", "#nerdstuff"],
  bold: ["#strategy", "#data", "#growth", "#retail"],
  data: ["#datascience", "#analytics", "#kpi", "#retail", "#dashboards"],
};

const Social = ({ onToast }) => {
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("linkedin");
  const [regenKey, setRegenKey] = useState(0);

  const post = POSTS[platform][tone];
  const tags = HASHTAGS[tone];
  const PlatformIcon = PLATFORMS.find(p => p.id === platform).icon;
  const limit = PLATFORMS.find(p => p.id === platform).charLimit;

  const copy = () => {
    const txt = post + "\n\n" + tags.join(" ");
    navigator.clipboard?.writeText(txt);
    onToast("Copied to clipboard");
  };

  return (
    <div className="px-5 lg:px-8 py-8 anim-fade max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
          Social posts, written for you
        </h1>
        <p className="text-muted text-sm mt-1">From your dataset's findings · pick a platform and tone · ship in seconds</p>
      </div>

      {/* Controls */}
      <div className="bg-card border border-app rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">Platform</p>
            <div className="flex gap-2">
              {PLATFORMS.map(p => {
                const active = p.id === platform;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition border"
                    style={{
                      background: active ? "var(--text)" : "var(--card)",
                      color: active ? "var(--bg)" : "var(--text)",
                      borderColor: active ? "var(--text)" : "var(--border)",
                    }}
                  >
                    <Icon size={14} />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">Tone</p>
            <div className="flex flex-wrap gap-2">
              {TONES.map(t => {
                const active = t.id === tone;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className="px-3 py-1.5 rounded-full text-xs transition border"
                    style={{
                      background: active ? "var(--accent)" : "var(--card)",
                      color: active ? "var(--accent-fg)" : "var(--text)",
                      borderColor: active ? "var(--accent)" : "var(--border)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Post preview */}
      <div key={regenKey} className="bg-card border border-app rounded-2xl overflow-hidden anim-fade">
        <div className="px-5 py-3 border-b border-app flex items-center justify-between bg-elev">
          <div className="flex items-center gap-2 text-sm">
            <PlatformIcon size={14} />
            <span className="font-medium">{PLATFORMS.find(p => p.id === platform).label} · {TONES.find(t => t.id === tone).label}</span>
          </div>
          <span className="text-xs text-muted font-mono">{post.length} / {limit}</span>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent grid place-items-center font-serif text-lg">i</div>
            <div>
              <p className="text-sm font-medium">InsightAI</p>
              <p className="text-xs text-muted">Auto-drafted · Edit before publishing</p>
            </div>
          </div>
          <p className="text-sm whitespace-pre-line leading-relaxed">{post}</p>
          <div className="flex flex-wrap gap-1.5 mt-5">
            {tags.map((h, i) => (
              <span key={i} className="chip chip-accent" style={{ fontSize: 11 }}>
                <Hash size={10} /> {h.replace("#", "")}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-app px-5 py-3 flex items-center gap-2 bg-elev">
          <button onClick={copy} className="btn btn-accent">
            <Copy size={13} /> Copy post
          </button>
          <button onClick={() => { setRegenKey(k => k + 1); onToast("Regenerating post..."); }} className="btn btn-ghost">
            <RefreshCw size={13} /> Regenerate
          </button>
          <button className="btn btn-ghost">
            <Download size={13} /> Save draft
          </button>
          <span className="ml-auto text-xs text-subtle hidden sm:block">tip: drag the tone selector to remix</span>
        </div>
      </div>

      {/* Variations */}
      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">Other tones at a glance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TONES.filter(t => t.id !== tone).map(t => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className="text-left bg-card border border-app rounded-xl p-4 hover:border-strong transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium uppercase tracking-widest text-muted">{t.label}</span>
                <ArrowRight size={13} className="text-muted" />
              </div>
              <p className="text-xs text-muted leading-relaxed line-clamp-3">{POSTS[platform][t.id].slice(0, 130)}...</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   APP SHELL
   ============================================================= */
export default function App() {
  const [view, setView] = useState("landing");
  const [theme, setTheme] = useState("light");
  const [dataset, setDataset] = useState(DEMO_DATASET);
  const [uploads, setUploads] = useState(RECENT_UPLOADS);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const onToast = (msg) => setToast(msg);

  return (
    <>
      <ThemeStyles />
      {view === "landing" ? (
        <Landing theme={theme} setTheme={setTheme} onLaunch={() => setView("upload")} />
      ) : (
        <div className="min-h-screen flex bg-app text-app">
          <Sidebar view={view} setView={setView} dataset={dataset} theme={theme} setTheme={setTheme} />
          <main className="flex-1 min-w-0 flex flex-col">
            <TopBar view={view} setView={setView} onExport={onToast} />
            <div className="flex-1 overflow-y-auto">
              {view === "upload"    && <Upload_View dataset={dataset} uploads={uploads} setDataset={setDataset} setUploads={setUploads} onToast={onToast} goDashboard={() => setView("dashboard")} />}
              {view === "dashboard" && <Dashboard dataset={dataset} onToast={onToast} setView={setView} />}
              {view === "insights"  && <Insights dataset={dataset} onToast={onToast} />}
              {view === "social"    && <Social onToast={onToast} />}
            </div>
          </main>
        </div>
      )}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
