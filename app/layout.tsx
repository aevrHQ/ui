// ./app/layout.tsx

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { Parkinsans, Host_Grotesk } from "next/font/google";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aevr.space";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

const APP_NAME = "aevr/ui";
const APP_DEFAULT_TITLE = "aevr/ui";
const APP_TITLE_TEMPLATE = "%s - aevr/ui";
const APP_DESCRIPTION =
  "A collection of beautiful, accessible, and production-ready components built on top of shadcn/ui. Get started in seconds.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  metadataBase: new URL(APP_URL),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hostGrotesk.variable} ${parkinsans.variable}`}>
        <NextTopLoader showSpinner={false} color="#51a2ff" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" offset={"2rem"} theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
