import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const viewport = {
  colorScheme: "light",
};

export const metadata = {
  metadataBase: new URL("https://keonlee.ca"),
  // default is the tab title on pages that don't set their own; template adds
  // the suffix to the ones that do, e.g. "Weekflow · Keon Lee's Portfolio"
  title: {
    default: "Keon Lee's Portfolio",
    template: "%s · Keon Lee's Portfolio",
  },
  description:
    "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
  openGraph: {
    title: "Keon Lee's Portfolio",
    description:
      "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
    url: "https://keonlee.ca",
    siteName: "Keon Lee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keon Lee's Portfolio",
    description:
      "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
