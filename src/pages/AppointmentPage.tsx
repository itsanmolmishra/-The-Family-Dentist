import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, User, Mail, Phone, MessageSquare, Shield, CreditCard, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { clinic } from "../data/clinicConfig";
import { fetchServices, submitAppointment } from "../api";

interface AppointmentPageProps {
  onNavigate: (page: string) => void;
}

export function AppointmentPage({ onNavigate }: AppointmentPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dynamicServices, setDynamicServices] = useState<string[]>([]);

  useEffect(() => {
    fetchServices().then(d => {
      if (d.length) setDynamicServices(d.filter((s: any) => s.active !== false).map((s: any) => s.title));
    }).catch(() => {});
  }, []);

  const services = [
    "Dental Implants",
    "Root Canal Treatment",
    "Cosmetic Dentistry",
    "Kids Dentistry",
    "Wisdom Tooth Removal",
    "Digital Dentistry",
    "Braces & Clear Aligners / Invisalign",
    "Facial Trauma & Maxillofacial Surgeries",
    "Oro-Facial Pain",
  ];

  const displayServices = dynamicServices.length > 0 ? dynamicServices : services;

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitAppointment(formData);
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 flex items-center justify-center bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#f5f3f1]">
        <Card className="max-w-2xl mx-4 p-12 text-center border border-primary/10 shadow-premium-lg rounded-3xl bg-white">
          <div className="w-24 h-24 gradient-rose-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-6 text-foreground">
            Appointment Request Received!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Thank you, <span className="text-primary font-medium">{formData.name}</span>! We've received your appointment request for{" "}
            <span className="text-primary font-medium">{formData.service}</span> on{" "}
            <span className="text-primary font-medium">{formData.date}</span> at{" "}
            <span className="text-primary font-medium">{formData.time}</span>.
          </p>
          <div className="bg-gradient-to-br from-accent to-white p-8 rounded-2xl mb-8">
            <p className="text-muted-foreground mb-5 leading-relaxed">
              Our team will contact you within 24 hours to confirm your appointment. If you need
              immediate assistance, please call us.
            </p>
            <div className="flex items-center justify-center space-x-3 text-primary">
              <Phone className="w-6 h-6" />
              <span className="text-2xl font-semibold">{clinic.phone1}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
            >
              Book Another Appointment
            </Button>
            <Button
              onClick={() => onNavigate("home")}
              size="lg"
              className="gradient-rose-gold text-white rounded-full px-8"
            >
              Return to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#fff9f5] via-[#faf8f7] to-[#f5f3f1] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-5 py-2.5 rounded-full mb-8 shadow-premium border border-primary/10">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Book Appointment</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-8 text-foreground leading-tight">
              Schedule Your Dental Visit
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose a convenient time for your appointment. We offer flexible scheduling to fit
              your busy lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-10 border border-primary/10 shadow-premium rounded-3xl">
                <h2 className="text-3xl mb-8 text-foreground">Appointment Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-base">Full Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 h-12 rounded-xl border-primary/20 focus:border-primary"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-base">Phone Number *</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={clinic.phone1}
                          className="pl-12 h-12 rounded-xl border-primary/20 focus:border-primary"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base">Email Address *</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-12 h-12 rounded-xl border-primary/20 focus:border-primary"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <Label htmlFor="service" className="text-base">Service Needed *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange("service", value)}
                      required
                    >
                      <SelectTrigger className="mt-2 h-12 rounded-xl border-primary/20">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {displayServices.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date" className="text-base">Preferred Date *</Label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-12 h-12 rounded-xl border-primary/20 focus:border-primary"
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-base">Preferred Time *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleChange("time", value)}
                        required
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-xl border-primary/20">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-base">Additional Notes (Optional)</Label>
                    <div className="relative mt-2">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <Textarea
                        id="message"
                        placeholder="Any specific concerns or questions?"
                        className="pl-12 min-h-[120px] rounded-xl border-primary/20 focus:border-primary resize-none"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-rose-gold text-white hover:shadow-lg transition-all duration-300 rounded-full h-14 text-base"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Request Appointment
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    * Required fields. We'll contact you within 24 hours to confirm.
                  </p>
                </form>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="p-6 border border-border">
                <h3 className="mb-4 text-foreground">Need Help?</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground">Call Us</div>
                      <div className="text-primary">{clinic.phone1}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {clinic.timings}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground">Email Us</div>
                      <div className="text-primary break-all">{clinic.email}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        Response within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="p-6 border border-border">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-foreground">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday - Sunday", hours: clinic.timings },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="text-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Emergency Notice */}
              <Card className="p-6 bg-destructive/10 border-destructive/20">
                <h3 className="mb-2 text-destructive">Dental Emergency?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent dental issues, call our emergency hotline immediately.
                </p>
                <a href={clinic.phone1Tel}>
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {clinic.phone1}
                  </Button>
                </a>
              </Card>

              {/* What to Expect */}
              <Card className="p-6 border border-border">
                <h3 className="mb-4 text-foreground">What to Expect</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "Confirmation call within 24 hours",
                    "Reminder text before appointment",
                    "Complete new patient paperwork",
                    "Arrive 10 minutes early",
                    "Bring insurance card and ID",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-background to-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground font-semibold">Insurance & Payment Options</h2>
              <p className="text-xl text-muted-foreground">
                We accept most major dental insurance plans and offer flexible payment options to make quality dental care accessible.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Insurance Accepted",
                  description: "We work with most major dental insurance providers including Delta Dental, Cigna, Aetna, MetLife, and more",
                },
                {
                  icon: CreditCard,
                  title: "Flexible Payment Plans",
                  description: "Multiple payment options available including credit cards, CareCredit, and custom financing plans",
                },
                {
                  icon: DollarSign,
                  title: "Transparent Pricing",
                  description: "Clear cost estimates provided upfront with no hidden fees. We'll help maximize your insurance benefits",
                },
              ].map((item, index) => (
                <Card key={index} className="p-8 border border-primary/10 rounded-3xl hover:shadow-premium-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3 text-foreground font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}