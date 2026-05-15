import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getDoctorById } from "../data/doctorsData";
import { clinic } from "../data/clinicConfig";
import { getFaqsForPath } from "../seo/faqContent";
import { absoluteUrl, resolveSeoForPath } from "../seo/seoConfig";
import {
  getBreadcrumbSchema,
  getDoctorsItemListSchema,
  getFaqSchema,
  getLocalBusinessSchema,
  getPhysicianSchema,
  getServiceCatalogSchema,
  getWebSiteSchema,
} from "../seo/structuredData";

const PATH_LABELS: Record<string, string> = {
  "": "Home",
  about: "About",
  services: "Services",
  gallery: "Gallery",
  appointment: "Book Appointment",
  testimonials: "Reviews",
  contact: "Contact",
  doctor: "Doctors",
};

const GSC_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;
const BING_VERIFICATION = import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined;

function buildBreadcrumbs(pathname: string) {
  const items = [{ name: "Home", path: "/" }];
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  if (segments.length === 0) return items;

  if (segments[0] === "doctor" && segments[1]) {
    const doctor = getDoctorById(segments[1]);
    items.push({ name: "About", path: "/about" });
    items.push({
      name: doctor?.shortName ?? doctor?.name ?? "Doctor",
      path: `/doctor/${segments[1]}`,
    });
    return items;
  }

  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    items.push({ name: PATH_LABELS[seg] ?? seg, path: acc });
  }
  return items;
}

function buildPageSchemas(pathname: string): object[] {
  const schemas: object[] = [getWebSiteSchema(), getLocalBusinessSchema()];
  const breadcrumbs = buildBreadcrumbs(pathname);

  if (pathname !== "/" && breadcrumbs.length > 1) {
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }

  const faqs = getFaqsForPath(pathname);
  if (faqs?.length) {
    schemas.push(getFaqSchema(faqs));
  }

  if (pathname.startsWith("/services")) {
    schemas.push(getServiceCatalogSchema());
  }

  if (pathname.startsWith("/about")) {
    schemas.push(getDoctorsItemListSchema());
  }

  const doctorMatch = pathname.match(/^\/doctor\/([^/]+)/);
  if (doctorMatch) {
    const doctor = getDoctorById(doctorMatch[1]);
    if (doctor) schemas.push(getPhysicianSchema(doctor));
  }

  return schemas;
}

export function SeoHead() {
  const { pathname } = useLocation();
  const meta = resolveSeoForPath(pathname);
  const canonical = absoluteUrl(meta.path);
  const ogImage = absoluteUrl("/og-image.jpg");
  const jsonLd = buildPageSchemas(pathname);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={clinic.seo.brandName} />
      <meta
        name="robots"
        content={
          meta.noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta name="googlebot" content={meta.noindex ? "noindex, follow" : "index, follow"} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-IN" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:site_name" content={clinic.seo.brandName} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.ogType ?? "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${clinic.seo.brandName} — ${clinic.tagline}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${clinic.seo.brandName} logo`} />

      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content={clinic.seo.addressLocality} />
      <meta name="geo.position" content={`${clinic.seo.latitude};${clinic.seo.longitude}`} />
      <meta name="ICBM" content={`${clinic.seo.latitude}, ${clinic.seo.longitude}`} />

      <meta name="format-detection" content="telephone=yes" />
      <meta name="application-name" content={clinic.seo.brandName} />
      <meta name="apple-mobile-web-app-title" content={clinic.seo.brandName} />

      {GSC_VERIFICATION ? (
        <meta name="google-site-verification" content={GSC_VERIFICATION} />
      ) : null}
      {BING_VERIFICATION ? (
        <meta name="msvalidate.01" content={BING_VERIFICATION} />
      ) : null}

      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
