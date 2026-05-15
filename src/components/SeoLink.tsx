import type { AnchorHTMLAttributes, ReactNode } from "react";
import { PAGE_PATHS } from "../hooks/useAppNavigate";
import type { NavigateOptions } from "../types/navigation";

type SeoLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  page: string;
  options?: NavigateOptions;
  onNavigate: (page: string, options?: NavigateOptions) => void;
  children: ReactNode;
};

function resolveHref(page: string, options?: NavigateOptions): string {
  if (page === "doctor" && options?.doctorId) {
    return `/doctor/${options.doctorId}`;
  }
  if (page === "gallery" && options?.gallerySection) {
    return `/gallery?section=${encodeURIComponent(options.gallerySection)}`;
  }
  return PAGE_PATHS[page] ?? "/";
}

export function SeoLink({
  page,
  options,
  onNavigate,
  onClick,
  children,
  ...rest
}: SeoLinkProps) {
  const href = resolveHref(page, options);

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page, options);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
