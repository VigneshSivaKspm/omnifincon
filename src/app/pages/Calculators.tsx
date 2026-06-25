import { useState, useCallback } from "react";
import { ArrowRight, Calculator, TrendingUp, Briefcase, BarChart2, Home, PieChart } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, SURF_BORDER, CARD_SHADOW, CARD_SHADOW_LG } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, PageHero } from "../components/shared/Atoms";

/* ─── Utility ─── */
function fmt(n: number, decimals = 0) {
  if (!isFinite(n) || n < 0) return "—";
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: decimals })}`;
}
function fmtPct(n: number) { return isFinite(n) ? `${n.toFixed(2)}%` : "—"; }

const ACCENT_COLORS = [G, GOLD, BLUE, PURPLE, G, GOLD];

/* ─── Shared sub-components ─── */
function CalcCard({ title, icon: Icon, color, children }: { title: string; icon: React.ElementType; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl overflow-hidden"
      style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW_LG }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-7 pt-7 pb-5" style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={20} color={color} />
        </div>
        <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.15rem", fontWeight: 700, color: TEXT1 }}>{title}</h3>
      </div>
      <div className="p-7">{children}</div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, display, color }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string; color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2 }}>{label}</label>
        <span className="px-3 py-1 rounded-lg text-xs font-bold"
          style={{ background: `${color}18`, color, fontFamily: FONT_SANS, border: `1px solid ${color}25` }}>{display}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full" style={{ background: "#DDE3EF" }} />
        <div className="absolute h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${color}80,${color})` }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e=>onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 h-5 cursor-pointer" />
        <div className="absolute w-4 h-4 rounded-full border-2 shadow-lg transition-all"
          style={{ left: `calc(${pct}% - 8px)`, background: color, borderColor: "#1a2540", boxShadow: `0 0 12px ${color}60` }} />
      </div>
      <div className="flex justify-between text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS }}>
        <span>{min.toLocaleString("en-IN")}</span><span>{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight, color }: { label: string; value: string; highlight?: boolean; color: string }) {
  return (
    <div className="flex items-center justify-between py-3"
      style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
      <span style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: highlight ? TEXT1 : TEXT2, fontWeight: highlight ? 600 : 400 }}>{label}</span>
      <span style={{ fontFamily: FONT_NUM, fontSize: highlight ? "1.25rem" : "0.95rem", fontWeight: highlight ? 800 : 700, color: highlight ? color : TEXT1, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

/* ─── 1. EMI Calculator ─── */
function EmiCalculator({ color }: { color: string }) {
  const [principal, setPrincipal] = useState(25_00_000);
  const [rate, setRate]           = useState(10.5);
  const [tenure, setTenure]       = useState(20);

  const r   = rate / 12 / 100;
  const n   = tenure * 12;
  const emi = r > 0 ? (principal * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : principal/n;
  const total = emi * n;
  const interest = total - principal;

  return (
    <CalcCard title="EMI Calculator" icon={Calculator} color={color}>
      <div className="flex flex-col gap-5">
        <Slider label="Loan Amount" value={principal} min={1_00_000} max={5_00_00_000} step={50_000}
          onChange={setPrincipal} display={fmt(principal)} color={color} />
        <Slider label="Interest Rate (% p.a.)" value={rate} min={6} max={24} step={0.1}
          onChange={setRate} display={`${rate.toFixed(1)}%`} color={color} />
        <Slider label="Loan Tenure (Years)" value={tenure} min={1} max={30} step={1}
          onChange={setTenure} display={`${tenure} yr`} color={color} />
        <div className="mt-2 rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
          <ResultRow label="Monthly EMI"       value={fmt(emi, 0)}       highlight color={color} />
          <ResultRow label="Total Interest"    value={fmt(interest, 0)}              color={color} />
          <ResultRow label="Total Payment"     value={fmt(total, 0)}                 color={color} />
          <div className="pt-3">
            <div className="flex rounded-full overflow-hidden h-2.5 mt-1">
              <div style={{ width: `${(principal/total)*100}%`, background: color, borderRadius: "9999px 0 0 9999px" }} />
              <div style={{ flex: 1, background: `${color}30`, borderRadius: "0 9999px 9999px 0" }} />
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>
              <span>Principal: {((principal/total)*100).toFixed(0)}%</span>
              <span>Interest: {((interest/total)*100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── 2. Loan Eligibility Calculator ─── */
function EligibilityCalculator({ color }: { color: string }) {
  const [income, setIncome]           = useState(1_50_000);
  const [existingEmi, setExistingEmi] = useState(20_000);
  const [rate, setRate]               = useState(10.5);
  const [tenure, setTenure]           = useState(20);

  const maxEmi  = income * 0.5 - existingEmi;
  const r       = rate / 12 / 100;
  const n       = tenure * 12;
  const eligible= maxEmi > 0 && r > 0 ? (maxEmi * (Math.pow(1+r,n)-1)) / (r * Math.pow(1+r,n)) : 0;

  return (
    <CalcCard title="Loan Eligibility Calculator" icon={TrendingUp} color={color}>
      <div className="flex flex-col gap-5">
        <Slider label="Monthly Net Income" value={income} min={25_000} max={20_00_000} step={5_000}
          onChange={setIncome} display={fmt(income)} color={color} />
        <Slider label="Existing Monthly EMIs" value={existingEmi} min={0} max={5_00_000} step={1_000}
          onChange={setExistingEmi} display={fmt(existingEmi)} color={color} />
        <Slider label="Expected Rate (% p.a.)" value={rate} min={6} max={20} step={0.1}
          onChange={setRate} display={`${rate.toFixed(1)}%`} color={color} />
        <Slider label="Loan Tenure (Years)" value={tenure} min={1} max={30} step={1}
          onChange={setTenure} display={`${tenure} yr`} color={color} />
        <div className="mt-2 rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
          <ResultRow label="Max Eligible EMI"   value={fmt(Math.max(0, maxEmi), 0)} color={color} />
          <ResultRow label="Loan Eligibility"   value={eligible > 0 ? fmt(eligible, 0) : "Insufficient Income"} highlight color={color} />
          <ResultRow label="FOIR (Fixed Obligation to Income Ratio)" value={fmtPct(((existingEmi / income) * 100))} color={color} />
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── 3. Working Capital Calculator ─── */
function WorkingCapitalCalculator({ color }: { color: string }) {
  const [sales, setSales]             = useState(1_00_00_000);
  const [debtorDays, setDebtorDays]   = useState(45);
  const [creditorDays, setCreditorDays] = useState(30);
  const [inventoryDays, setInventoryDays] = useState(30);
  const [marginPct, setMarginPct]     = useState(20);

  const dailySales  = sales / 365;
  const debtors     = dailySales * debtorDays;
  const inventory   = dailySales * (1 - marginPct/100) * inventoryDays;
  const creditors   = dailySales * (1 - marginPct/100) * creditorDays;
  const netWC       = debtors + inventory - creditors;
  const wcFinance   = netWC * 0.75;

  return (
    <CalcCard title="Working Capital Calculator" icon={Briefcase} color={color}>
      <div className="flex flex-col gap-5">
        <Slider label="Annual Sales / Turnover" value={sales} min={10_00_000} max={100_00_00_000} step={10_00_000}
          onChange={setSales} display={fmt(sales)} color={color} />
        <Slider label="Debtor Collection Days" value={debtorDays} min={0} max={180} step={5}
          onChange={setDebtorDays} display={`${debtorDays} days`} color={color} />
        <Slider label="Inventory Holding Days" value={inventoryDays} min={0} max={180} step={5}
          onChange={setInventoryDays} display={`${inventoryDays} days`} color={color} />
        <Slider label="Creditor Payment Days" value={creditorDays} min={0} max={120} step={5}
          onChange={setCreditorDays} display={`${creditorDays} days`} color={color} />
        <Slider label="Gross Profit Margin (%)" value={marginPct} min={5} max={60} step={1}
          onChange={setMarginPct} display={`${marginPct}%`} color={color} />
        <div className="mt-2 rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
          <ResultRow label="Debtor Funding Required"   value={fmt(debtors)}   color={color} />
          <ResultRow label="Inventory Funding Required" value={fmt(inventory)} color={color} />
          <ResultRow label="Less: Creditor Funding"    value={`- ${fmt(creditors)}`} color={color} />
          <ResultRow label="Net Working Capital Gap"   value={fmt(netWC)}    highlight color={color} />
          <ResultRow label="Bank Finance (75% of Gap)" value={fmt(wcFinance)}         color={color} />
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── 4. DSCR Calculator ─── */
function DscrCalculator({ color }: { color: string }) {
  const [ebitda, setEbitda]       = useState(2_00_00_000);
  const [tax, setTax]             = useState(25);
  const [emi, setEmi]             = useState(50_00_000);
  const [interest, setInterest]   = useState(20_00_000);

  const nopat   = ebitda * (1 - tax/100);
  const ds      = emi + interest;
  const dscr    = ds > 0 ? (nopat + interest * (1-tax/100)) / ds : 0;
  const dscrStatus = dscr >= 1.25 ? { label: "Excellent — Bankable", color: "#22c55e" }
    : dscr >= 1.0  ? { label: "Acceptable — Review Required", color: GOLD }
    : { label: "Below Threshold — Improvement Needed", color: "#ef4444" };

  return (
    <CalcCard title="DSCR Calculator" icon={BarChart2} color={color}>
      <div className="flex flex-col gap-5">
        <Slider label="Annual EBITDA" value={ebitda} min={10_00_000} max={100_00_00_000} step={10_00_000}
          onChange={setEbitda} display={fmt(ebitda)} color={color} />
        <Slider label="Effective Tax Rate (%)" value={tax} min={0} max={40} step={1}
          onChange={setTax} display={`${tax}%`} color={color} />
        <Slider label="Annual Principal Repayment (EMI)" value={emi} min={5_00_000} max={50_00_00_000} step={5_00_000}
          onChange={setEmi} display={fmt(emi)} color={color} />
        <Slider label="Annual Interest Payment" value={interest} min={0} max={50_00_00_000} step={1_00_000}
          onChange={setInterest} display={fmt(interest)} color={color} />
        <div className="mt-2 rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
          <ResultRow label="Net Operating Income" value={fmt(nopat)}    color={color} />
          <ResultRow label="Total Debt Service"   value={fmt(ds)}       color={color} />
          <ResultRow label="DSCR"                 value={dscr.toFixed(2) + "x"} highlight color={color} />
          <div className="mt-3 px-3 py-2 rounded-lg" style={{ background: `${dscrStatus.color}15`, border: `1px solid ${dscrStatus.color}30` }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", fontWeight: 700, color: dscrStatus.color }}>{dscrStatus.label}</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, marginTop: "2px" }}>Banks typically require DSCR ≥ 1.25x for term loans</p>
          </div>
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── 5. LTV Calculator ─── */
function LtvCalculator({ color }: { color: string }) {
  const [propertyVal, setPropertyVal] = useState(1_50_00_000);
  const [loanAmount, setLoanAmount]   = useState(1_00_00_000);
  const [loanType, setLoanType]       = useState<"home"|"lap">("home");

  const ltv       = propertyVal > 0 ? (loanAmount / propertyVal) * 100 : 0;
  const maxLtv    = loanType === "home" ? 80 : 60;
  const maxLoan   = propertyVal * maxLtv / 100;
  const equity    = propertyVal - loanAmount;
  const ltvStatus = ltv <= maxLtv * 0.85  ? { label: "Conservative — Good Coverage",  color: "#22c55e" }
    : ltv <= maxLtv                         ? { label: "Acceptable — Within Bank Norms", color: GOLD }
    : { label: "Exceeds Bank Guidelines",    color: "#ef4444" };

  return (
    <CalcCard title="LTV Calculator" icon={Home} color={color}>
      <div className="flex flex-col gap-5">
        {/* Loan type toggle */}
        <div>
          <label className="text-xs mb-2 block" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Loan Type</label>
          <div className="flex gap-2">
            {(["home","lap"] as const).map(t => (
              <button key={t} onClick={()=>setLoanType(t)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: loanType===t ? `${color}15` : "#F4F7FD",
                  border: loanType===t ? `1px solid ${color}38` : `1px solid ${SURF_BORDER}`,
                  color: loanType===t ? color : TEXT2, fontFamily: FONT_SANS,
                }}>
                {t === "home" ? "Home Loan (80% LTV)" : "Loan Against Property (60% LTV)"}
              </button>
            ))}
          </div>
        </div>
        <Slider label="Property Value" value={propertyVal} min={10_00_000} max={100_00_00_000} step={5_00_000}
          onChange={setPropertyVal} display={fmt(propertyVal)} color={color} />
        <Slider label="Loan Amount Sought" value={loanAmount} min={5_00_000} max={Math.min(100_00_00_000, propertyVal)} step={5_00_000}
          onChange={setLoanAmount} display={fmt(loanAmount)} color={color} />
        <div className="mt-2 rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
          <ResultRow label="Loan to Value (LTV)"     value={fmtPct(ltv)}   highlight color={color} />
          <ResultRow label="Max Eligible Loan"       value={fmt(maxLoan)}             color={color} />
          <ResultRow label="Owner Equity (Required)" value={fmt(equity)}              color={color} />
          <div className="mt-4">
            <div className="flex rounded-full overflow-hidden h-3">
              <div style={{ width: `${Math.min(ltv,100)}%`, background: ltvStatus.color, borderRadius: "9999px 0 0 9999px", transition: "width 0.4s ease" }} />
              <div style={{ flex: 1, background: "#DDE3EF", borderRadius: "0 9999px 9999px 0" }} />
            </div>
            <p className="mt-2 text-xs font-bold" style={{ color: ltvStatus.color, fontFamily: FONT_SANS }}>{ltvStatus.label}</p>
          </div>
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── 6. Financial Ratio Calculator ─── */
function FinancialRatioCalculator({ color }: { color: string }) {
  const [revenue, setRevenue]       = useState(10_00_00_000);
  const [cogs, setCogs]             = useState(6_00_00_000);
  const [opex, setOpex]             = useState(1_50_00_000);
  const [currentAssets, setCA]      = useState(5_00_00_000);
  const [currentLiabilities, setCL] = useState(3_00_00_000);
  const [totalDebt, setDebt]        = useState(8_00_00_000);
  const [equity, setEquity]         = useState(4_00_00_000);

  const grossProfit   = revenue - cogs;
  const ebitda        = grossProfit - opex;
  const gpm           = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const ebitdaMargin  = revenue > 0 ? (ebitda / revenue) * 100 : 0;
  const currentRatio  = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio    = currentLiabilities > 0 ? (currentAssets * 0.7) / currentLiabilities : 0;
  const debtToEquity  = equity > 0 ? totalDebt / equity : 0;
  const assetTurnover = (currentAssets + totalDebt) > 0 ? revenue / (currentAssets + totalDebt) : 0;

  const RatioRow = ({ label, val, good }: { label: string; val: string; good: boolean }) => (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
      <span style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2 }}>{label}</span>
      <span className="px-2.5 py-0.5 rounded-lg text-sm font-bold"
        style={{ background: good ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", color: good ? "#22c55e" : "#ef4444", fontFamily: FONT_SERIF }}>
        {val}
      </span>
    </div>
  );

  return (
    <CalcCard title="Financial Ratio Calculator" icon={PieChart} color={color}>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color, fontFamily: FONT_SANS }}>P&L Inputs</p>
          <Slider label="Annual Revenue" value={revenue} min={10_00_000} max={1000_00_00_000} step={50_00_000}
            onChange={setRevenue} display={fmt(revenue)} color={color} />
          <Slider label="Cost of Goods Sold" value={cogs} min={0} max={revenue} step={10_00_000}
            onChange={setCogs} display={fmt(cogs)} color={color} />
          <Slider label="Operating Expenses (excl. COGS)" value={opex} min={0} max={revenue} step={5_00_000}
            onChange={setOpex} display={fmt(opex)} color={color} />
          <p className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color, fontFamily: FONT_SANS }}>Balance Sheet Inputs</p>
          <Slider label="Current Assets" value={currentAssets} min={10_00_000} max={500_00_00_000} step={10_00_000}
            onChange={setCA} display={fmt(currentAssets)} color={color} />
          <Slider label="Current Liabilities" value={currentLiabilities} min={0} max={500_00_00_000} step={10_00_000}
            onChange={setCL} display={fmt(currentLiabilities)} color={color} />
          <Slider label="Total Debt (LT + ST)" value={totalDebt} min={0} max={500_00_00_000} step={10_00_000}
            onChange={setDebt} display={fmt(totalDebt)} color={color} />
          <Slider label="Total Equity / Networth" value={equity} min={10_00_000} max={500_00_00_000} step={10_00_000}
            onChange={setEquity} display={fmt(equity)} color={color} />
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color, fontFamily: FONT_SANS }}>Output Ratios</p>
          <div className="rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
            <p className="text-xs font-semibold mb-3" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Profitability</p>
            <RatioRow label="Gross Profit Margin"  val={fmtPct(gpm)}          good={gpm >= 25} />
            <RatioRow label="EBITDA Margin"        val={fmtPct(ebitdaMargin)} good={ebitdaMargin >= 15} />
            <p className="text-xs font-semibold mt-4 mb-3" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Liquidity</p>
            <RatioRow label="Current Ratio"        val={currentRatio.toFixed(2)+"x"} good={currentRatio >= 1.33} />
            <RatioRow label="Quick Ratio (est.)"   val={quickRatio.toFixed(2)+"x"}   good={quickRatio >= 1.0} />
            <p className="text-xs font-semibold mt-4 mb-3" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Leverage</p>
            <RatioRow label="Debt to Equity"       val={debtToEquity.toFixed(2)+"x"} good={debtToEquity <= 2.0} />
            <RatioRow label="Asset Turnover (est.)" val={assetTurnover.toFixed(2)+"x"} good={assetTurnover >= 1.0} />
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}` }}>
            <p className="text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS, lineHeight: 1.7 }}>
              <span style={{ color: TEXT1, fontWeight: 600 }}>Benchmarks:</span> GPM ≥25%, EBITDA Margin ≥15%, Current Ratio ≥1.33x, D/E ≤2x are typical bank lending benchmarks for mid-market corporates.
            </p>
          </div>
        </div>
      </div>
    </CalcCard>
  );
}

/* ─── Main Page ─── */
const CALC_TABS = [
  { id: "emi",      label: "EMI",           icon: Calculator },
  { id: "eligible", label: "Eligibility",   icon: TrendingUp },
  { id: "wc",       label: "Working Capital",icon: Briefcase  },
  { id: "dscr",     label: "DSCR",          icon: BarChart2  },
  { id: "ltv",      label: "LTV",           icon: Home       },
  { id: "ratio",    label: "Financial Ratio",icon: PieChart   },
];

export default function Calculators() {
  const [active, setActive] = useState("emi");
  const idx   = CALC_TABS.findIndex(t => t.id === active);
  const color = ACCENT_COLORS[idx] || G;

  return (
    <>
      <PageHero
        pill="Financial Calculators"
        pillColor={G}
        title="Smart Tools for"
        titleAccent="Smarter Decisions."
        accentColor={G}
        desc="Six professional-grade financial calculators used by our advisors — now available free. Model your loan, assess eligibility, or stress-test your financial ratios in seconds."
      />

      {/* Tab bar */}
      <section className="py-6 sticky top-[calc(64px+36px)] z-20"
        style={{ background: "#FFFFFF", borderBottom: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {CALC_TABS.map((tab, i) => {
              const Icon = tab.icon;
              const tabColor = ACCENT_COLORS[i];
              return (
                <button key={tab.id} onClick={()=>setActive(tab.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: active===tab.id ? `${tabColor}15` : "#F4F7FD",
                    border: active===tab.id ? `1px solid ${tabColor}38` : `1px solid ${SURF_BORDER}`,
                    color: active===tab.id ? tabColor : TEXT2, fontFamily: FONT_SANS,
                  }}>
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator panel */}
      <section className="py-16 lg:py-20" style={{ background: NAVY }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <RevealWrapper key={active}>
            {active === "emi"      && <EmiCalculator      color={color} />}
            {active === "eligible" && <EligibilityCalculator color={color} />}
            {active === "wc"       && <WorkingCapitalCalculator color={color} />}
            {active === "dscr"     && <DscrCalculator     color={color} />}
            {active === "ltv"      && <LtvCalculator      color={color} />}
            {active === "ratio"    && <FinancialRatioCalculator color={color} />}
          </RevealWrapper>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS, lineHeight: 1.7 }}>
            * All calculations are indicative and for educational purposes only. Actual loan amounts, EMIs, and ratios may differ based on lender policies, credit assessment, and documentation. Consult a qualified financial advisor before making financial decisions.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2 }}>
              Need a detailed financial analysis or loan facilitation?
            </p>
            <GlowButton color={G} href="/contact" size="lg">Talk to an Advisor <ArrowRight size={14} /></GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
