"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { notifyRouteCommitted } from "@/lib/page-transition";

/**
 * Tells an in-flight page transition that the new route is in the DOM.
 * A layout effect runs after the DOM update but before paint, which is the
 * moment the View Transition should snapshot the new page.
 */
export function RouteTransitionListener() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    notifyRouteCommitted();
  }, [pathname]);
  return null;
}
