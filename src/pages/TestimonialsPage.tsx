import { Star, Users, Award, ThumbsUp, Calendar, Sparkles, Heart } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {

  const screenshotStyleTestimonials = [
    {
      name: "Aagman Das",
      service: "RCT & Braces",
      rating: 5,
      date: "a month ago",
      text: "Visited Dr Balram for my RCT and braces treatment. Very professional and got very good results. Highly satisfied with overall experience and clinic setup.",
    },
    {
      name: "Rohit Balhara",
      service: "Dental Bridge",
      rating: 5,
      date: "a year ago",
      text: "Visited Dr. Balram Garg and Dr. Radhika Garg for root canal treatment and dental bridge. Very smooth and painless procedure. Both doctors are attentive and caring.",
    },
    {
      name: "M Jha",
      service: "Root Canal",
      rating: 5,
      date: "a year ago",
      text: "My friend was suffering from severe pain after a bad root canal and saw great improvement after treatment here. Both doctors are awesome and highly recommended.",
    },
    {
      name: "Ravindra Singh",
      service: "Dental Treatment",
      rating: 5,
      date: "2 years ago",
      text: "Bahut hi achha anubhav raha. Dr Balram aur team ka vyavahar aur treatment quality kaafi behtar hai. Clinic ka environment bhi bahut supportive hai.",
    },
    {
      name: "Taruna Kumar",
      service: "Implants & RCT",
      rating: 5,
      date: "4 years ago",
      text: "Amazing dental experience at Family Dentist. Got 2 dental implants and 3 root canals. Work was painless and committed, and prices were reasonable too.",
    },
    {
      name: "Jyotish Nayak",
      service: "RCT Capping",
      rating: 5,
      date: "5 years ago",
      text: "Had severe pain and fear of treatment, but doctors handled everything very patiently. RCT and capping were done smoothly. Very cordial specialists.",
    },
    {
      name: "Upainder Agarwal",
      service: "Wisdom Tooth Extraction",
      rating: 5,
      date: "a year ago",
      text: "Dr. Balram and Dr. Radhika are highly professional and compassionate. Wisdom tooth extraction was smooth and painless. Truly commendable care.",
    },
    {
      name: "Abhishek Mishra",
      service: "Comprehensive Dental Care",
      rating: 5,
      date: "a year ago",
      text: "Excellent dental experience with thorough explanation and empathetic support. Both doctors make patients comfortable and confident throughout treatment.",
    },
    {
      name: "Pallavi Tripathi",
      service: "General Dentistry",
      rating: 5,
      date: "4 years ago",
      text: "Brilliant and best dentist in Gaur City with supportive staff and a very professional clinic environment.",
    },
    {
      name: "Shivank Bhasin",
      service: "Dental Treatment",
      rating: 5,
      date: "a year ago",
      text: "Immense knowledge and expertise. Highly recommend Dr. Balram and Dr. Radhika for dental treatment in Noida Extension.",
    },
    {
      name: "Sudhir Mishra",
      service: "RCT & Capping",
      rating: 5,
      date: "a year ago",
      text: "Very ethical and skillful doctors. Multiple family members got treatment done here with painless procedures and great results.",
    },
    {
      name: "Preeti",
      service: "Cleaning & Wisdom Teeth",
      rating: 5,
      date: "a year ago",
      text: "Recovered confidence and smile after proper treatment. Cleaning issues resolved and wisdom teeth removed painlessly. Truly thankful to both doctors.",
    },
  ];

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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground font-semibold">
              Real Google Reviews
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshotStyleTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.name}-${index}`}
                className="p-8 border border-primary/10 bg-gradient-to-br from-white to-accent rounded-3xl hover:shadow-premium-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold text-lg">
                    {testimonial.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">"{testimonial.text}"</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {testimonial.service}
                  </span>
                  <div className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </Card>
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
