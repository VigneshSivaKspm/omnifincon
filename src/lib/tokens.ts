// ─── OMNI Fincon Design Tokens — Premium Light Theme ─────────────────────────

// ── Brand Accents ────────────────────────────────────────────────────────────
export const G      = "#00915A";   // Professional emerald (readable on white)
export const GOLD   = "#B87800";   // Warm gold (readable on white)
export const BLUE   = "#1E5EE8";   // Royal blue
export const PURPLE = "#6426C8";   // Violet

// ── Backgrounds (Light Theme) ────────────────────────────────────────────────
export const NAVY   = "#FFFFFF";   // Primary white background
export const NAVY2  = "#F4F7FD";   // Alternate section background (light blue-gray)
export const NAVY3  = "#EBF0F8";   // Slightly deeper light (input bg, chips)

// ── Dark Sections (Footer, Announcement, Contrast) ───────────────────────────
export const DARK   = "#0B1A2E";   // Deep navy (footer, hero bg for dark contrast)
export const DARK2  = "#132035";   // Slightly lighter dark

// ── Typography ───────────────────────────────────────────────────────────────
export const TEXT1  = "#0B1A2E";   // Primary text (deep navy)
export const TEXT2  = "#536280";   // Secondary text (slate blue-gray)
export const TEXT3  = "#8BA2BA";   // Muted text

// ── Font Families ────────────────────────────────────────────────────────────
export const FONT_SERIF = "'Playfair Display', serif";
export const FONT_SANS  = "'Inter', sans-serif";
export const FONT_NUM   = "'Inter', sans-serif";       // Lining figures for financial numbers (no old-style descenders)
export const FONT_MONO  = "'JetBrains Mono', 'Fira Code', monospace";

// ── Surface & Card Tokens ─────────────────────────────────────────────────────
export const SURFACE       = "#FFFFFF";
export const SURFACE2      = "#F4F7FD";
export const SURF_BORDER   = "rgba(11,26,46,0.09)";
export const SURF_BORDER_MED = "rgba(11,26,46,0.16)";
export const CARD_SHADOW   = "0 2px 16px rgba(11,26,46,0.07), 0 1px 4px rgba(11,26,46,0.04)";
export const CARD_SHADOW_LG = "0 8px 40px rgba(11,26,46,0.11), 0 2px 8px rgba(11,26,46,0.06)";
export const CARD_SHADOW_XL = "0 24px 80px rgba(11,26,46,0.14), 0 6px 20px rgba(11,26,46,0.07)";

// ── Legacy aliases (kept for backward compat with pages) ─────────────────────
export const BORDER_SUBTLE = SURF_BORDER;
export const BORDER_MED    = SURF_BORDER_MED;

// ── Green CTA Gradient ────────────────────────────────────────────────────────
export const GREEN_GRAD = "linear-gradient(135deg, #007A4D 0%, #009960 50%, #00B870 100%)";

// ── Utility ──────────────────────────────────────────────────────────────────
export function alpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// ── Navigation Data ──────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Services",    href: "/services",         hasDropdown: true  },
  { label: "About",       href: "/about",            hasDropdown: true  },
  { label: "Calculators", href: "/calculators",      hasDropdown: false },
  { label: "Insights",    href: "/insights",         hasDropdown: false },
  { label: "Partners",    href: "/lending-partners", hasDropdown: false },
];

export const SERVICES_NAV = [
  { label: "Investment Banking",      href: "/services/investment-banking",    color: G      },
  { label: "Wealth & Risk Advisory",  href: "/services/wealth-advisory",       color: BLUE   },
  { label: "Land & Real Estate",      href: "/services/real-estate-advisory",  color: GOLD   },
  { label: "Retail Banking & Credit", href: "/services/retail-banking",        color: PURPLE },
  { label: "Fund Raising",            href: "/services/fund-raising",          color: G      },
  { label: "Debt Syndication",        href: "/services/debt-syndication",      color: BLUE   },
  { label: "M&A Advisory",            href: "/services/ma-advisory",           color: GOLD   },
  { label: "Project Finance",         href: "/services/project-finance",       color: PURPLE },
  { label: "Structured Finance",      href: "/services/structured-finance",    color: G      },
  { label: "NBFC / AIF Launch",       href: "/services/nbfc-aif-launch",       color: BLUE   },
  { label: "MSME / SME Solutions",    href: "/services/msme-solutions",        color: GOLD   },
  { label: "Personal Loan",           href: "/services/personal-loan",         color: PURPLE },
  { label: "Business Loan",           href: "/services/business-loan",         color: G      },
  { label: "Home Loan",               href: "/services/home-loan",             color: BLUE   },
  { label: "Loan Against Property",   href: "/services/loan-against-property", color: GOLD   },
  { label: "Working Capital Loan",    href: "/services/working-capital-loan",  color: PURPLE },
];

export const ABOUT_NAV = [
  { label: "About OMNI Fincon", href: "/about"        },
  { label: "Our USP",           href: "/our-usp"      },
  { label: "Our Team",          href: "/team"         },
  { label: "Work Culture",      href: "/work-culture" },
  { label: "Careers",           href: "/careers"      },
];

export const OFFICES = [
  { city: "Hyderabad", address: "Building Number 9, Mindspace, HITEC City, Hyderabad, Telangana 500081", phone: "+91 95000 63064" },
  { city: "Mumbai",    address: "508, Upper Ground Floor, World Trade Center, Ring Road, Surat",          phone: "+91 95000 63064" },
  { city: "Vadodara",  address: "606, KP Platina, Opp. Vanijya Bhavan, Race Course Circle, Vadodara",    phone: "+91 95000 63064" },
  { city: "Ahmedabad", address: "301, Shaival Imperia, Opp. Nalanda Hotel, Mithakhali Six Roads, Ahmedabad", phone: "+91 95000 63064" },
];

export const PARTNERS = [
  "Aditya Birla Capital", "Bajaj Finance", "Bank of Baroda",
  "HDFC Bank", "ICICI Bank", "IIFL Finance", "Kotak Mahindra Bank",
  "Piramal Finance", "State Bank of India", "Tata Capital",
  "Axis Bank", "Yes Bank", "IndusInd Bank", "Federal Bank",
];
