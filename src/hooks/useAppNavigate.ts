import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { NavigateOptions } from "../types/navigation";

export const PAGE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  gallery: "/gallery",
  appointment: "/appointment",
  testimonials: "/testimonials",
  contact: "/contact",
};

export function pathToPageId(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";
  const doctorMatch = pathname.match(/^\/doctor\//);
  if (doctorMatch) return "doctor";
  return pathname.replace(/^\//, "").split("/")[0] || "home";
}

export function useAppNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (page: string, options?: NavigateOptions) => {
      if (page === "doctor") {
        const id = options?.doctorId;
        if (id) navigate(`/doctor/${id}`);
        else navigate("/about");
      } else if (page === "gallery" && options?.gallerySection) {
        navigate({
          pathname: "/gallery",
          search: `?section=${encodeURIComponent(options.gallerySection)}`,
        });
      } else {
        navigate(PAGE_PATHS[page] ?? "/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate]
  );
}
