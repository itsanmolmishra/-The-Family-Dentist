import { clinic } from "../data/clinicConfig";
import { getDoctorById } from "../data/doctorsData";

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://www.thefamilydentist.in"
).replace(/\/$/, "");

export type SeoMeta = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogType?: "website" | "article" | "profile";
  noindex?: boolean;
};

const brand = clinic.seo.brandName;
const location = clinic.seo.locationLabel;

const defaultKeywords = [
  "dentist Noida Extension",
  "dental clinic Greater Noida West",
  "dental implants Noida",
  "maxillofacial surgeon Noida",
  "root canal specialist Gaur City",
  "cosmetic dentistry Noida West",
  "family dentist Noida Extension",
  "wisdom tooth removal Noida",
  "kids dentist Greater Noida",
  "best dentist Gaur City 2",
  "dental implant clinic Noida Extension",
  "Dr Balram Garg dentist",
  "The Family Dentist",
  "दंत चिकित्सक नोएडा एक्सटेंशन",
].join(", ");

export const PAGE_SEO: Record<string, SeoMeta> = {
  home: {
    path: "/",
    title: `${brand} | Best Dental Implants & Maxillofacial Clinic in ${location}`,
    description: `${clinic.usp} Visit ${brand} at ${clinic.address}. Book dental implants, RCT, cosmetic dentistry & kids dentistry. Call ${clinic.phone1}.`,
    keywords: defaultKeywords,
  },
  about: {
    path: "/about",
    title: `About Us | Expert Dentists in ${location} | ${brand}`,
    description: `Meet our USA-trained dental specialists at ${brand}, ${location}. 18+ years experience in implants, maxillofacial surgery, RCT & cosmetic dentistry.`,
    keywords: `about ${brand}, dental specialists Noida, implantologist Greater Noida West, ${defaultKeywords}`,
  },
  services: {
    path: "/services",
    title: `Dental Services | Implants, RCT, Braces & More | ${brand}`,
    description: `Comprehensive dental care in ${location}: dental implants, root canal, cosmetic dentistry, wisdom tooth removal, braces, kids dentistry & maxillofacial surgery.`,
    keywords: `dental services Noida Extension, dental implants cost Noida, root canal treatment Gaur City, ${defaultKeywords}`,
  },
  gallery: {
    path: "/gallery",
    title: `Before & After Gallery | Smile Transformations | ${brand}`,
    description: `View real patient results — dental implants, full mouth rehabilitation, cosmetic dentistry & oral surgery cases at ${brand}, ${location}.`,
    keywords: `dental before after Noida, implant results gallery, smile makeover Greater Noida, ${defaultKeywords}`,
  },
  appointment: {
    path: "/appointment",
    title: `Book Appointment | ${brand} | ${location}`,
    description: `Schedule your dental visit at ${brand}, ${location}. Easy online booking for implants, RCT, check-ups & emergency dental care. Call ${clinic.phone1}.`,
    keywords: `book dentist appointment Noida, dental appointment Gaur City 2, ${defaultKeywords}`,
  },
  testimonials: {
    path: "/testimonials",
    title: `Patient Reviews & Testimonials | ${brand}`,
    description: `Read what patients say about ${brand} — trusted dental implant & maxillofacial clinic in ${location}. Real Google reviews and success stories.`,
    keywords: `dentist reviews Noida Extension, patient testimonials dental clinic, ${defaultKeywords}`,
  },
  contact: {
    path: "/contact",
    title: `Contact & Location | ${brand} | ${location}`,
    description: `Visit ${brand}: ${clinic.address}. Phone ${clinic.phone1}, ${clinic.phone2}. Timings: ${clinic.timingsShort}. Get directions on Google Maps.`,
    keywords: `dentist near me Noida Extension, dental clinic address Gaur City 2, ${defaultKeywords}`,
  },
};

export function getDoctorSeo(doctorId: string): SeoMeta | null {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;
  return {
    path: `/doctor/${doctorId}`,
    title: `${doctor.title} | ${doctor.specialty} | ${brand}`,
    description: `${doctor.description} Book an appointment at ${brand}, ${location}. ${doctor.experience}.`,
    keywords: `${doctor.name}, ${doctor.specialty}, dentist ${location}, ${defaultKeywords}`,
    ogType: "profile",
  };
}

export function resolveSeoForPath(pathname: string): SeoMeta {
  if (pathname === "/" || pathname === "") return PAGE_SEO.home;

  const doctorMatch = pathname.match(/^\/doctor\/([^/]+)\/?$/);
  if (doctorMatch) {
    const doctorSeo = getDoctorSeo(doctorMatch[1]);
    if (doctorSeo) return doctorSeo;
    return {
      ...PAGE_SEO.about,
      path: pathname,
      title: `Doctor Profile | ${brand}`,
      noindex: true,
    };
  }

  const pageKey = pathname.replace(/^\//, "").split("/")[0];
  return PAGE_SEO[pageKey] ?? PAGE_SEO.home;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
