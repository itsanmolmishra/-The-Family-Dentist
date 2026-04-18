import { useState, useEffect } from "react";
import {
  Calendar,
  Award,
  Users,
  Activity,
  Star,
  Shield,
  Clock,
  Heart,
  Drill,
  Sparkles,
  Baby,
  Grid3x3,
  Scissors,
  Smile,
  Phone,
  MapPin,
  Syringe,
  XCircle,
  Stethoscope,
  Camera,
  Microscope,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { fetchSettings, fetchServices, fetchDoctors, fetchTestimonials } from "../api";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { TestimonialReviewCard } from "../components/TestimonialReviewCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { beforeAfterCategories } from "../data/beforeAfterData";
import { googleReviewTestimonials } from "../data/googleReviewTestimonials";
import { getDoctorsForHome, resolveDoctorPageId } from "../data/doctorsData";
import type { NavigateOptions } from "../types/navigation";
import { clinic } from "../data/clinicConfig";
import fullMouthCaseVideo from "../assets/full mouth case/WhatsApp Video 2026-02-04 at 11.48.26 AM.mp4";
import clinicTourVideoA from "../assets/WhatsApp Video 2026-04-18 at 5.57.27 PM.mp4";
import clinicTourVideoB from "../assets/WhatsApp Video 2026-04-18 at 5.57.28 PM.mp4";

interface HomePageProps {
  onNavigate: (page: string, options?: NavigateOptions) => void;
}

const homeClinicGalleryImageModules = import.meta.glob<string>(
  "../assets/clinic-gallery/*.{jpeg,jpg,png,webp}",
  { query: "?url", import: "default", eager: true }
);

export function HomePage({ onNavigate }: HomePageProps) {
  const placeholderImageMale = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const [dynamicDoctors, setDynamicDoctors] = useState<any[]>([]);
  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchServices().then(d => d.length && setDynamicServices(d)).catch(() => {});
    fetchDoctors().then(d => d.length && setDynamicDoctors(d)).catch(() => {});
    fetchTestimonials().then(d => d.length && setDynamicTestimonials(d)).catch(() => {});
    fetchSettings().then(d => d && setSettings(d)).catch(() => {});
  }, []);

  const services = [
    {
      icon: Stethoscope,
      title: "Single Sitting RCT",
      description: "Root canal treatment completed in one visit with gentle, pain-free care",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Sparkles,
      title: "Cosmetic Dentistry",
      description: "Zirconia Crown, Veneers/E-Max, Smile Design, Teeth Whitening",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Drill,
      title: "Implant Dentistry",
      description: "Immediate Implants & Full Mouth Implants for natural, lasting results",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Scissors,
      title: "Facial Trauma & Injuries",
      description: "Treatment of all types of facial trauma and maxillofacial injuries",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Baby,
      title: "Kids Dentistry",
      description: "Gentle, specialized dental care for children in a friendly environment",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: XCircle,
      title: "Wisdom Teeth Removal",
      description: "Safe wisdom teeth extraction with minimal discomfort and fast recovery",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Camera,
      title: "Digital Dentistry",
      description: "Intraoral camera, digital scanners, Invisalign/Aligners, Laser treatment",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Activity,
      title: "Braces / Invisalign",
      description: "Tooth-coloured braces or Invisalign for a straighter smile",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Grid3x3,
      title: "Zirconia Crown & Bridges",
      description: "Custom crowns and bridges for restored function and aesthetics",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Syringe,
      title: "Facial Aesthetics",
      description: "Revision of facial scars, Botox and facial aesthetic treatments",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
  ];

  const stats = [
    { icon: Award, value: "18+", label: "Years Experience" },
    { icon: Shield, value: "100%", label: "Certified Dentists" },
    { icon: Microscope, value: "Latest", label: "Modern Equipment" },
    { icon: Users, value: "20,000+", label: "Happy Smiles" },
  ];

  const doctors = getDoctorsForHome();

  const testimonials = [
    {
      name: "Jennifer Thompson",
      service: "Dental Implants",
      rating: 5,
      text: "Outstanding service! Dr. Balram Garg and his team made my dental implant procedure painless and stress-free. Highly recommend!",
      date: "2 weeks ago",
    },
    {
      name: "Robert Martinez",
      service: "Kids Dentistry",
      rating: 5,
      text: "My kids actually look forward to their dental appointments here! Dr. Radhika and the team are amazing with children.",
      date: "1 month ago",
    },
    {
      name: "Amanda Lee",
      service: "Family Dentistry",
      rating: 5,
      text: "Best dental clinic in the area. Professional, caring staff and state-of-the-art equipment. My whole family comes here!",
      date: "3 weeks ago",
    },
    {
      name: "Michael Johnson",
      service: "Root Canal",
      rating: 5,
      text: "I was nervous about my root canal, but Dr. Radhika made it painless in a single sitting. Results are incredible. Worth it!",
      date: "2 months ago",
    },
  ];



  const clinicImages = [
    "https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjkzNTk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758205307912-5896ff0c65ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwZXhhbWluaW5nJTIwcGF0aWVudHxlbnwxfHx8fDE3NjkzOTE3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1766338390573-ec092d69cdcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5NDQ0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1742522450616-a2cf0cba1274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMHNtaWxpbmd8ZW58MXx8fHwxNzY5MzY0MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758205307854-5f0b57c27f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3Njk0MTg0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1704455306925-1401c3012117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjaGFpciUyMGNsaW5pY3xlbnwxfHx8fDE3NjkzNzg3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1560181275-a65519fd0ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRlZXRoJTIwc21pbGV8ZW58MXx8fHwxNzY5MzQ2NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1619236233405-bb5d430f0620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZGVudGlzdCUyMGNoaWxkfGVufDF8fHx8MTc2OTQ0NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const seenClinicImageNames = new Set<string>();
  const seenClinicImageUrls = new Set<string>();
  const clinicGalleryImages = Object.entries(homeClinicGalleryImageModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce<string[]>((acc, [path, src]) => {
      // Vite glob keys may contain "/" on POSIX and "\" on Windows.
      const fileName = path.split(/[/\\]/).pop() ?? path;
      const normalizedName = fileName
        .toLowerCase()
        .replace(/\s*[-_]?\s*copy(?:\s*\(\d+\))?/g, "")
        .replace(/\s*\(\d+\)/g, "")
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!src || seenClinicImageUrls.has(src) || seenClinicImageNames.has(normalizedName)) return acc;
      seenClinicImageNames.add(normalizedName);
      seenClinicImageUrls.add(src);
      acc.push(src);
      return acc;
    }, []);

  // Home "Our Clinic" is a curated set of 6 images (ordered).
  // This avoids duplicates and "too similar" shots showing twice.
  const CLINIC_HOME_IMAGE_ALLOWLIST = [
    // Clinic ambience
    "WhatsApp Image 2026-03-23 at 7.37.00 PM.jpeg", // chair + stairs
    "WhatsApp Image 2026-03-23 at 7.36.51 PM.jpeg", // clinic equipment wide (given)
    "WhatsApp Image 2026-03-23 at 7.36.53 PM.jpeg", // clinic equipment vertical (real)
    "WhatsApp Image 2026-03-23 at 7.36.59 PM.jpeg", // reception
    "WhatsApp Image 2026-03-23 at 7.36.54 PM.jpeg", // exterior signage
    "WhatsApp Image 2026-03-23 at 7.37.01 PM (2).jpeg", // logo sign close-up (no people)
  ].map((n) => n.toLowerCase());

  const clinicGalleryByFileName = new Map<string, string>(
    Object.entries(homeClinicGalleryImageModules).map(([p, src]) => [
      (p.split(/[/\\]/).pop() ?? p).toLowerCase(),
      src,
    ])
  );

  const clinicHomeImages = CLINIC_HOME_IMAGE_ALLOWLIST
    .map((name) => clinicGalleryByFileName.get(name))
    .filter((src): src is string => Boolean(src))
    .slice(0, 6);

  const displayServices = dynamicServices.length > 0
    ? dynamicServices.filter(s => s.active !== false).map(s => ({
        icon: Stethoscope,
        title: s.title,
        description: s.shortDesc,
        color: "from-[#0E6BA8] to-[#0A4F7A]",
      }))
    : services;

  const displayDoctors = dynamicDoctors.length > 0
    ? dynamicDoctors.filter(d => d.active !== false).map(d => ({
        id: resolveDoctorPageId({ id: d.id, name: d.name, title: d.title }) ?? String(d.id ?? d._id ?? ""),
        name: d.title || d.name,
        specialty: d.specialty,
        experience: d.experience,
        image: d.image || placeholderImageMale,
      }))
    : getDoctorsForHome();

  const displayTestimonials = dynamicTestimonials.length > 0
    ? dynamicTestimonials.filter(t => t.active !== false).map((t: Record<string, unknown>) => {
        const rawDate = t.date;
        let dateLabel = "";
        if (rawDate != null && rawDate !== "") {
          const s = String(rawDate);
          if (/ago|mins?|hours?|days?|weeks?|months?|years?/i.test(s)) dateLabel = s;
          else {
            const parsed = new Date(s);
            dateLabel = Number.isNaN(parsed.getTime()) ? s : parsed.toLocaleDateString();
          }
        }
        return {
          name: String(t.name ?? ""),
          service: typeof t.service === "string" ? t.service : "Dental Care",
          rating: typeof t.rating === "number" ? t.rating : 5,
          text: String(t.text ?? ""),
          date: dateLabel,
        };
      })
    : testimonials;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#f5f3f1] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white px-5 py-2.5 rounded-full mb-8 shadow-sm border border-primary/10">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-primary font-medium">{settings?.experience || clinic.experience}</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-[1.1] tracking-tight">
                {settings?.clinicName || clinic.name}
                <span className="gradient-text block mt-2">{settings?.slogan || clinic.slogan}</span>
              </h1>
              
              {/* Subtext */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Advanced, gentle & affordable dental care for all ages
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gradient-rose-gold text-white shadow-md hover:shadow-lg"
                  onClick={() => onNavigate("appointment")}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("contact")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative lg:ml-auto">
              <div className="relative rounded-[2rem] overflow-hidden shadow-premium-lg">
                <img
                  src={clinicImages[0]}
                  alt="Modern dental clinic"
                  className="w-full h-[500px] lg:h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-premium-lg border border-primary/10 max-w-[300px] backdrop-blur-sm">
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-20 gradient-rose-gold rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text">20,000+</div>
                    <div className="text-sm text-muted-foreground">Happy Patients</div>
                  </div>
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="absolute top-10 -right-6 bg-secondary text-white px-8 py-4 rounded-full shadow-premium font-semibold text-lg">
                ⭐ {settings?.experience || clinic.experience}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-base text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services - 12 Service Cards */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">
              Comprehensive Dental Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From routine check-ups to advanced procedures, we offer complete dental care for your entire family
            </p>
          </div>

          {/* Service Cards Grid - 12 Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((service, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-primary/10 bg-gradient-to-br from-white to-accent rounded-3xl relative overflow-hidden"
                onClick={() => onNavigate("services")}
              >
                {/* Decorative blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl mb-3 text-foreground font-semibold leading-snug">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                    {service.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="text-primary text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-10 py-6 text-base"
              onClick={() => onNavigate("services")}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your smile deserves the best care. Here's why families trust us with their dental health
            </p>
          </div>
          
          <div className="mb-12 flex justify-center">
            <div className="max-w-4xl rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-5 text-center shadow-premium animate-fade-in-scale">
              <p className="text-lg md:text-xl font-extrabold tracking-wide text-primary leading-relaxed uppercase">
                {clinic.usp}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Award, title: clinic.experience, description: "Trusted dental care and excellence" },
              { icon: Shield, title: clinic.whyChooseUs[0], description: "We maintain the highest standards in every procedure" },
              { icon: Microscope, title: clinic.whyChooseUs[1], description: "Latest technology for precise, comfortable treatment" },
              { icon: Clock, title: clinic.whyChooseUs[2], description: "We listen and explain so you feel informed and at ease" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-premium-lg group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-foreground font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Results - card layout with horizontal Before/After images */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16 opacity-0 animate-fade-in-scale" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E6BA8] mb-4">
              Before & After Results
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from our patients. See the amazing transformations we&apos;ve achieved.
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => onNavigate("gallery")}
              >
                View Full Gallery
              </Button>
            </div>
          </div>

          {beforeAfterCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {beforeAfterCategories.map((category, index) => {
                const beforeSrc = category.images[0];
                const afterSrc = category.images[1] ?? category.images[0];
                const isAestheticSingleImage =
                  category.id === "aesthethic" && beforeSrc === afterSrc;
                return (
                  <Card
                    key={category.id}
                    className="group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm opacity-0 animate-fade-in-scale transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    {isAestheticSingleImage ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ImageWithFallback
                          src={beforeSrc}
                          alt={`${category.title} - Treatment Result`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Two images side by side with badges */}
                        <div className="grid grid-cols-2 gap-0">
                          <div className="relative aspect-square overflow-hidden">
                            <ImageWithFallback
                              src={beforeSrc}
                              alt={`${category.title} - Before`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                              Before
                            </span>
                          </div>
                          <div className="relative aspect-square overflow-hidden">
                            <ImageWithFallback
                              src={afterSrc}
                              alt={`${category.title} - After`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                              After
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0E6BA8] mb-2">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description ?? "Treatment results from our clinic."}
                      </p>
                      <div className="border-t border-border pt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Treatment Duration</span>
                        <span className="text-sm font-semibold text-primary">
                          {category.duration ?? "Varies"}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No before & after images available yet.</p>
          )}

          {/* Full Mouth Case - Video (autoplay + animation) */}
          <div
            className="mt-24 max-w-4xl mx-auto opacity-0 animate-scale-in px-4"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <div className="text-center mb-16 pt-4 pb-6 px-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E6BA8] mb-5 leading-tight break-words">
                Full Mouth Case – See the Transformation
              </h3>
              <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                Watch one of our full mouth rehabilitation results
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-premium-lg border-2 border-primary/20 bg-black/5 transition-all duration-300 hover:shadow-xl hover:border-primary/30">
              <video
                src={fullMouthCaseVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video object-contain"
                poster={beforeAfterCategories.find((c) => c.id === "full mouth case")?.images[0]}
              >
                Your browser does not support the video tag.
              </video>
              <div className="px-6 py-4 bg-white/80 border-t border-primary/10 text-center">
                <span className="text-sm font-medium text-primary">Full Mouth Case Result • Playing automatically</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Doctors — same section + card language as "What Our Patients Say" (testimonials) */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Team</span>
            </div>
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">
              Meet Our Dentists
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced team of dental professionals is dedicated to your oral health.{" "}
              <span className="text-foreground/90 font-medium">Kisi bhi doctor par click karein — unki full profile page khulegi.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {displayDoctors.map((doctor, index) => (
              <Card
                key={doctor.id || index}
                role={doctor.id ? "button" : undefined}
                tabIndex={doctor.id ? 0 : undefined}
                onClick={() => doctor.id && onNavigate("doctor", { doctorId: doctor.id })}
                onKeyDown={(e) => {
                  if (doctor.id && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onNavigate("doctor", { doctorId: doctor.id });
                  }
                }}
                aria-label={doctor.id ? `Open ${doctor.name} full profile page` : undefined}
                className={`group h-full flex flex-col gap-0 overflow-hidden rounded-3xl border border-primary/10 bg-white p-0 hover:shadow-premium transition-all duration-300 ${
                  doctor.id ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/25" : ""
                }`}
              >
                <div className="aspect-[3/4] w-full shrink-0 overflow-hidden relative">
                  <img
                    src={doctor.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {doctor.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pt-16 pb-3 px-4 pointer-events-none flex items-end justify-between gap-2">
                      <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">
                        Opens full profile
                      </span>
                      <ChevronRight className="w-5 h-5 text-white shrink-0 drop-shadow-md opacity-95" aria-hidden />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between min-h-0 p-8 bg-white">
                  <div>
                    <h3 className="text-2xl mb-2 text-foreground font-semibold">{doctor.name}</h3>
                    <p className="text-primary mb-2 font-medium text-lg">{doctor.specialty}</p>
                    <div className="flex items-center text-muted-foreground">
                      <Award className="w-5 h-5 mr-2 text-secondary" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>
                  {doctor.id && (
                    <div className="pt-6 mt-6 border-t border-border flex items-center justify-between gap-2 text-primary">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <UserCircle className="w-4 h-4 shrink-0" aria-hidden />
                        View full profile
                      </span>
                      <ChevronRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-10 py-6"
              onClick={() => onNavigate("about")}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      

      {/* Patient Testimonials */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#dee8ef" }}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Real Google Reviews
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              {googleReviewTestimonials.map((testimonial, index) => (
              <TestimonialReviewCard
                key={`${testimonial.name}-${index}`}
                name={testimonial.name}
                text={testimonial.text}
                rating={testimonial.rating}
                service={testimonial.service}
                date={testimonial.date}
                visualVariant="google"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">Our Clinic</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a look at our real clinic ambience and patient-friendly treatment setup
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(clinicHomeImages.length > 0 ? clinicHomeImages : (clinicGalleryImages.length > 0 ? clinicGalleryImages : clinicImages))
              .slice(0, 6)
              .map((image, index) => (
              <div 
                key={image} 
                className="group rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              >
                <img
                  src={image}
                  alt={`Clinic ${index + 1}`}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Clinic Video Tour</h3>
              <p className="text-muted-foreground text-lg">A quick look at our real clinic environment</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[clinicTourVideoA, clinicTourVideoB].map((src, index) => {
                const poster =
                  (clinicHomeImages.length > index ? clinicHomeImages[index] : undefined) ??
                  (clinicGalleryImages.length > index ? clinicGalleryImages[index] : undefined);
                return (
                  <Card
                    key={src}
                    className="overflow-hidden rounded-3xl border border-primary/10 shadow-premium hover:shadow-premium-lg transition-all duration-300 bg-white"
                  >
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      controls
                      preload="metadata"
                      playsInline
                      poster={poster}
                      className="w-full aspect-video object-cover bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="px-5 py-4 border-t border-primary/10 bg-gradient-to-r from-[#f8fcff] to-white">
                      <p className="text-sm font-medium text-primary">Clinic tour {index + 1}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-20 bg-gradient-to-br from-[#3d3d3d] via-[#2d2d2d] to-[#1d1d1d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-white/70 leading-relaxed">
                  {settings?.addressLine1 || clinic.addressLine1}<br />
                  {settings?.addressLine2 || clinic.addressLine2}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-primary text-xl font-semibold">{settings?.phone1 || clinic.phone1}</p>
                <p className="text-white/70 text-sm">{settings?.phone2 || clinic.phone2}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                <p className="text-white/70">{settings?.timings || clinic.timings}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl mb-8 text-white">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-white/90 text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Book your appointment today and experience the difference of premium dental care
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-premium-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-7 text-lg h-auto font-semibold"
              onClick={() => onNavigate("appointment")}
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-foreground backdrop-blur-md rounded-full px-12 py-7 text-lg h-auto font-semibold transition-all duration-300 shadow-lg"
              onClick={() => onNavigate("contact")}
            >
              <MapPin className="w-6 h-6 mr-3" />
              Visit Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}