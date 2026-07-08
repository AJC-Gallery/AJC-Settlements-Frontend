 import GlassCard from "@/components/ui/glassCard";
import "./HowItWorksSection.css";

/* ==========================================================
   Small inline icon set — kept minimal on purpose so the
   sidebar reads as "icons with room to breathe" like the
   concept, not a busy icon library.
   ========================================================== */
const Icon = {
  Link: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" strokeLinecap="round" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" strokeLinecap="round" />
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 11.5 12 4l8 7.5M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 8a3 3 0 1 1 0 6M21 20c0-2.6-1.7-4.8-4-5.6" strokeLinecap="round" />
    </svg>
  ),
  Dollar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5.9 2.5 2c0 3-5 1.7-5 4.5 0 1.1 1.1 2 2.5 2s2.5-1.1 2.5-2.5" strokeLinecap="round" />
    </svg>
  ),
  Gear: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.7a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.3a7 7 0 0 0-2 1.2l-2.4-.7-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-.7a7 7 0 0 0 2 1.2L10 21h4l.5-2.3a7 7 0 0 0 2-1.2l2.4.7 2-3.4-2-1.6c.07-.4.1-.8.1-1.2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" strokeLinecap="round" />
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Door: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M14.5 12h.01" strokeLinecap="round" />
    </svg>
  ),
  Pencil: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m16.5 4 3.5 3.5L8.5 19H5v-3.5L16.5 4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const SIDEBAR_ICONS = [Icon.Link, Icon.Home, Icon.Building, Icon.Users, Icon.Door, Icon.Gear, Icon.Share];

function MockSidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mock-sidebar">
      {SIDEBAR_ICONS.map((Ic, i) => (
        <div key={i} className={`mock-icon${i === activeIndex ? " active" : ""}`}>
          <Ic />
        </div>
      ))}
      <div className="mock-icon avatar">JO</div>
    </div>
  );
}

function MockTopbar({ subtitle }: { subtitle: string }) {
  return (
    <div className="mock-topbar">
      <span className="mock-logo">Assets</span>
      <div className="mock-topnav">
        <span>Contact us</span>
        <span>Organization</span>
      </div>
    </div>
  );
}

/* ---------- Row 1 visual: Add Property form ---------- */
function AddPropertyMock() {
  return (
    <div className="mock-app">
      <MockSidebar activeIndex={2} />
      <div className="mock-main">
        <MockTopbar subtitle="" />
        <div className="mock-welcome">Welcome back, chase</div>
        <div className="mock-panel-title">Add New Property</div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div className="mock-label">Property Name</div>
              <div className="mock-input">Add name</div>
            </div>
            <div>
              <div className="mock-label">Property type</div>
              <div className="mock-input">Residential ⌄</div>
            </div>
            <div>
              <div className="mock-label">Base Rental Amount</div>
              <div className="mock-input">$</div>
            </div>
          </div>
          <div className="mock-photo" style={{ flex: 1, minHeight: 110 }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto", justifyContent: "flex-end" }}>
          <div className="mock-btn ghost">Cancel</div>
          <div className="mock-btn primary">Save Property</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Row 2 visual: Property detail card ---------- */
function PropertyDetailMock() {
  return (
    <div className="mock-app">
      <MockSidebar activeIndex={2} />
      <div className="mock-main">
        <MockTopbar subtitle="" />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--accent)", fontSize: 11 }}>●</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>Elf House</span>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: -8 }}>Ajah, Lagos, Nigeria</div>
        <div style={{ display: "flex", gap: 14 }}>
          <div className="mock-photo" style={{ width: "42%", minHeight: 90 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, fontSize: 9.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
              <span>Unit Type</span>
              <span># of Units</span>
              <span># of Bedrooms</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-primary)", fontWeight: 600 }}>
              <span>Residential</span>
              <span>12</span>
              <span>3 Bedrooms</span>
            </div>
            <div className="mock-divider" />
            <div style={{ color: "var(--text-muted)" }}>Description</div>
            <div style={{ color: "var(--text-secondary)" }}>Newly refurbished building.</div>
          </div>
        </div>
        <div style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Updated 07/01/2026</div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <div className="mock-btn ghost" style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 11, height: 11 }}><Icon.Pencil /></span> Edit Details
          </div>
          <div className="mock-btn danger" style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 11, height: 11 }}><Icon.Trash /></span> Delete Asset
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Row 3 visual: Full dashboard ---------- */
const CHART_POINTS = [22, 28, 25, 38, 34, 46, 40, 62, 44, 50, 58, 50]; // relative heights
const CHART_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function DashboardMock() {
  const w = 460;
  const h = 110;
  const stepX = w / (CHART_POINTS.length - 1);
  const max = Math.max(...CHART_POINTS);
  const toY = (v: number) => h - (v / max) * (h - 14) - 6;
  const points = CHART_POINTS.map((v, i) => [i * stepX, toY(v)] as const);
  const linePath = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;
  const peakIndex = CHART_POINTS.indexOf(max);

  return (
    <div className="mock-app">
      <MockSidebar activeIndex={1} />
      <div className="mock-main">
        <MockTopbar subtitle="" />
        <div className="mock-welcome">Welcome back, chase — here's what's happening today.</div>

        <div style={{ display: "flex", gap: 8 }}>
          {[
            { icon: Icon.Building, label: "Total Properties", value: "34" },
            { icon: Icon.Door, label: "Occupied Units", value: "36" },
            { icon: Icon.Layers, label: "Vacant Units", value: "36" },
            { icon: Icon.Home, label: "Total Units", value: "58" },
            { icon: Icon.Dollar, label: "Monthly Collections", value: "₦8.4M" },
          ].map((s, i) => (
            <div key={i} className="mock-stat">
              <div className="mock-stat-label">
                <span style={{ width: 9, height: 9, color: "var(--accent)" }}>
                  <s.icon />
                </span>
                {s.label}
              </div>
              <div className="mock-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1.6, display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="mock-panel-title" style={{ marginBottom: 0 }}>Monthly Collections</div>
            <div style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Track your income over time across all properties</div>
            <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
              <defs>
                <linearGradient id="hiws-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(47,230,167,0.35)" />
                  <stop offset="100%" stopColor="rgba(47,230,167,0)" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#hiws-area)" />
              <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {points.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === peakIndex ? 3.2 : 2} fill={i === peakIndex ? "#fff" : "var(--accent)"} />
              ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, color: "var(--text-muted)" }}>
              {CHART_MONTHS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="mock-panel-title" style={{ marginBottom: 0 }}>Recent Properties</div>
              <span style={{ fontSize: 8.5, color: "var(--accent)" }}>View all</span>
            </div>
            {[
              { name: "Elf House", loc: "Ajah, Lagos" },
              { name: "Chantiem", loc: "Lekki, Lagos" },
              { name: "AJC Yabass", loc: "Yaba, Lagos" },
              { name: "Sunset Apartments", loc: "Ikoyi, Lagos" },
            ].map((p) => (
              <div key={p.name} className="mock-recent-item">
                <div className="mock-photo mock-recent-thumb" />
                <div>
                  <div className="mock-recent-name">{p.name}</div>
                  <div className="mock-recent-loc">{p.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   STEP DATA
   ========================================================== */
const STEPS = [
  {
    number: "01",
    eyebrow: "Add",
    title: "Add properties effortlessly.",
    description: "Create new properties in minutes and keep every detail in one organized place.",
    visual: AddPropertyMock,
  },
  {
    number: "02",
    eyebrow: "Organize",
    title: "Organize with complete clarity.",
    description: "Every property has its own profile with units, descriptions and important information.",
    visual: PropertyDetailMock,
  },
  {
    number: "03",
    eyebrow: "Manage",
    title: "Manage, monitor and stay in control.",
    description: "Track occupancy, monitor collections and keep your business running smoothly.",
    visual: DashboardMock,
  },
];

function StepRow({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const Visual = step.visual;
  const reversed = index % 2 === 1;

  return (
    <GlassCard
      variant="panel"
      className={`flex items-center gap-16 ${reversed ? "flex-row-reverse" : ""}`}
    >
      <div className="hiws-text">
        <span className="hiws-ghost-number">{step.number}</span>
        <div className="hiws-eyebrow">{step.eyebrow}</div>
        <h3 className="hiws-title">{step.title}</h3>
        <p className="hiws-desc">{step.description}</p>
      </div>
      <div className="hiws-visual">
        <div className="hiws-dashboard-glow" />
        <div className="hiws-dashboard-shell">
          <Visual />
        </div>
      </div>
    </GlassCard>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="hiws-section">
      <div className="hiws-container">
        {STEPS.map((step, i) => (
          <StepRow key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}