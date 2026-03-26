import {
  Drill,
  Stethoscope,
  Sparkles,
  Smile,
  Baby,
  Scissors,
  Syringe,
  Activity,
  Camera,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Calendar,
  ArrowRight,
  Heart,
  Star,
  ListChecks,
  AlertCircle,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { fetchServices } from "../api";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  useEffect(() => {
    fetchServices().then(d => d.length && setDynamicServices(d)).catch(() => {});
  }, []);

  const services = [
    {
      icon: Drill,
      title: "Dental Implants",
      tagline: "Modern and permanent replacement for missing teeth",
      fullDesc:
        "Dental implants are titanium posts placed in the jawbone to act as artificial roots. Once healed, a custom crown is placed to restore your tooth's natural look, feel, and chewing function.",
      treatmentOptions: [
        "Single tooth implant placement",
        "Full mouth or Multiple implant rehabilitation",
        "Immediate implant placement",
        "Flapless or without incision implant placement",
        "Guided or Digital implant placement",
      ],
      reasonsTitle: "Why Choose an Implant",
      reasons: [
        "Fixed, stable, and long-lasting compared to removable dentures",
        "Helps maintain jawbone health and preserves facial support",
        "Advanced digital planning makes treatment safe and predictable",
        "Used for single tooth, multiple teeth, or full mouth rehabilitation",
        "Result is a confident smile that looks and feels natural",
      ],
      whyChooseUs: [
        "Painless immediate implant placement",
        "Advanced and world-class implant systems available from the USA, Korea, etc.",
        "Huge experience in the field by Dr. Balram for predictable results and long-lasting smiles",
        "Strict sterilization and disinfection protocol",
        "Pre- or post-implant placement guidance or follow-up from Dr. Balram",
      ],
      philosophy:
        "We believe implant dentistry is not just about replacing your natural teeth — it is about giving back the same cosmetic and functional appearance so that patients feel confident in their day to day life.",
      expertName: "Dr. Balram Garg",
      expertDesc:
        "With 18+ years of clinical experience and research fellowship training in the USA in implant dentistry, Dr. Balram Garg is known for ethical, precise, and patient-focused implant dentistry.",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Stethoscope,
      title: "Root Canal Treatment",
      tagline: "Save Your Natural Tooth. Smile Without Pain",
      fullDesc:
        "Root canal treatment removes infection from inside the tooth and protects it from further damage. Our focus is painless, comfortable, and durable care so you can return to normal life quickly and smile confidently again.",
      treatmentOptions: [
        "Painless single-sitting RCT",
        "Full mouth rehabilitation with multiple RCTs",
      ],
      reasonsTitle: "Why Do You Need RCT",
      reasons: [
        "Severe tooth pain",
        "Sensitivity to hot and cold",
        "Swelling in gums",
        "Deep cavity",
        "Tooth discoloration",
      ],
      reasonsNote:
        "Ignoring infection can lead to tooth loss. Early treatment helps save your natural tooth.",
      whyChooseUsIntro:
        "We understand that many patients fear root canal treatment. That's why we provide a stress-free, painless experience with modern techniques and compassionate care.",
      whyChooseUs: [
        "Painless single-sitting RCT with modern anesthesia protocols",
        "Advanced digital X-ray technology for precise diagnosis and treatment planning",
        "Experienced hands from Dr. Radhika with gentle care",
        "Strict sterilization protocol and high-quality cap/crown for long-term strength",
      ],
      philosophy:
        "Her philosophy is simple — Always place yourself in the patient's position. When you understand how a patient feels, you automatically deliver care with more empathy, patience, and comfort. She ensures that every treatment is explained clearly, performed gently, and carried out with honesty and compassion.",
      expertName: "Dr. Radhika Garg",
      expertDesc:
        "With 17+ years of clinical expertise, Dr. Radhika Garg is known for precise diagnosis, compassionate treatment, and a patient-first philosophy rooted in her empathic nature. For her, dentistry is not just about procedures — it is about trust, comfort, and genuine care.",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Sparkles,
      title: "Cosmetic Dentistry",
      tagline: "Transform Your Smile. Transform Your Confidence",
      fullDesc:
        "Dr. Balram Garg and Dr. Radhika Garg combine precision and artistry to create elegant, natural-looking smile transformations that are tailored to facial profile and personal style.",
      treatmentOptions: [
        "Smile designing and makeovers",
        "Veneers",
        "Bleaching and teeth whitening",
        "Tooth-colored fillings",
        "Correction of gaps and uneven teeth",
      ],
      reasonsTitle: "Why Do You Need Cosmetic Dentistry",
      reasons: [
        "Discolored or stained teeth",
        "Chipped, broken, or worn-out teeth",
        "Gaps between teeth",
        "Misaligned or irregular teeth",
        "Uneven gum line or smile shape",
      ],
      whyChooseUs: [
        "Personalized smile analysis",
        "Digital smile designing",
        "Natural-looking results",
        "Advanced technology & high-quality materials",
        "Gentle and comfortable procedures",
      ],
      philosophy:
        "We believe cosmetic dentistry is not just about beauty — it is about confidence and self-expression. Every smile we design is customized according to your face shape, personality, and expectations. Your smile is the first thing people notice, so our goal is simple — to give you a smile that feels natural, looks beautiful, and makes you proud to show it.",
      expertName: "Dr. Balram Garg & Dr. Radhika Garg",
      expertDesc:
        "Their combined approach blends technical excellence and artistic vision to deliver natural, elegant, and confidence-boosting smile results that enhance your personality.",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Baby,
      title: "Kids Dentistry",
      tagline: "Gentle Dental Care for Little Smiles",
      fullDesc:
        "Children need special care, patience, and a friendly approach when it comes to dental treatment. At our clinic, we provide comfortable and child-friendly dental care in a warm and welcoming environment so that every child feels safe, relaxed, and happy during their dental visit.",
      treatmentOptions: [
        "Kids' injuries and emergency dental care",
        "Dental checkups & cleaning",
        "Fluoride application",
        "Cavity fillings",
        "Painless root canal for kids",
        "Space maintainers and habit breaking appliances",
      ],
      reasonsTitle: "Why Kids Need Dental Treatment",
      reasons: [
        "Special kids who are not able to maintain their oral hygiene",
        "Emergency dental trauma",
      ],
      whyChooseUs: [
        "Gentle and caring approach",
        "Fear-free & stress-free treatment",
        "Safe and hygienic environment",
        "Preventive dental guidance for parents",
        "Focus on building positive dental habits",
      ],
      philosophy:
        "We believe that a child's first dental experience shapes their future oral health. That's why we ensure treatments are explained in a simple way, performed gently, and completed with lots of patience and care.",
      expertName: "Dr. Radhika Garg & Dr. Karishma Gautam",
      expertDesc:
        "They ensure each child receives gentle, simple-to-understand care so first dental experiences remain positive and comfortable.",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Scissors,
      title: "Wisdom Tooth Removal",
      tagline: "Safe, precise, and comfortable surgical care",
      fullDesc:
        "Wisdom tooth pain can affect eating, sleep, and overall comfort. At our clinic, we provide controlled and painless removal with proper planning and post-treatment guidance by Dr. Balram Garg, an experienced expert in maxillofacial surgery. With advanced techniques and gentle care, we ensure a smooth procedure and faster recovery.",
      reasonsTitle: "Why Do You Need Wisdom Tooth Removal",
      reasons: [
        "Severe pain in the back of the mouth",
        "Swelling or infection in gums",
        "Food getting stuck around the wisdom tooth",
        "Difficulty opening mouth",
        "Impacted wisdom tooth",
        "Damage to nearby teeth",
      ],
      whyChooseUs: [
        "Expert surgical skills with 18+ years of experience",
        "Painless procedure with proper anesthesia",
        "Advanced diagnostic support",
        "Strict sterilization protocol",
        "Clear post-treatment guidance for quick healing",
      ],
      philosophy:
        "We understand that many patients are afraid of tooth extraction. That's why we focus on making the procedure comfortable, quick, and stress-free. Our goal is not just removal — it is relief from pain and prevention of future complications.",
      expertName: "Dr. Balram Garg",
      expertDesc:
        "An experienced maxillofacial surgeon, Dr. Balram Garg performs wisdom tooth removal with precision, comfort, and clear recovery guidance.",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Camera,
      title: "Digital Dentistry",
      tagline: "Advanced, Accurate & Comfortable Dental Care",
      fullDesc:
        "At our clinic, we combine experience with modern innovation through digital dentistry — making your dental treatments faster, more precise, and more comfortable than ever before. Led by Dr. Balram Garg with 18+ years of clinical excellence and advanced training from the University of Michigan, our digital approach ensures world-class standards for every patient.",
      treatmentOptions: [
        "3D Imaging & Digital X-rays",
        "Intraoral scanners",
        "Computer-guided implant planning surgery",
        "Digital smile designing",
      ],
      reasonsTitle: "Why Choose Digital Dentistry",
      reasons: [
        "Predictable outcomes — see your final smile before treatment",
        "More comfortable — no messy molds",
        "Highly accurate — perfect fit crowns & restorations",
        "Faster results — fewer appointments",
        "Minimally invasive & safer",
      ],
      whyChooseUs: [
        "Predictable outcomes — see your final smile before treatment",
        "More comfortable — no messy molds",
        "Highly accurate — perfect fit crowns & restorations",
        "Faster results — fewer appointments",
        "Minimally invasive & safer",
      ],
      philosophy:
        "Experience + Technology = Exceptional Care. We leverage the latest in digital dentistry to deliver precise, aesthetic, and long-lasting treatments with utmost patient comfort.",
      expertName: "Dr. Balram Garg & Dr. Radhika Garg",
      expertDesc:
        "With years of experience in surgical digital systems, Dr. Balram and Dr. Radhika Garg combine expertise with innovation to deliver precise, aesthetic, and long-lasting treatments.",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Smile,
      title: "Braces & Clear Aligners / Invisalign",
      tagline: "For a Perfectly Aligned Smile",
      fullDesc:
        "A confident smile begins with well-aligned teeth. At our clinic, we offer advanced orthodontic solutions including traditional braces and modern clear aligners to correct crooked teeth, spacing, crowding, and bite problems.",
      treatmentOptions: [
        "Clear aligners",
        "Invisalign (USA)",
        "Habit-breaking removable appliance",
      ],
      treatmentNote:
        "Clear aligners such as Invisalign (USA) are nearly invisible, removable trays that gradually move your teeth into the desired position, allowing you to straighten your smile comfortably. For patients who prefer fixed treatment, braces are also an effective and reliable option to achieve a healthy, properly aligned smile.",
      reasonsTitle: "Why You Need Braces or Aligners",
      reasons: [
        "Straighter, more confident smile",
        "Improved bite and chewing function",
        "Better oral hygiene and gum health",
        "Long-term dental stability",
      ],
      whyChooseUsIntro:
        "Orthodontic treatments at our clinic are planned using advanced digital technology to ensure precise diagnosis and predictable results, while keeping your comfort a priority.",
      whyChooseUs: [
        "Advanced digital treatment planning",
        "Precise diagnosis and predictable results",
        "Comfortable and patient-friendly approach",
        "Customized plans for every patient",
      ],
      philosophy:
        "To give naturally elegant smiles that enhance overall aesthetic and personality.",
      expertName: "Orthodontic Team",
      expertDesc:
        "Orthodontic treatment plans are designed with digital precision so your smile aligns naturally with your facial profile and oral health needs.",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
    {
      icon: Activity,
      title: "Facial Trauma & Maxillofacial Surgeries",
      tagline: "Expert Maxillofacial Treatment with Precision and Compassion",
      fullDesc:
        "Facial injuries require immediate attention, expert hands, and advanced surgical skills. At our clinic, jaw fractures, dental injuries, and maxillofacial emergencies are handled with accuracy and confidence. With over 18+ years of maxillofacial surgery experience, Prof. Dr. Balram Garg brings extensive expertise in managing complex maxillofacial surgery cases.",
      treatmentOptions: [
        "Facial and jaw bone fractures",
        "Dental trauma and broken teeth",
        "Soft tissue injuries",
        "Treatment of cysts",
        "Treatment of premalignant or malignant lesions (cancer)",
      ],
      reasonsTitle: "Why Patients Need Maxillofacial Surgery",
      reasons: [
        "Maxillofacial lesions and trauma can cause facial disfigurement, which can be emotionally and physically challenging or distressing for the patients",
      ],
      whyChooseUs: [
        "Dr. Balram Garg's extensive surgical experience combines surgical precision and compassionate care to restore not only function but also facial aesthetics and confidence",
        "Past experience from AIIMS, PGIMS, and Civil Hospital, along with a Master's from the USA",
        "The only maxillofacial surgery clinic in the area",
      ],
      philosophy:
        "Accurate Diagnosis. Safe Surgical Care. Faster Recovery. Long-term Stability.",
      expertName: "Prof. Dr. Balram Garg",
      expertDesc:
        "With 18+ years in maxillofacial surgery, Dr. Balram Garg combines surgical precision with compassionate care to restore function, aesthetics, and patient confidence.",
      color: "from-[#3DB7E4] to-[#0E6BA8]",
    },
    {
      icon: Syringe,
      title: "Oro-Facial Pain",
      tagline: "Specialized Care for Jaw, Face & Head Pain",
      fullDesc:
        "Orofacial pain treatment addresses chronic pain conditions affecting the jaw, face, and head, including TMJ disorders, headaches, and nerve pain, using comprehensive diagnostic and treatment approaches.",
      reasonsTitle: "Why Patients Need Orofacial Pain Treatment",
      reasons: [
        "Relief from chronic pain",
        "Reduces headaches and migraines",
        "Improves jaw function",
        "Non-surgical treatment options",
      ],
      whyChooseUs: [
        "Customized treatment plans",
        "Detailed pain assessment",
        "TMJ examination and imaging",
        "Identifying pain triggers",
        "Regular follow-up monitoring",
      ],
      philosophy:
        "Accurate diagnosis for the betterment of the patient's routine life.",
      expertName: "Prof. Dr. Balram Garg",
      expertDesc:
        "With 18+ years of experience in this field, Prof. Dr. Balram Garg combines accurate diagnostic skills with his emotional and compassionate care to restore function and patient confidence.",
      color: "from-[#0E6BA8] to-[#0A4F7A]",
    },
  ];

  const iconPool = [Drill, Stethoscope, Sparkles, Baby, Scissors, Camera, Smile, Activity, Syringe];
  const displayServices = dynamicServices.length > 0
    ? dynamicServices.filter(s => s.active !== false).map((s, i) => ({
        icon: iconPool[i % iconPool.length],
        title: s.title,
        tagline: s.shortDesc || "",
        fullDesc: s.fullDesc || s.shortDesc,
        treatmentOptions: s.procedure?.length ? s.procedure : undefined,
        reasonsTitle: "Benefits",
        reasons: s.benefits?.length ? s.benefits : ["Professional treatment", "Modern equipment", "Expert care"],
        whyChooseUs: ["Experienced team", "Advanced technology", "Patient-focused care"],
        philosophy: "",
        expertName: "",
        expertDesc: "",
        color: i % 2 === 0 ? "from-[#0E6BA8] to-[#0A4F7A]" : "from-[#3DB7E4] to-[#0E6BA8]",
      }))
    : services;

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
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-tight">
              Comprehensive Dental Care for Your Entire Family
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              From routine check-ups to advanced procedures, we offer complete dental services using state-of-the-art technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="space-y-16">
            {displayServices.map((service: any, index: number) => (
              <Card
                key={index}
                id={`service-${index}`}
                className="overflow-hidden border border-primary/10 hover:shadow-premium-lg transition-all duration-300 rounded-3xl bg-white"
              >
                {/* Service Header */}
                <div className="bg-gradient-to-br from-accent to-white p-8 md:p-10 border-b border-primary/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start space-x-5">
                      <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl text-foreground mb-2 font-semibold">{service.title}</h2>
                        <p className="text-primary/80 text-lg md:text-xl font-medium italic">{service.tagline}</p>
                      </div>
                    </div>
                    <Button
                      className="gradient-rose-gold text-white hover:shadow-lg transition-all duration-300 rounded-full px-8 py-6 text-base whitespace-nowrap"
                      onClick={() => onNavigate("appointment")}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-8 md:p-10 space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl mb-4 text-foreground font-semibold flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      About This Treatment
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg pl-11">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Treatment Options */}
                  {service.treatmentOptions && service.treatmentOptions.length > 0 && (
                    <div className="bg-gradient-to-br from-indigo-50/80 to-white p-6 md:p-8 rounded-2xl border border-indigo-100">
                      <h3 className="text-xl mb-5 text-foreground font-semibold flex items-center">
                        <ListChecks className="w-6 h-6 text-indigo-600 mr-3" />
                        Treatment Options
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.treatmentOptions.map((option: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3 bg-white/70 p-3 rounded-xl">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{option}</span>
                          </div>
                        ))}
                      </div>
                      {service.treatmentNote && (
                        <p className="mt-5 text-muted-foreground leading-relaxed text-sm bg-white/50 p-4 rounded-xl border border-indigo-50 italic">
                          {service.treatmentNote}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Why Need + Why Choose Us - Two Column Layout */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Why Need / Why Choose */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-2xl border border-blue-100">
                      <h3 className="text-xl mb-5 text-foreground font-semibold flex items-center">
                        <AlertCircle className="w-6 h-6 text-blue-600 mr-2" />
                        {service.reasonsTitle}
                      </h3>
                      <ul className="space-y-3">
                        {service.reasons.map((reason: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                      {service.reasonsNote && (
                        <div className="mt-5 bg-red-50 border border-red-100 rounded-xl p-4">
                          <p className="text-red-700 text-sm font-medium leading-relaxed">
                            ⚠ {service.reasonsNote}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 md:p-8 rounded-2xl border border-green-100">
                      <h3 className="text-xl mb-5 text-foreground font-semibold flex items-center">
                        <Star className="w-6 h-6 text-green-600 mr-2" />
                        Why Choose Us
                      </h3>
                      {service.whyChooseUsIntro && (
                        <p className="text-muted-foreground leading-relaxed mb-4 text-sm bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                          {service.whyChooseUsIntro}
                        </p>
                      )}
                      <ul className="space-y-3">
                        {service.whyChooseUs.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Philosophy */}
                  {service.philosophy && (
                    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 relative overflow-hidden">
                      <div className="absolute top-4 right-4 opacity-10">
                        <Heart className="w-20 h-20 text-primary" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-xl mb-4 text-foreground font-semibold flex items-center">
                          <Heart className="w-6 h-6 text-primary mr-2" />
                          Our Philosophy
                        </h3>
                        <p className="text-foreground/80 leading-relaxed text-lg italic">
                          "{service.philosophy}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Expert Guidance */}
                  {service.expertName && (
                    <div className="bg-gradient-to-br from-amber-50 to-white p-6 md:p-8 rounded-2xl border border-amber-100">
                      <h3 className="text-xl mb-4 text-foreground font-semibold flex items-center">
                        <Award className="w-6 h-6 text-amber-600 mr-2" />
                        Expert Guidance
                      </h3>
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <Award className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">{service.expertName}</h4>
                          <p className="text-muted-foreground leading-relaxed">{service.expertDesc}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Consultation CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-accent to-white p-6 rounded-2xl border border-primary/10">
                    <p className="text-muted-foreground mb-4 sm:mb-0 leading-relaxed">
                      Ready to get started? Book your consultation today.
                    </p>
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
                      onClick={() => onNavigate("appointment")}
                    >
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-24 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground">
              Why Choose Our Dental Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine expertise, technology, and compassion to deliver exceptional dental care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Team",
                description: "Board-certified dentists with 18+ years of specialized experience",
              },
              {
                icon: Shield,
                title: "Latest Technology",
                description: "State-of-the-art digital equipment for precise, comfortable treatment",
              },
              {
                icon: Clock,
                title: "Strict Sterilization",
                description: "World-class sterilization and disinfection protocols for your safety",
              },
              {
                icon: Heart,
                title: "Patient-Focused Care",
                description: "Compassionate, gentle approach with personalized treatment plans",
              },
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center border border-primary/10 rounded-3xl hover:shadow-premium transition-all duration-300">
                <div className="w-16 h-16 gradient-rose-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-foreground font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl mb-8 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Book your appointment today and take the first step toward a healthier, more beautiful smile
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
