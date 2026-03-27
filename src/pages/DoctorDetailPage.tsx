import { Award, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { getDoctorProfileForPage, type DoctorProfile } from "../data/doctorsData";
import { clinic } from "../data/clinicConfig";
import type { NavigateOptions } from "../types/navigation";

interface DoctorDetailPageProps {
  doctorId: string | null;
  onNavigate: (page: string, options?: NavigateOptions) => void;
}

export function DoctorDetailPage({ doctorId, onNavigate }: DoctorDetailPageProps) {
  const doctor: DoctorProfile | undefined = getDoctorProfileForPage(doctorId);

  if (!doctor) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-4">Doctor profile not found</h1>
          <p className="text-muted-foreground mb-8">The profile you are looking for is unavailable.</p>
          <Button onClick={() => onNavigate("about")}>Back to About</Button>
        </div>
      </div>
    );
  }

  const quals = [doctor.qualification, doctor.qualificationLine2].filter(Boolean) as string[];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#E7F6FD] border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="rounded-3xl overflow-hidden shadow-premium-lg border border-primary/10 bg-white">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full aspect-[3/4] object-cover object-top"
              />
            </div>

            <div>
              {doctor.roleLabel && (
                <span className="inline-block text-sm font-medium uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
                  {doctor.roleLabel}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-3 leading-tight">
                {doctor.title}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">{doctor.specialtyFull ?? doctor.specialty}</p>

              <div className="space-y-2 mb-6 text-muted-foreground">
                {quals.map((q, i) => (
                  <p key={i} className="leading-relaxed">
                    {q}
                  </p>
                ))}
              </div>

              <p className="text-sm font-medium text-foreground mb-1">
                Spl: {doctor.spl}
              </p>

              <div className="flex items-center gap-2 text-muted-foreground mt-4 mb-8">
                <Award className="w-5 h-5 text-secondary shrink-0" />
                <span>{doctor.experience}</span>
              </div>

              <Button
                size="lg"
                className="gradient-rose-gold text-white rounded-full px-8"
                onClick={() => onNavigate("appointment")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book an appointment
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">About {doctor.shortName ?? doctor.name}</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {doctor.bioParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {doctor.philosophy && (
            <Card className="mt-12 p-8 md:p-10 rounded-3xl border border-primary/10 bg-gradient-to-br from-accent/80 to-white shadow-premium">
              <h3 className="text-xl font-semibold text-foreground mb-4">Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{doctor.philosophy}</p>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-accent via-background to-accent border-t border-primary/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Questions about treatment options at {clinic.name}? Our team is happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="rounded-full" onClick={() => onNavigate("contact")}>
              Contact us
            </Button>
            <Button className="gradient-rose-gold text-white rounded-full" onClick={() => onNavigate("appointment")}>
              Book appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
