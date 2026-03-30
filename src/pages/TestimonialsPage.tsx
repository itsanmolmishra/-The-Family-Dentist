import { Star, Users, Award, ThumbsUp, Calendar, Sparkles, Heart } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TestimonialReviewCard } from "../components/TestimonialReviewCard";
import { googleReviewTestimonials } from "../data/googleReviewTestimonials";

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {

  const beforeAfterCases = [
    {
      title: "Dental Implants Transformation",
      before: "https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      after: "https://images.unsplash.com/photo-1660300110666-9ff243d1328a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Complete smile restoration with dental implants",
      duration: "6 months",
    },
    {
      title: "Teeth Whitening Results",
      before: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      after: "https://images.unsplash.com/photo-1660300110666-9ff243d1328a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Professional whitening - 8 shades lighter",
      duration: "1 session",
    },
    {
      title: "Invisalign Treatment",
      before: "https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      after: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Perfectly aligned smile with clear aligners",
      duration: "18 months",
    },
    {
      title: "Cosmetic Smile Makeover",
      before: "https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      after: "https://images.unsplash.com/photo-1660300110666-9ff243d1328a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Complete smile transformation with veneers",
      duration: "3 months",
    },
  ];

  const stats = [
    { icon: Users, value: "20,000+", label: "Happy Patients" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: ThumbsUp, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#E7F6FD] via-[#F0F9FF] to-[#E7F6FD] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-8 shadow-premium border border-primary/10">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Patient Testimonials</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-tight">
              What Our Patients Say
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Real stories from real patients. See why families trust us with their dental care
            </p>
          </div>
        </div>
      </section>

      {/* Patient Testimonials Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Card className="rounded-3xl border border-primary/10 bg-gradient-to-br from-[#F8FCFF] to-white p-8 md:p-12 shadow-premium">
              <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
                Patient Testimonials
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                Our patients are at the heart of everything we do. We are proud to receive positive feedback from people who trust us with their smiles. Many of our patients appreciate our gentle approach, clear communication, and the comfortable experience they receive during treatment. Their kind words and successful treatment outcomes motivate our team to continue delivering the highest standard of dental care.
              </p>

              <div className="mt-8 rounded-2xl border border-primary/15 bg-[#EAF5FC] p-6 md:p-8">
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                  Please read what our patients have to say about their experience with us. Their reviews, shared in their own words, reflect the care, comfort, and trust they felt during their treatment at our clinic.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-base text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section className="py-24" style={{ backgroundColor: "#dee8ef" }}>
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

      {/* Before & After Gallery */}
      <section className="py-24 bg-gradient-to-br from-[#E7F6FD] via-[#F0F9FF] to-[#E7F6FD]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-6 shadow-premium border border-primary/10">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Transformations</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Before & After Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from our patients. See the amazing transformations we've achieved
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfterCases.map((case_, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-primary/10 shadow-premium rounded-3xl bg-white hover:shadow-premium-lg transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-0">
                  {/* Before */}
                  <div className="relative group overflow-hidden aspect-square">
                    <img
                      src={case_.before}
                      alt="Before treatment"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                      BEFORE
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative group overflow-hidden aspect-square">
                    <img
                      src={case_.after}
                      alt="After treatment"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                      AFTER
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-8 bg-gradient-to-br from-white to-accent">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">{case_.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{case_.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Treatment Duration</span>
                    <span className="text-sm font-semibold text-primary">{case_.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Why Patients Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from our satisfied patients about their experience at thefamilydentist
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassionate Care",
                description: "Our team treats every patient with genuine care and empathy, making you feel like family from your first visit.",
              },
              {
                icon: Award,
                title: "Expert Dentists",
                description: "Board-certified dentists with 15+ years of experience delivering exceptional results with precision.",
              },
              {
                icon: Sparkles,
                title: "Modern Technology",
                description: "State-of-the-art equipment and latest techniques ensure comfortable, efficient, and effective treatment.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-10 border border-primary/10 rounded-3xl hover:shadow-premium-lg transition-all duration-300 text-center group bg-gradient-to-br from-white to-accent"
              >
                <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl mb-4 text-foreground font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-8 text-white font-semibold">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied patients who have experienced the thefamilydentist difference. Book your appointment today!
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
              onClick={() => onNavigate("services")}
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
