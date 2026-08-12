import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });

  const title = "Unspoken Horizon — Abigael Osward Sanga";
  const description =
    "Observing the world in quiet nuances; weaving thought, culture, and human truth into living words.";

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;

  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-[#FAFAFA] text-[#171717]`}>
      <body className="bg-[#FAFAFA] text-[#171717] antialiased">
        <section className="min-h-screen flex flex-col justify-between">
          {isDraftMode && <AlertBanner />}
          <main>{children}</main>
          <footer className="border-t border-zinc-200/80 bg-[#FAFAFA] mt-20">
            <div className="max-w-5xl mx-auto px-6 py-12">
              {footer.length > 0 ? (
                <PortableText
                  className="prose-sm text-pretty w-full max-w-none text-center text-zinc-600"
                  value={footer as PortableTextBlock[]}
                />
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
                  <p>© 2026 Unspoken Horizon — Abigael Osward Sanga. All rights reserved.</p>
                  <div className="flex items-center gap-6 font-medium">
                    <Link
                      href="/studio"
                      className="text-[#6C3BFF] hover:underline"
                    >
                      Sanity Studio
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}