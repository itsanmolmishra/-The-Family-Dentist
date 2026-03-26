import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Twitter, Linkedin, Heart } from "lucide-react";
import { fetchSettings, fetchServices } from "../api";
import { clinic } from "../data/clinicConfig";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [settings, setSettings] = useState<any>(null);
  const [dynamicServices, setDynamicServices] = useState<string[]>([]);
  useEffect(() => {
    fetchSettings().then(d => d && setSettings(d)).catch(() => {});
    fetchServices().then(d => {
      if (d.length) setDynamicServices(d.filter((s: any) => s.active !== false).slice(0, 6).map((s: any) => s.title));
    }).catch(() => {});
  }, []);

  const quickLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "appointment", label: "Appointment" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const services = [
    "Dental Implants",
    "Root Canal Treatment",
    "Cosmetic Dentistry",
    "Kids Dentistry",
    "Wisdom Tooth Removal",
    "Braces & Aligners / Invisalign",
  ];
  const displayServices = dynamicServices.length > 0 ? dynamicServices : services;

  return (
    <footer className="bg-gradient-to-br from-[#3d3d3d] via-[#2d2d2d] to-[#1d1d1d] text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 gradient-rose-gold rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-7 h-7 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6h2c0-2.21 1.79-4 4-4s4 1.79 4 4h2c0-3.31-2.69-6-6-6z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">{settings?.clinicName || clinic.name}</div>
                <div className="text-sm text-primary/90">{settings?.tagline || clinic.tagline}</div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              {settings?.footerText || `${clinic.usp} ${clinic.slogan}.`}
            </p>
            <div className="flex items-center space-x-3">
              <a href={settings?.socialLinks?.facebook || "#"} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.instagram || "#"} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.twitter || "#"} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.linkedin || "#"} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.whatsapp || "#"} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {displayServices.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate("services")}
                    className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-white/90 leading-relaxed">
                    {settings?.addressLine1 || clinic.addressLine1}<br />
                    {settings?.addressLine2 || clinic.addressLine2}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <a href={clinic.phone1Tel} className="text-primary hover:text-secondary transition-colors font-semibold block">
                    {settings?.phone1 || clinic.phone1}
                  </a>
                  <a href={clinic.phone2Tel} className="text-primary hover:text-secondary transition-colors font-semibold block">
                    {settings?.phone2 || clinic.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <a href={`mailto:${settings?.email || clinic.email}`} className="text-primary hover:text-secondary transition-colors">
                    {settings?.email || clinic.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-white/90 text-sm">
                  {settings?.timings || clinic.timings}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Strip */}
      <div className="border-t border-white/10 bg-black/20 relative z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-white/90 font-semibold">Dental Emergency?</div>
                <div className="text-white/70 text-sm">Call us 24/7</div>
              </div>
            </div>
            <a
              href={clinic.phone1Tel}
              className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors"
            >
              {settings?.phone1 || clinic.phone1}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <div className="flex items-center">
              <span>© 2026 {settings?.clinicName || clinic.name}. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" />
              <span>for healthy smiles</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
