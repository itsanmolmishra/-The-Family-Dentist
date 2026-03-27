import { useState, useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Microscope,
  Quote,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { allBeforeAfterImages, beforeAfterCategories } from "../data/beforeAfterData";
import { doctors, resolveDoctorPageId } from "../data/doctorsData";
import type { NavigateOptions } from "../types/navigation";
import { clinic } from "../data/clinicConfig";
import { fetchGallery, fetchDoctors } from "../api";

interface GalleryPageProps {
  onNavigate: (page: string, options?: NavigateOptions) => void;
  highlightSectionId?: string | null;
}

type TreatmentSection = {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  details: string[];
  doctor: string;
  doctorNote: string;
  highlights?: string[];
  warning?: string;
};

/** When opened from Services → View Treatment Gallery, only these asset categories / API categories show */
const SECTION_TO_BEFORE_AFTER_CATEGORY_IDS: Record<string, string[]> = {
  "dental-implants": ["single implant", "two implant", "full mouth case"],
  "root-canal-treatment": ["surgical endodontics"],
  "cosmetic-dentistry": ["aesthethic", "bleaching"],
  "kids-dentistry": ["kids trauma"],
  "wisdom-tooth-removal": ["minor surgery"],
  "digital-dentistry": ["full mouth crown", "full mouth case"],
  "braces-and-aligners": ["aesthethic", "bleaching"],
  "facial-trauma-and-injuries": ["minor surgery", "kids trauma"],
};

function dynamicItemMatchesCategories(g: { category?: string; title?: string }, allowedIds: string[]): boolean {
  const cat = (g.category || "").toLowerCase().trim();
  const title = (g.title || "").toLowerCase();
  return allowedIds.some((id) => {
    const key = id.toLowerCase();
    return cat === key || cat.includes(key) || title.includes(key.replace(/\s+/g, " "));
  });
}

const treatmentSections: TreatmentSection[] = [
  {
    id: "dental-implants",
    title: "Dental Implants",
    subtitle: "Modern and permanent replacement for missing teeth",
    intro:
      "Dental implants are titanium posts placed in the jawbone to act as artificial roots. Once healed, a custom crown is attached to restore the natural look, feel, and chewing function of your tooth.",
    details: [
      "Fixed, stable, and long-lasting compared to removable dentures.",
      "Helps maintain jawbone health and preserves facial support.",
      "Advanced digital planning makes treatment safe and predictable.",
      "Used for single tooth, multiple teeth, or full mouth rehabilitation.",
      "Result is a confident smile that looks and feels natural.",
    ],
    highlights: [
      "Single implant placement",
      "Multiple implant rehabilitation",
      "Full mouth implant planning",
      "Digital guided treatment",
    ],
    doctor: "Dr. Balram Garg",
    doctorNote:
      "With 18+ years of clinical experience and research fellowship training in implantology, Dr. Balram Garg is known for ethical, precise, and patient-focused implant dentistry.",
  },
  {
    id: "root-canal-treatment",
    title: "Root Canal Treatment",
    subtitle: "Save your natural tooth, smile without pain",
    intro:
      "Root canal treatment removes infection from inside the tooth and protects it from further damage. Our focus is painless, comfortable, and durable care so you can return to normal life quickly.",
    details: [
      "Single-sitting RCT with modern anesthesia protocols.",
      "Digital X-rays for precise diagnosis and treatment planning.",
      "Strict sterilization and high-quality crown support for long-term strength.",
      "Indications include severe pain, swelling, deep cavity, tooth discoloration, and hot-cold sensitivity.",
      "Early treatment prevents tooth loss and protects natural teeth.",
    ],
    highlights: [
      "Painless single-sitting RCT",
      "Gentle and stress-free care",
      "Durable cap/crown support",
      "Strict sterilization protocol",
    ],
    warning: "Ignoring infection can lead to tooth loss. Early treatment helps save your natural tooth.",
    doctor: "Dr. Radhika Garg",
    doctorNote:
      "With 17+ years of clinical expertise, Dr. Radhika Garg is known for precise diagnosis, compassionate treatment, and a patient-first philosophy rooted in empathy.",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    subtitle: "Transform your smile and confidence",
    intro:
      "Dr. Balram Garg and Dr. Radhika Garg combine precision and artistry to create elegant, natural-looking smile transformations tailored to facial profile and personal style.",
    details: [
      "Personalized smile analysis and digital smile designing.",
      "Teeth whitening, veneers, smile makeovers, and tooth-colored fillings.",
      "Correction of spacing, uneven edges, and overall smile harmony.",
      "High-quality materials and advanced technology for aesthetic durability.",
      "Every smile plan is customized to face shape, personality, and expectations.",
    ],
    highlights: [
      "Smile designing",
      "Teeth whitening",
      "Veneers",
      "Smile makeovers",
    ],
    doctor: "Dr. Balram Garg and Dr. Radhika Garg",
    doctorNote:
      "Their combined approach blends technical excellence and artistic vision to deliver natural, elegant, and confidence-boosting smile results.",
  },
  {
    id: "kids-dentistry",
    title: "Kids Dentistry",
    subtitle: "Gentle care for little smiles",
    intro:
      "Children need patience and a friendly approach. At our clinic, every child visit is designed to be calm, fear-free, and positive.",
    details: [
      "Child-friendly communication and stress-free treatment environment.",
      "Regular checkups, preventive cleaning, fluoride, and cavity fillings.",
      "Painless pediatric RCT, trauma care, and emergency dental support.",
      "Habit correction appliances and space maintainers when needed.",
      "Focused parental guidance for healthy oral habits from early years.",
    ],
    highlights: [
      "Kids injuries management",
      "Preventive pediatric guidance",
      "Emergency child dental care",
      "Fear-free appointments",
    ],
    doctor: "Dr. Radhika Garg",
    doctorNote:
      "Dr. Radhika Garg ensures each child receives gentle, simple-to-understand care so first dental experiences remain positive and comfortable.",
  },
  {
    id: "wisdom-tooth-removal",
    title: "Wisdom Tooth Removal",
    subtitle: "Safe, precise, and comfortable surgical care",
    intro:
      "Wisdom tooth pain can affect eating, sleep, and overall comfort. We provide controlled and painless removal with proper planning and post-treatment guidance.",
    details: [
      "Indicated in severe pain, swelling, impaction, infection, or nearby tooth damage.",
      "Performed under proper anesthesia with strict sterilization protocols.",
      "Advanced diagnostics for safer surgical decisions.",
      "Fast-recovery instructions to reduce discomfort and complications.",
      "Procedure is designed to be quick, safe, and minimally stressful.",
    ],
    highlights: [
      "Expert surgical planning",
      "Comfort-focused extraction",
      "Post-treatment healing guidance",
      "Complication prevention",
    ],
    doctor: "Dr. Balram Garg",
    doctorNote:
      "An experienced maxillofacial surgeon, Dr. Balram Garg performs wisdom tooth removal with precision, comfort, and clear recovery guidance.",
  },
  {
    id: "digital-dentistry",
    title: "Digital Dentistry",
    subtitle: "Advanced, accurate, and more comfortable",
    intro:
      "Digital workflows make treatment more precise, predictable, and efficient. Patients can see and understand treatment plans better before procedures begin.",
    details: [
      "Intraoral scanning and digital X-rays for high-detail diagnostics.",
      "3D planning and computer-guided implant surgery.",
      "Cleaner, faster workflows with fewer appointments.",
      "No messy traditional impressions in many cases.",
      "Technology-backed treatment by experienced clinicians for long-lasting outcomes.",
    ],
    highlights: [
      "Intraoral scanners",
      "3D imaging and digital X-rays",
      "Computer-guided implant planning",
      "Digital smile planning",
    ],
    doctor: "Dr. Balram Garg and Dr. Radhika Garg",
    doctorNote:
      "Our digital approach combines clinical experience with modern systems to deliver predictable, comfortable, and aesthetic long-term results.",
  },
  {
    id: "braces-and-aligners",
    title: "Braces and Clear Aligners",
    subtitle: "Healthy alignment with modern orthodontics",
    intro:
      "We offer both traditional braces and clear aligners, including Invisalign-style plans, to correct crowding, spacing, and bite issues with comfort and precision.",
    details: [
      "Straighter smile and improved chewing function.",
      "Better oral hygiene access and gum health over time.",
      "Digital planning for predictable tooth movement.",
      "Removable aligner options for flexibility and comfort.",
      "Customized plans based on facial profile and dental goals.",
    ],
    highlights: [
      "Traditional braces",
      "Clear aligners / Invisalign-style plans",
      "Bite correction",
      "Long-term dental stability",
    ],
    doctor: "Orthodontic Team",
    doctorNote:
      "Orthodontic treatment plans are designed with digital precision so your smile aligns naturally with your facial profile and oral health needs.",
  },
  {
    id: "facial-trauma-and-injuries",
    title: "Facial Trauma and Injuries",
    subtitle: "Expert maxillofacial treatment with compassion",
    intro:
      "Facial trauma requires urgent and skilled care. We treat jaw fractures, dental trauma, soft tissue injuries, and oral pathology with a focus on both function and aesthetics.",
    details: [
      "Accurate diagnosis and immediate treatment planning.",
      "Management of facial and jaw fractures, dental injuries, and cyst-related concerns.",
      "Surgical precision with strong post-treatment follow-up.",
      "Goal-oriented care: faster recovery and long-term stability.",
      "Delivered by a highly experienced maxillofacial surgery team.",
    ],
    highlights: [
      "Facial and jaw fracture management",
      "Dental trauma treatment",
      "Soft tissue injury care",
      "Cyst treatment and surgery",
    ],
    doctor: "Prof. Dr. Balram Garg",
    doctorNote:
      "With 18+ years in maxillofacial surgery, Dr. Balram Garg combines surgical precision with compassionate care to restore function, aesthetics, and patient confidence.",
  },
];

export function GalleryPage({ onNavigate, highlightSectionId }: GalleryPageProps) {
  const [dynamicGallery, setDynamicGallery] = useState<any[]>([]);
  const [dynamicDoctors, setDynamicDoctors] = useState<any[]>([]);

  useEffect(() => {
    fetchGallery().then(d => d.length && setDynamicGallery(d)).catch(() => {});
    fetchDoctors().then(d => d.length && setDynamicDoctors(d)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!highlightSectionId) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById("gallery-before-after");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => window.clearTimeout(t);
  }, [highlightSectionId]);

  const displayGallery = dynamicGallery.length > 0
    ? dynamicGallery.filter(g => g.active !== false)
    : null;

  const categoryIdsForHighlightedSection = highlightSectionId
    ? SECTION_TO_BEFORE_AFTER_CATEGORY_IDS[highlightSectionId]
    : undefined;

  const isTreatmentFilterActive = Boolean(categoryIdsForHighlightedSection?.length);

  const filteredDynamicForSection =
    displayGallery && isTreatmentFilterActive && categoryIdsForHighlightedSection
      ? displayGallery.filter(
          (g) => g.active !== false && dynamicItemMatchesCategories(g, categoryIdsForHighlightedSection)
        )
      : [];

  const filteredStaticCategoriesForSection =
    isTreatmentFilterActive && categoryIdsForHighlightedSection
      ? beforeAfterCategories.filter((c) => categoryIdsForHighlightedSection.includes(c.id))
      : [];

  const highlightedTreatmentTitle = highlightSectionId
    ? treatmentSections.find((s) => s.id === highlightSectionId)?.title
    : null;

  const displayDoctors = dynamicDoctors.length > 0
    ? dynamicDoctors.filter(d => d.active !== false).map(d => ({
        id: resolveDoctorPageId({ id: d.id, name: d.name, title: d.title }) ?? String(d._id || d.id || ""),
        name: d.name || d.title,
        image: d.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        specialty: d.specialty || "",
        experience: d.experience || "",
        spl: d.spl || "",
      }))
    : doctors;

  const categoryImageMap = beforeAfterCategories.reduce<Record<string, string[]>>((acc, category) => {
    acc[category.id] = category.images;
    return acc;
  }, {});

  const getTreatmentImages = (sectionId: string): string[] => {
    const imagesBySection: Record<string, string[]> = {
      "dental-implants": [
        ...(categoryImageMap["single implant"] ?? []),
        ...(categoryImageMap["two implant"] ?? []),
        ...(categoryImageMap["full mouth case"] ?? []),
      ],
      "root-canal-treatment": [...(categoryImageMap["surgical endodontics"] ?? [])],
      "cosmetic-dentistry": [
        ...(categoryImageMap["aesthethic"] ?? []),
        ...(categoryImageMap["bleaching"] ?? []),
      ],
      "kids-dentistry": [...(categoryImageMap["kids trauma"] ?? [])],
      "wisdom-tooth-removal": [...(categoryImageMap["minor surgery"] ?? [])],
      "digital-dentistry": [
        ...(categoryImageMap["full mouth crown"] ?? []),
        ...(categoryImageMap["full mouth case"] ?? []),
      ],
      "braces-and-aligners": [
        ...(categoryImageMap["aesthethic"] ?? []),
        ...(categoryImageMap["bleaching"] ?? []),
      ],
      "facial-trauma-and-injuries": [
        ...(categoryImageMap["minor surgery"] ?? []),
        ...(categoryImageMap["kids trauma"] ?? []),
      ],
    };

    return (imagesBySection[sectionId] ?? allBeforeAfterImages).slice(0, 4);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#f7fbff] via-white to-[#eef7ff]">
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-8 shadow-premium border border-primary/10">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Gallery and Treatments</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-tight">
              Smile Transformations
              <span className="gradient-text block mt-3">Before and After Results</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {highlightedTreatmentTitle
                ? `Before and after results for ${highlightedTreatmentTitle} — real cases from our clinic.`
                : `Real clinical work, advanced techniques, and patient-centered care at ${clinic.name}.`}
            </p>
          </div>
        </div>
      </section>

      {/* Before and After - same layout as HomePage; filtered when opened from a service */}
      <section
        id="gallery-before-after"
        className="py-24 md:py-32 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 overflow-hidden scroll-mt-24"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E6BA8] mb-4">
              {highlightedTreatmentTitle ? `${highlightedTreatmentTitle} — Before & After` : "Before & After Results"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {isTreatmentFilterActive
                ? "Results shown only for the treatment you selected."
                : "Real results from our patients. See the amazing transformations we&apos;ve achieved."}
            </p>
          </div>

          {isTreatmentFilterActive && filteredDynamicForSection.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredDynamicForSection.map((g, index) => {
                const beforeSrc = g.beforeImage;
                const afterSrc = g.afterImage ?? g.beforeImage;
                return (
                  <Card
                    key={g._id ?? g.id ?? index}
                    className="group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={beforeSrc}
                          alt={`${g.title ?? "Case"} - Before`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={afterSrc}
                          alt={`${g.title ?? "Case"} - After`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0E6BA8] mb-2">
                        {g.title ?? "Treatment Result"}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {g.description ?? "Treatment results from our clinic."}
                      </p>
                      <div className="border-t border-border pt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Treatment Duration</span>
                        <span className="text-sm font-semibold text-primary">
                          {g.duration ?? "Varies"}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : isTreatmentFilterActive && filteredStaticCategoriesForSection.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredStaticCategoriesForSection.map((category) => {
                const beforeSrc = category.images[0];
                const afterSrc = category.images[1] ?? category.images[0];
                return (
                  <Card
                    key={category.id}
                    className="group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
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
          ) : isTreatmentFilterActive ? (
            <p className="text-center text-muted-foreground py-8">
              No before &amp; after images are available for this treatment yet. Please browse the full gallery from the menu.
            </p>
          ) : displayGallery && displayGallery.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {displayGallery.map((g, index) => {
                const beforeSrc = g.beforeImage;
                const afterSrc = g.afterImage ?? g.beforeImage;
                return (
                  <Card
                    key={g._id ?? g.id ?? index}
                    className="group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={beforeSrc}
                          alt={`${g.title ?? "Case"} - Before`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={afterSrc}
                          alt={`${g.title ?? "Case"} - After`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0E6BA8] mb-2">
                        {g.title ?? "Treatment Result"}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {g.description ?? "Treatment results from our clinic."}
                      </p>
                      <div className="border-t border-border pt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Treatment Duration</span>
                        <span className="text-sm font-semibold text-primary">
                          {g.duration ?? "Varies"}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : beforeAfterCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {beforeAfterCategories.map((category) => {
                const beforeSrc = category.images[0];
                const afterSrc = category.images[1] ?? category.images[0];
                return (
                  <Card
                    key={category.id}
                    className="group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
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
        </div>
      </section>

      {/* Treatment Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-14">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-6 shadow-sm border border-primary/10">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Detailed Treatment Information</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-foreground mb-4 font-semibold">Specialized Dental Care</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {highlightSectionId
                ? "Details and clinical photos for the treatment you selected."
                : "The following sections are organized from your provided content and refined for clear patient understanding."}
            </p>
          </div>

          <div className="space-y-10">
            {treatmentSections
              .filter((section) => !highlightSectionId || section.id === highlightSectionId)
              .map((section) => {
              const sectionImages = getTreatmentImages(section.id);

              return (
                <Card
                  key={section.id}
                  id={`gallery-treatment-${section.id}`}
                  className="rounded-3xl border border-primary/10 bg-white overflow-hidden shadow-sm hover:shadow-premium-lg transition-all duration-300 scroll-mt-28"
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-5 p-5 md:p-6 bg-gradient-to-br from-[#f9fcff] to-[#edf7ff] border-b lg:border-b-0 lg:border-r border-primary/10">
                      <div className="grid grid-cols-2 gap-3">
                        {sectionImages.map((imgSrc, imgIndex) => (
                          <div key={`${section.id}-${imgIndex}`} className="rounded-2xl overflow-hidden border border-primary/10 h-32 md:h-40">
                            <ImageWithFallback
                              src={imgSrc}
                              alt={`${section.title} clinical image ${imgIndex + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7 p-6 md:p-8">
                      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        <BadgeCheck className="w-4 h-4" />
                        <span>{section.title}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{section.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">{section.intro}</p>

                      {section.highlights && section.highlights.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Treatment Includes</p>
                          <div className="flex flex-wrap gap-2">
                            {section.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-accent text-foreground border border-primary/10"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <ul className="space-y-3 mb-6">
                        {section.details.map((point, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm md:text-base text-foreground/90 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {section.warning && (
                        <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                          {section.warning}
                        </div>
                      )}

                      <div className="rounded-2xl border border-primary/15 bg-gradient-to-r from-[#e9f7ff] to-[#f7fbff] px-4 py-4">
                        <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">Expert Guidance</p>
                        <p className="text-sm md:text-base text-foreground font-medium mb-1">{section.doctor}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{section.doctorNote}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Doctors — same section + card treatment as Home testimonials */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-accent via-background to-accent border-y border-primary/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Founders and Lead Experts</span>
            </div>
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">
              Meet Our Doctors
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dr. Balram Garg and Dr. Radhika Garg lead our clinic with ethics, compassion, and excellence in modern dentistry.{" "}
              <span className="text-foreground/90 font-medium">Neeche card par click karein — doctor ki detail page khulegi.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {displayDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                role="button"
                tabIndex={0}
                onClick={() => onNavigate("doctor", { doctorId: String(doctor.id) })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate("doctor", { doctorId: String(doctor.id) });
                  }
                }}
                aria-label={`Open ${doctor.name} full profile page`}
                className="group h-full flex flex-col gap-0 overflow-hidden rounded-3xl border border-primary/10 bg-white p-0 hover:shadow-premium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left hover:border-primary/25"
              >
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden relative">
                  <ImageWithFallback
                    src={doctor.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pt-12 pb-2.5 px-3 pointer-events-none flex items-end justify-between gap-2">
                    <span className="text-white text-xs font-semibold drop-shadow-md">Opens full profile</span>
                    <ChevronRight className="w-4 h-4 text-white shrink-0 opacity-95" aria-hidden />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between min-h-0 p-8 bg-white">
                  <div>
                    <h3
                      className="text-xl font-semibold text-foreground mb-1 min-h-14"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {doctor.name}
                    </h3>
                    <p
                      className="text-primary font-medium text-sm mb-2 min-h-10"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {doctor.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">{doctor.experience}</p>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {doctor.spl}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between gap-2 text-primary">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <UserCircle className="w-4 h-4 shrink-0" aria-hidden />
                      View full profile
                    </span>
                    <ChevronRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials and Ambience Copy */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-accent">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Quote className="w-5 h-5" />
                <h3 className="text-2xl font-semibold text-foreground">Patient Testimonials</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Our patients appreciate the gentle approach, clear communication, and comfortable experience they receive during every visit.
                Their positive outcomes and trust continue to inspire our team.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Please explore patient reviews to read real experiences in their own words reflecting care, comfort, and confidence.
              </p>
              <Button className="mt-6 gradient-rose-gold text-white" onClick={() => onNavigate("testimonials")}>Read Testimonials</Button>
            </Card>

            <Card className="p-8 rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-accent">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Microscope className="w-5 h-5" />
                <h3 className="text-2xl font-semibold text-foreground">Clinic Ambience</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Our clinic is modern, clean, and patient-friendly. From reception to treatment rooms, every detail is designed to make you feel safe, relaxed, and stress-free.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We maintain strict hygiene standards while creating a welcoming atmosphere for children and adults alike.
              </p>
              <Button variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-white" onClick={() => onNavigate("contact")}>
                Visit Our Clinic
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_40%)]"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-full mb-8 text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical, Comfortable, Patient-Centered Care</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white font-semibold mb-6">Ready for Your Smile Transformation?</h2>
          <p className="text-white/90 max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
            Book an appointment for personalized treatment planning with our experienced team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => onNavigate("appointment")}>
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => onNavigate("services")}>
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
