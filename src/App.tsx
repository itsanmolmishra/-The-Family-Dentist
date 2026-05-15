import { BrowserRouter, Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { DoctorDetailPage } from "./pages/DoctorDetailPage";
import { useAppNavigate } from "./hooks/useAppNavigate";

export type { NavigateOptions } from "./types/navigation";

function HomeRoute() {
  const onNavigate = useAppNavigate();
  return <HomePage onNavigate={onNavigate} />;
}

function AboutRoute() {
  const onNavigate = useAppNavigate();
  return <AboutPage onNavigate={onNavigate} />;
}

function ServicesRoute() {
  const onNavigate = useAppNavigate();
  return <ServicesPage onNavigate={onNavigate} />;
}

function GalleryRoute() {
  const onNavigate = useAppNavigate();
  const [searchParams] = useSearchParams();
  return (
    <GalleryPage
      onNavigate={onNavigate}
      highlightSectionId={searchParams.get("section")}
    />
  );
}

function AppointmentRoute() {
  const onNavigate = useAppNavigate();
  return <AppointmentPage onNavigate={onNavigate} />;
}

function TestimonialsRoute() {
  const onNavigate = useAppNavigate();
  return <TestimonialsPage onNavigate={onNavigate} />;
}

function ContactRoute() {
  const onNavigate = useAppNavigate();
  return <ContactPage onNavigate={onNavigate} />;
}

function DoctorRoute() {
  const onNavigate = useAppNavigate();
  const { doctorId } = useParams<{ doctorId: string }>();
  return <DoctorDetailPage doctorId={doctorId ?? null} onNavigate={onNavigate} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path="about" element={<AboutRoute />} />
          <Route path="services" element={<ServicesRoute />} />
          <Route path="gallery" element={<GalleryRoute />} />
          <Route path="appointment" element={<AppointmentRoute />} />
          <Route path="testimonials" element={<TestimonialsRoute />} />
          <Route path="contact" element={<ContactRoute />} />
          <Route path="doctor/:doctorId" element={<DoctorRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
