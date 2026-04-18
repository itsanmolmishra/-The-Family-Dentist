import { Phone, Mail, Clock, Menu, X, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import logoImg from "../assets/Gemini_Generated_Image_bm3izcbm3izcbm3i.svg";
import { fetchSettings } from "../api";
import { clinic } from "../data/clinicConfig";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    fetchSettings().then(d => d && setSettings(d)).catch(() => {});
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "appointment", label: "Appointment" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#3d3d3d] via-[#2d2d2d] to-[#3d3d3d] text-white py-3 hidden lg:block">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <a href={clinic.phone1Tel} className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>{settings?.phone1 || clinic.phone1}</span>
              </a>
              <a href={`mailto:${settings?.email || clinic.email}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>{settings?.email || clinic.email}</span>
              </a>
              <div className="flex items-center space-x-2 text-white/80">
                <Clock className="w-4 h-4" />
                <span>{settings?.timings || clinic.timingsShort}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80 mr-2">Follow Us:</span>
              <a href={settings?.socialLinks?.facebook || "#"} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings?.socialLinks?.instagram || "#"} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings?.socialLinks?.whatsapp || "#"} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - patla (slim) */}
      {/* Solid white matches most logo mattes; avoids mismatch with translucent/blurred bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex min-h-0 items-center justify-between gap-4 h-24 sm:h-28">
            {/* Logo: fills nav row height; wide box so Gemini art + text read like reference */}
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="flex h-full min-h-0 max-h-full items-center justify-center shrink-0 bg-transparent border-0 p-0 m-0 shadow-none ring-0 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <span className="flex h-full min-h-0 w-[min(340px,82vw)] items-center justify-start sm:w-[min(440px,86vw)]">
                <img
                  src={logoImg}
                  alt="Dr. Garg's Implant & Maxillofacial"
                  className="block h-full w-full object-contain object-left bg-transparent"
                  decoding="async"
                />
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2.5 m-0 rounded-full text-base font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Button
                variant="outline"
                size="default"
                onClick={() => onNavigate("contact")}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-accent rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border shadow-xl">
            <nav className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? "gradient-rose-gold text-white shadow-lg"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
                  onClick={() => {
                    onNavigate("contact");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}