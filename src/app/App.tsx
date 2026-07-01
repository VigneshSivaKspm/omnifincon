import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";

// Admin (no public layout) — lazy loaded
const AdminApp = lazy(() => import("./pages/admin/AdminApp"));

// Core pages — lazy loaded for code splitting
const Home            = lazy(() => import("./pages/Home"));
const About           = lazy(() => import("./pages/About"));
const Team            = lazy(() => import("./pages/Team"));
const USP             = lazy(() => import("./pages/USP"));
const WorkCulture     = lazy(() => import("./pages/WorkCulture"));
const Careers         = lazy(() => import("./pages/Careers"));
const Contact         = lazy(() => import("./pages/Contact"));
const LendingPartners = lazy(() => import("./pages/LendingPartners"));
const Insights        = lazy(() => import("./pages/Insights"));
const FAQs            = lazy(() => import("./pages/FAQs"));
const Calculators     = lazy(() => import("./pages/Calculators"));
const NotFound        = lazy(() => import("./pages/NotFound"));

// Blog pages
const BlogList = lazy(() => import("./pages/blog/BlogList"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

// Service pages
const ServicesHub   = lazy(() => import("./pages/services/ServicesHub"));
const ServiceDetail = lazy(() => import("./pages/services/ServiceDetail"));

// Legal pages
const PrivacyPolicy      = lazy(() => import("./pages/legal/PrivacyPolicy"));
const Disclaimer         = lazy(() => import("./pages/legal/Disclaimer"));
const GrievanceRedressal = lazy(() => import("./pages/legal/GrievanceRedressal"));
const ConsentWithdrawal  = lazy(() => import("./pages/legal/ConsentWithdrawal"));

function PageLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "3px solid #00915A20",
        borderTopColor: "#00915A",
        animation: "spin 0.75s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ── Admin panel — no public Navbar/Footer ── */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<PageLoader />}>
            <AdminApp />
          </Suspense>
        }
      />

      {/* ── All public routes — wrapped in Navbar + Footer layout ── */}
      <Route
        path="*"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Core ── */}
                <Route path="/"                 element={<Home />} />
                <Route path="/about"            element={<About />} />
                <Route path="/team"             element={<Team />} />
                <Route path="/our-usp"          element={<USP />} />
                <Route path="/work-culture"     element={<WorkCulture />} />
                <Route path="/careers"          element={<Careers />} />
                <Route path="/contact"          element={<Contact />} />
                <Route path="/lending-partners" element={<LendingPartners />} />
                <Route path="/insights"         element={<Insights />} />
                <Route path="/faqs"             element={<FAQs />} />
                <Route path="/calculators"      element={<Calculators />} />

                {/* ── Blog ── */}
                <Route path="/blog"             element={<BlogList />} />
                <Route path="/blog/:slug"       element={<BlogPost />} />

                {/* ── Services ── */}
                <Route path="/services"         element={<ServicesHub />} />
                <Route path="/services/:slug"   element={<ServiceDetail />} />

                {/* ── Legal ── */}
                <Route path="/privacy-policy"       element={<PrivacyPolicy />} />
                <Route path="/disclaimer"           element={<Disclaimer />} />
                <Route path="/grievance-redressal"  element={<GrievanceRedressal />} />
                <Route path="/consent-withdrawal"   element={<ConsentWithdrawal />} />

                {/* ── 404 ── */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        }
      />
    </Routes>
  );
}
