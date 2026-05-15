import { clinic } from "../data/clinicConfig";

const brand = clinic.seo.brandName;

export const HOME_FAQS = [
  {
    question: `Where is ${brand} located?`,
    answer: `${brand} is at ${clinic.address}, ${clinic.seo.addressLocality}, ${clinic.seo.addressRegion}.`,
  },
  {
    question: "What are the clinic timings?",
    answer: clinic.timings,
  },
  {
    question: "Do you offer dental implants in Noida Extension?",
    answer: clinic.usp,
  },
  {
    question: "How can I book an appointment?",
    answer: `Call ${clinic.phone1} or ${clinic.phone2}, or use our online appointment form.`,
  },
];

export const SERVICES_FAQS = [
  {
    question: "What dental implant services do you offer?",
    answer: `We provide single tooth implants, multiple implants, full mouth rehabilitation, and bone grafting at ${brand}, ${clinic.seo.locationLabel}.`,
  },
  {
    question: "Do you perform single-sitting root canal treatment?",
    answer: `Yes. Our endodontist specializes in single-sitting RCT, cosmetic dentistry, veneers, and smile design with 18+ years of experience.`,
  },
  {
    question: "Is wisdom tooth removal available at your clinic?",
    answer: "Yes. Our oral & maxillofacial surgeon performs wisdom tooth extractions, impactions, and minor oral surgeries with advanced care.",
  },
  {
    question: "Do you treat children?",
    answer: "Yes. We offer kids dentistry including trauma care, preventive treatments, and gentle pediatric dental procedures.",
  },
];

export const CONTACT_FAQS = [
  {
    question: `How do I reach ${brand} by phone?`,
    answer: `Call ${clinic.phone1} or ${clinic.phone2} during clinic hours: ${clinic.timingsShort}.`,
  },
  {
    question: "Is parking available at the clinic?",
    answer: "Yes. Ample parking is available at City Galleria Market, Gaur City 2, Greater Noida West.",
  },
  {
    question: "How do I get directions to the clinic?",
    answer: `We are at ${clinic.address}. Use Google Maps for turn-by-turn directions from Noida Extension, Crossings Republik, or Gaur City.`,
  },
];

export const APPOINTMENT_FAQS = [
  {
    question: "How do I book a dental appointment online?",
    answer: `Fill the appointment form on our website with your name, phone, preferred service, date, and time. Our team will confirm within 24 hours.`,
  },
  {
    question: "What services can I book an appointment for?",
    answer: "Dental implants, root canal, cosmetic dentistry, wisdom tooth removal, braces, kids dentistry, maxillofacial surgery, and general check-ups.",
  },
];

export function getFaqsForPath(pathname: string) {
  if (pathname === "/" || pathname === "") return HOME_FAQS;
  if (pathname.startsWith("/services")) return SERVICES_FAQS;
  if (pathname.startsWith("/contact")) return CONTACT_FAQS;
  if (pathname.startsWith("/appointment")) return APPOINTMENT_FAQS;
  return null;
}
