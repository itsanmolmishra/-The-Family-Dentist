import { clinic } from "../data/clinicConfig";
import type { DoctorProfile } from "../data/doctorsData";
import { googleReviewTestimonials } from "../data/googleReviewTestimonials";
import { DENTAL_SERVICE_CATALOG } from "./serviceCatalog";
import { absoluteUrl, SITE_URL } from "./seoConfig";

function parsePhoneE164(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  return `+${digits}`;
}

export function getLocalBusinessSchema() {
  const reviews = googleReviewTestimonials;
  const ratingValue =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5;

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#dentist`,
    name: clinic.seo.brandName,
    alternateName: [clinic.name, "Dr. Garg's Implant & Maxillofacial"],
    description: clinic.usp,
    url: SITE_URL,
    telephone: [parsePhoneE164(clinic.phone1), parsePhoneE164(clinic.phone2)],
    email: clinic.email,
    image: absoluteUrl("/og-image.jpg"),
    logo: absoluteUrl("/og-image.jpg"),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Insurance",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.addressLine1,
      addressLocality: clinic.seo.addressLocality,
      addressRegion: clinic.seo.addressRegion,
      postalCode: clinic.seo.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.seo.latitude,
      longitude: clinic.seo.longitude,
    },
    openingHoursSpecification: clinic.seo.openingHoursSpecification,
    areaServed: clinic.seo.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [
      clinic.googleMapDirectionsUrl,
      ...clinic.seo.sameAs.filter(Boolean),
    ],
    hasMap: clinic.googleMapDirectionsUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.text,
      itemReviewed: { "@id": `${SITE_URL}/#dentist` },
    })),
    medicalSpecialty: [
      "Dentistry",
      "Oral and Maxillofacial Surgery",
      "Endodontics",
      "Dental Implantology",
      "Cosmetic Dentistry",
      "Pediatric Dentistry",
      "Orthodontics",
    ],
    knowsAbout: DENTAL_SERVICE_CATALOG.map((s) => s.name),
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: clinic.seo.brandName,
    description: clinic.usp,
    publisher: { "@id": `${SITE_URL}/#dentist` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/appointment"),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      name: "Book Dental Appointment",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getPhysicianSchema(doctor: DoctorProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: doctor.specialty,
    description: doctor.description,
    image: doctor.image.startsWith("http") ? doctor.image : absoluteUrl(doctor.image),
    worksFor: { "@id": `${SITE_URL}/#dentist` },
    medicalSpecialty: doctor.specialty,
    url: absoluteUrl(`/doctor/${doctor.id}`),
    knowsAbout: doctor.spl,
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getServiceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dental Services",
    description: `Dental treatments offered at ${clinic.seo.brandName}`,
    numberOfItems: DENTAL_SERVICE_CATALOG.length,
    itemListElement: DENTAL_SERVICE_CATALOG.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalProcedure",
        name: service.name,
        description: service.description,
        url: absoluteUrl("/services"),
        procedureType: "http://schema.org/NoninvasiveProcedure",
      },
    })),
  };
}

export function getDoctorsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dental Specialists",
    url: absoluteUrl("/about"),
    itemListElement: clinic.seo.doctorIds.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: absoluteUrl(`/doctor/${id}`),
    })),
  };
}
