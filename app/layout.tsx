import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Coquina Cove | Gulf-Front Vacation Home on Manasota Key",
    description: "A private three-bedroom Gulf-front vacation home on Manasota Key in Englewood, Florida.",
    openGraph: {
      title: "Coquina Cove",
      description: "Gulf-front on Manasota Key.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Coquina Cove sunset deck on Manasota Key" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Coquina Cove",
      description: "Gulf-front on Manasota Key.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
