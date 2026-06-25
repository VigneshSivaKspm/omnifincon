import { useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlobalStyles } from "../shared/Atoms";
import { NAVY } from "../../../lib/tokens";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
