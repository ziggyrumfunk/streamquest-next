import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StreamQuest admin",
  robots: { index: false, follow: false },
};

/**
 * The admin section runs with its own minimal shell. The site Header
 * and Footer (which live in the root layout) still render around this,
 * which is fine; if you want a stripped-down chrome later, we can move
 * Header/Footer into a route group.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
