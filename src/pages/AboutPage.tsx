import { useState, useEffect } from "react";
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  Shield,
  Microscope,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  Star,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { doctors as doctorsData, resolveDoctorPageId } from "../data/doctorsData";
import { beforeAfterCategories } from "../data/beforeAfterData";
import type { NavigateOptions } from "../types/navigation";
import { clinic } from "../data/clinicConfig";
import { fetchDoctors, fetchSettings } from "../api";

interface AboutPageProps {
  onNavigate: (page: string, options?: NavigateOptions) => void;
}

const clinicAmbienceImageModules = import.meta.glob<string>(
  "../assets/clinic-gallery/*.{jpeg,jpg,png,webp}",
  { query: "?url", import: "default", eager: true }
);

const clinicAmbienceVideoModules = import.meta.glob<string>(
  "../assets/clinic-gallery/*.{mp4,webm,mov}",
  { query: "?url", import: "default", eager: true }
);

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [dynamicDoctors, setDynamicDoctors] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    fetchDoctors().then(d => d.length && setDynamicDoctors(d)).catch(() => {});
    fetchSettings().then(d => d && setSettings(d)).catch(() => {});
  }, []);

  const certifications = [
    {
      icon: Award,
      title: "ADA Accredited",
      description: "American Dental Association certified practice",
    },
    {
      icon: Shield,
      title: "Board Certified Dentists",
      description: "All our dentists are board-certified specialists",
    },
    {
      icon: Star,
      title: "Best Dental Clinic 2025",
      description: "Awarded by Healthcare Excellence Awards",
    },
    {
      icon: CheckCircle2,
      title: "ISO 9001 Certified",
      description: "International quality management standards",
    },
  ];

  const technologies = [
    {
      icon: Microscope,
      title: "Digital X-Rays",
      description: "90% less radiation with instant, high-resolution images",
    },
    {
      icon: Sparkles,
      title: "CEREC Same-Day Crowns",
      description: "Custom crowns designed and placed in a single visit",
    },
    {
      icon: Shield,
      title: "Laser Dentistry",
      description: "Painless, precise treatment with faster healing",
    },
    {
      icon: Microscope,
      title: "3D Imaging & Scanning",
      description: "Advanced 3D imaging for accurate treatment planning",
    },
    {
      icon: Sparkles,
      title: "Intraoral Cameras",
      description: "See what we see - clear visualization of your teeth",
    },
    {
      icon: Shield,
      title: "Advanced Sterilization",
      description: "Hospital-grade sterilization for complete safety",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Your comfort, safety, and satisfaction are our top priorities. We listen to your concerns and customize treatment to your needs.",
    },
    {
      icon: Award,
      title: "Clinical Excellence",
      description: "We maintain the highest standards of dental care through continuous education and the latest technologies.",
    },
    {
      icon: Users,
      title: "Family Approach",
      description: "We treat patients of all ages with the same compassion and care we'd give our own family members.",
    },
    {
      icon: Shield,
      title: "Ethical Practice",
      description: "We recommend only necessary treatments and provide honest, transparent pricing with no hidden fees.",
    },
  ];

  const seenClinicImageNames = new Set<string>();
  const clinicImages = Object.entries(clinicAmbienceImageModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce<string[]>((acc, [path, src]) => {
      const fileName = path.split("/").pop() ?? path;
      const normalizedName = fileName
        .toLowerCase()
        .replace(/\s-\scopy(?:\s\(\d+\))?(?=\.[a-z]+$)/, "")
        .replace(/\s\(\d+\)(?=\.[a-z]+$)/, "");

      if (!src || seenClinicImageNames.has(normalizedName)) return acc;
      seenClinicImageNames.add(normalizedName);
      acc.push(src);
      return acc;
    }, []);

  const seenClinicVideoNames = new Set<string>();
  const clinicVideos = Object.entries(clinicAmbienceVideoModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce<string[]>((acc, [path, src]) => {
      const fileName = path.split("/").pop() ?? path;
      const normalizedName = fileName
        .toLowerCase()
        .replace(/\s-\scopy(?:\s\(\d+\))?(?=\.[a-z]+$)/, "")
        .replace(/\s\(\d+\)(?=\.[a-z]+$)/, "");

      if (!src || seenClinicVideoNames.has(normalizedName)) return acc;
      seenClinicVideoNames.add(normalizedName);
      acc.push(src);
      return acc;
    }, []);

  const teamMembers = dynamicDoctors.length > 0
    ? dynamicDoctors.filter(d => d.active !== false).map(d => ({
        id: resolveDoctorPageId({ id: d.id, name: d.name, title: d.title }) ?? String(d.id ?? d._id ?? ""),
        name: d.title || d.name,
        specialty: d.specialty,
        qualification: d.qualificationLine2 ? `${d.qualification} • ${d.qualificationLine2}` : d.qualification,
        spl: d.spl,
        experience: d.experience,
        description: d.description,
        image: d.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      }))
    : doctorsData.map((d) => ({
        id: d.id,
        name: d.title,
        specialty: d.specialty,
        qualification: d.qualificationLine2 ? `${d.qualification} • ${d.qualificationLine2}` : d.qualification,
        spl: d.spl,
        experience: d.experience,
        description: d.description,
        image: d.image,
      }));

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#f5f3f1] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-8 shadow-premium border border-primary/10">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-tight">
              {clinic.name} – {clinic.tagline}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              At {clinic.name}, we're dedicated to providing exceptional dental care in a warm, welcoming environment. Our mission is to help every patient achieve optimal oral health and the confidence that comes with a beautiful smile.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8 text-foreground font-semibold">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {settings?.aboutStory ? (
                  Array.isArray(settings.aboutStory)
                    ? settings.aboutStory.map((p: string, i: number) => <p key={i}>{p}</p>)
                    : <p>{settings.aboutStory}</p>
                ) : (
                  <>
                    <p>
                      THE FAMILY DENTIST began with a simple vision: to create a dental practice where families feel truly cared for. Our senior practitioners, including Prof. Dr. Balram Garg (Oral &amp; Maxillofacial Surgeon &amp; Implantologist) and Dr. Radhika Garg (Conservative Dentist &amp; Endodontist), lead the clinic with a commitment to combining clinical excellence with genuine compassion.
                    </p>
                    <p>
                      Over the years, we have grown into a fully digital dental clinic, supported by an experienced team of specialists and dedicated staff. Prof. Dr. Balram brings over 18 years of experience, including roles at AIIMS, PGIMS, and Government Dental College, and an MS in Dentistry, along with a research fellowship in implantology from the University of Michigan, USA. Dr. Radhika has over 17 years of experience in aesthetic and modern dentistry, with expertise in single-sitting RCT and smile design.
                    </p>
                    <p>
                      Despite our growth, we have never lost sight of what matters most-building lasting relationships with our patients. Today, we're proudly one of the most equipped dental and maxillofacial centers in Noida and have served over 20,000 patients and counting. Our state-of-the-art facility combines the latest dental technology with a warm, family-friendly atmosphere. Whether you're bringing in your toddler for their first visit or seeking advanced cosmetic dentistry, we're here to provide exceptional care at every stage of life.
                    </p>
                    <p>
                      Please read what our patients have to say about their experience with us. Their reviews, shared in their own words, reflect the care, comfort, and trust they felt during their treatment at our clinic.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {clinicImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={`Clinic ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Ambience */}
      <section className="py-24 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center mb-14">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">Clinic Ambience</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our clinic is designed to provide a modern, relaxing, and patient-friendly environment. From the moment you walk in, you will notice our clean, well-organized, and welcoming space and staff. We focus on creating a calm atmosphere to help patients feel comfortable and stress-free during their dental visits.
            </p>
            <div className="mt-8 rounded-2xl border border-primary/15 bg-[#EAF5FC] px-6 py-5 md:px-8 md:py-6">
              <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                HERE ARE A FEW PHOTOGRAPHS OF OUR CLINIC AMBIENCE TO HELP YOU FEEL COMFORTABLE AND CONFIDENT ABOUT YOUR VISIT.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicImages.slice(0, 8).map((image, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`Clinic ambience ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {clinicVideos.length > 0 && (
            <div className="mt-14">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Clinic Video Tour</h3>
                <p className="text-muted-foreground text-lg">Watch our real treatment environment and patient-friendly setup</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
                {clinicVideos.slice(0, 2).map((videoSrc, index) => (
                  <Card
                    key={`${videoSrc}-${index}`}
                    className="self-start overflow-hidden rounded-3xl border border-primary/10 shadow-premium hover:shadow-premium-lg transition-all duration-300 bg-white"
                  >
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      controls
                      preload="auto"
                      playsInline
                      className="w-full aspect-video object-cover bg-black"
                      poster={clinicImages[index]}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="px-5 py-4 border-t border-primary/10 bg-gradient-to-r from-[#f8fcff] to-white">
                      <p className="text-sm font-medium text-primary">Clinic Ambience Video {index + 1}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Smile Transformations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center mb-14">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">Smile Transformations</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We perform every procedure with care, precision, and a patient-centric approach, ensuring the treatment plan aligns with each patient's needs and desired results.
            </p>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Please look at our own work attached below as we transformed a beautiful smile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {beforeAfterCategories.slice(0, 4).map((category) => {
              const beforeSrc = category.images[0];
              const afterSrc = category.images[1] ?? category.images[0];
              return (
                <Card
                  key={category.id}
                  className="group overflow-hidden rounded-3xl border border-primary/10 shadow-premium bg-white hover:shadow-premium-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={beforeSrc}
                        alt={`${category.title} before treatment`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={afterSrc}
                        alt={`${category.title} after treatment`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide shadow-md">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{category.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description ?? "Smile transformation completed with expert planning and precision."}
                    </p>
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Treatment Duration</span>
                      <span className="text-sm font-semibold text-primary">{category.duration ?? "Varies"}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-12 border border-primary/10 rounded-3xl shadow-premium hover:shadow-premium-lg transition-all duration-300 bg-white">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl mb-6 text-foreground font-semibold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {settings?.mission || "To provide compassionate, comprehensive dental care using the latest technology and techniques. We strive to create a comfortable environment where families feel valued, respected, and confident in their oral health journey. Every patient deserves personalized attention and treatment that exceeds expectations. We're committed to making quality dental care accessible, affordable, and anxiety-free for everyone in our community."}
              </p>
            </Card>
            
            <Card className="p-12 border border-primary/10 rounded-3xl shadow-premium hover:shadow-premium-lg transition-all duration-300 bg-white">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl mb-6 text-foreground font-semibold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {settings?.vision || "To be the most trusted dental practice in our community, known for clinical excellence, patient-centered care, and innovation. We envision a future where everyone has access to quality dental care and understands the importance of oral health in overall wellbeing. Through education, prevention, and advanced treatment options, we're building healthier communities, one smile at a time."}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do at {clinic.name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 border border-primary/10 rounded-3xl hover:shadow-premium-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 gradient-rose-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-4 text-foreground font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-white border-y border-primary/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Founders &amp; Lead Dental Experts</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6">Meet Our Doctors</h2>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Dr. Balram Garg and Dr. Radhika Garg</strong>, a dedicated husband and wife duo, are the proud owners and founders of the clinic. Together, they combine experience, compassion, and commitment to provide exceptional dental care.
            </p>
            <p>
              Together, they share one vision—to deliver ethical, comfortable, and patient-centered dental care in a warm and welcoming environment.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team — aligned with Home testimonials card styling */}
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
              Our experienced team of dental professionals is dedicated to your oral health and wellbeing.{" "}
              <span className="text-foreground/90 font-medium">Card par click karein — doctor ki poori profile page khulegi.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {teamMembers.map((doctor, index) => (
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
                    <p className="text-primary mb-1 font-medium text-lg">{doctor.specialty}</p>
                    {doctor.spl && (
                      <p className="text-sm text-muted-foreground mb-2">Spl: {doctor.spl}</p>
                    )}
                    <p className="text-sm text-muted-foreground mb-3">{doctor.qualification}</p>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Award className="w-5 h-5 mr-2 text-secondary" />
                      <span>{doctor.experience}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>
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
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Certifications & Awards
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recognized for excellence in dental care and patient satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-8 border border-primary/10 rounded-3xl hover:shadow-premium-lg transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <cert.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-foreground font-semibold">{cert.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene & Technology */}
      <section className="py-24 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Advanced Technology & Sterilization
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We invest in the latest dental technology to provide you with the best possible care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="p-8 border border-primary/10 rounded-3xl hover:shadow-premium-lg transition-all duration-300 bg-white group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <tech.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3 text-foreground font-semibold">{tech.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{tech.description}</p>
              </Card>
            ))}
          </div>

          {/* Hygiene Standards */}
          <Card className="p-12 border border-primary/10 shadow-premium rounded-3xl bg-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl mb-6 text-foreground font-semibold">
                  Our Commitment to Hygiene
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  Your safety is our top priority. We maintain the highest standards of cleanliness and sterilization, exceeding all regulatory requirements.
                </p>
                <ul className="space-y-4">
                  {[
                    "Hospital-grade sterilization for all instruments",
                    "Single-use items for maximum hygiene",
                    "Regular deep cleaning of all treatment areas",
                    "HEPA air filtration systems",
                    "Strict infection control protocols",
                    "Regular staff training on safety procedures",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-premium">
                <img
                  src={clinicImages[1]}
                  alt="Clean dental clinic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-white font-semibold">
            Experience the {clinic.name} Difference
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our family of happy patients. Schedule your appointment today and discover why families trust us with their smiles.
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
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-12 py-7 text-lg h-auto font-semibold"
              onClick={() => onNavigate("contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}