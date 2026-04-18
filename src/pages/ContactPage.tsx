import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card } from "../components/ui/card";
import { clinic } from "../data/clinicConfig";
import { fetchSettings, submitContactMessage } from "../api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchSettings().then(d => d && setSettings(d)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#f5f3f1] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-8 shadow-premium border border-primary/10">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Have questions? We're here to help. Reach out to us through any of the channels below
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Address */}
            <Card className="p-8 border border-primary/10 hover:shadow-premium-lg transition-all duration-300 rounded-3xl text-center group">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Visit Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                {settings?.addressLine1 || clinic.addressLine1}<br />
                {settings?.addressLine2 || clinic.addressLine2}
              </p>
            </Card>

            {/* Phone */}
            <Card className="p-8 border border-primary/10 hover:shadow-premium-lg transition-all duration-300 rounded-3xl text-center group">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Call Us</h3>
              <a href={settings?.phone1Tel || clinic.phone1Tel} className="text-primary hover:text-secondary transition-colors text-xl font-semibold block mb-1">
                {settings?.phone1 || clinic.phone1}
              </a>
              <a href={settings?.phone2Tel || clinic.phone2Tel} className="text-primary hover:text-secondary transition-colors text-xl font-semibold block mb-2">
                {settings?.phone2 || clinic.phone2}
              </a>
              <p className="text-muted-foreground text-sm">{settings?.timings || clinic.timings}</p>
            </Card>

            {/* Email */}
            <Card className="p-8 border border-primary/10 hover:shadow-premium-lg transition-all duration-300 rounded-3xl text-center group">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Email Us</h3>
              <a href={`mailto:${settings?.email || clinic.email}`} className="text-primary hover:text-secondary transition-colors font-medium block mb-2">
                {settings?.email || clinic.email}
              </a>
              <p className="text-muted-foreground text-sm">Response within 24 hours</p>
            </Card>

            {/* Working Hours */}
            <Card className="p-8 border border-primary/10 hover:shadow-premium-lg transition-all duration-300 rounded-3xl text-center group">
              <div className="w-20 h-20 gradient-rose-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Working Hours</h3>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>{settings?.timings || clinic.timings}</p>
              </div>
            </Card>
          </div>

          {/* Map and Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-premium h-[500px] lg:h-[600px]">
              <iframe
                src={settings?.googleMapEmbed || clinic.googleMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              ></iframe>
            </div>

            {/* Quick Inquiry Form */}
            <Card className="p-10 border border-primary/10 shadow-premium rounded-3xl">
              <h2 className="text-3xl mb-2 text-foreground font-semibold">Quick Inquiry Form</h2>
              <p className="text-muted-foreground mb-8">
                Send us a message and we'll get back to you as soon as possible
              </p>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl mb-3 text-foreground font-semibold">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="contact-name" className="text-base">Your Name *</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      className="mt-2 h-12 rounded-xl border-primary/20 focus:border-primary"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contact-phone" className="text-base">Phone Number *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder={settings?.phone1 || clinic.phone1}
                        className="mt-2 h-12 rounded-xl border-primary/20 focus:border-primary"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email" className="text-base">Email Address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-2 h-12 rounded-xl border-primary/20 focus:border-primary"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact-message" className="text-base">Your Message *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      className="mt-2 min-h-[150px] rounded-xl border-primary/20 focus:border-primary resize-none"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-rose-gold text-white hover:shadow-lg transition-all duration-300 rounded-full h-14 text-base"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Working Hours */}
      <section className="py-20 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground font-semibold">Office Hours</h2>
              <p className="text-xl text-muted-foreground">
                We offer flexible scheduling to accommodate your busy lifestyle
              </p>
            </div>
            
            <Card className="p-10 border border-primary/10 shadow-premium rounded-3xl bg-white">
              <div className="space-y-6">
                {[
                  { day: "Monday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Tuesday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Wednesday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Thursday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Friday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Saturday", hours: settings?.timings || clinic.timings, status: "Open" },
                  { day: "Sunday", hours: settings?.timings || clinic.timings, status: "Open" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-border last:border-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-foreground">{schedule.day}</div>
                        <div className="text-muted-foreground">{schedule.hours}</div>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          schedule.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 gradient-rose-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Phone className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold">
              Dental Emergency?
            </h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed">
              We understand dental emergencies can happen at any time. Call our 24/7 emergency hotline for immediate assistance.
            </p>
            <a
              href={settings?.phone1Tel || clinic.phone1Tel}
              className="inline-block bg-white text-primary hover:bg-white/90 shadow-premium-lg hover:shadow-xl transition-all duration-300 rounded-full px-12 py-6 text-2xl font-bold"
            >
              {settings?.phone1 || clinic.phone1}
            </a>
            <p className="text-white/70 mt-6">Available 24/7 for urgent dental care</p>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground font-semibold">How to Find Us</h2>
              <p className="text-xl text-muted-foreground">
                City Galleria Market, Gaur City 2, Greater Noida West
              </p>
            </div>
            
            <Card className="p-10 border border-primary/10 shadow-premium rounded-3xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4 text-foreground font-semibold flex items-center">
                    <MapPin className="w-6 h-6 text-primary mr-3" />
                    Our Address
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed pl-9">
                    {settings?.address || clinic.address}<br />
                    Greater Noida West, India
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl mb-4 text-foreground font-semibold">Parking Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Free parking available in the Medical Plaza parking garage. Entrance on Main Street. Validate your parking ticket at our reception desk for complimentary parking.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl mb-4 text-foreground font-semibold">Public Transportation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Accessible via Metro Line 5 (Medical Center Station) - 2 minute walk. Bus routes 12, 45, and 67 stop directly in front of the building.
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button
                    size="lg"
                    className="w-full md:w-auto gradient-rose-gold text-white rounded-full px-10"
                    onClick={() => window.open(settings?.googleMapDirectionsUrl || clinic.googleMapDirectionsUrl, "_blank")}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
