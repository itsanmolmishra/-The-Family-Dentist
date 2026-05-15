import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on route change (works with BrowserRouter; unlike ScrollRestoration). */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
