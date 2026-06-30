import { Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";

// Admin (completely outside public layout)
import AdminApp from "./pages/admin/AdminApp";

// Core pages
import Home            from "./pages/Home";
import About           from "./pages/About";
import Team            from "./pages/Team";
import USP             from "./pages/USP";
import WorkCulture     from "./pages/WorkCulture";
import Careers         from "./pages/Careers";
import Contact         from "./pages/Contact";
import LendingPartners from "./pages/LendingPartners";
import Insights        from "./pages/Insights";
import FAQs            from "./pages/FAQs";
import Calculators     from "./pages/Calculators";
import NotFound        from "./pages/NotFound";

// Blog
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";

// Service pages
import ServicesHub   from "./pages/services/ServicesHub";
import ServiceDetail from "./pages/services/ServiceDetail";

// Legal pages
import PrivacyPolicy      from "./pages/legal/PrivacyPolicy";
import Disclaimer         from "./pages/legal/Disclaimer";
import GrievanceRedressal from "./pages/legal/GrievanceRedressal";
import ConsentWithdrawal  from "./pages/legal/ConsentWithdrawal";

export default function App() {
  return (
    <Routes>
      {/* ── Admin panel — no public Navbar/Footer ── */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* ── All public routes — wrapped in Navbar + Footer layout ── */}
      <Route
        path="*"
        element={
          <Layout>
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
          </Layout>
        }
      />
    </Routes>
  );
}
