import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function loadGtag(id: string) {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });
}

export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    loadGtag(GA_ID);
  }, []);

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + search,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
