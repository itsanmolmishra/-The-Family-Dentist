import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingButtons } from "./components/FloatingButtons";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { DoctorDetailPage } from "./pages/DoctorDetailPage";
import type { NavigateOptions } from "./types/navigation";

export type { NavigateOptions };

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [galleryHighlightSectionId, setGalleryHighlightSectionId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  const handleNavigate = (page: string, options?: NavigateOptions) => {
    if (page === "gallery") {
      setGalleryHighlightSectionId(options?.gallerySection ?? null);
    } else {
      setGalleryHighlightSectionId(null);
    }
    if (page === "doctor") {
      setDoctorId(options?.doctorId ?? null);
    } else {
      setDoctorId(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "appointment":
        return <AppointmentPage onNavigate={handleNavigate} />;
      case "testimonials":
        return <TestimonialsPage onNavigate={handleNavigate} />;
      case "gallery":
        return (
          <GalleryPage
            onNavigate={handleNavigate}
            highlightSectionId={galleryHighlightSectionId}
          />
        );
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />;
      case "doctor":
        return <DoctorDetailPage doctorId={doctorId} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <FloatingButtons />
    </div>
  );
}