import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingButtons } from "../components/FloatingButtons";
import { SeoHead } from "../components/SeoHead";
import { Analytics } from "../components/Analytics";
import { SkipToContent } from "../components/SkipToContent";
import { ScrollToTop } from "../components/ScrollToTop";
import { pathToPageId, useAppNavigate } from "../hooks/useAppNavigate";

export function SiteLayout() {
  const location = useLocation();
  const onNavigate = useAppNavigate();
  const currentPage = pathToPageId(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <SeoHead />
      <Analytics />
      <SkipToContent />
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main id="main-content" role="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer onNavigate={onNavigate} />
      <FloatingButtons />
    </div>
  );
}
