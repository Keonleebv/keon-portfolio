import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://keonlee.com"),
  title: "Keon Lee — Product Manager",
  description:
    "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
  openGraph: {
    title: "Keon Lee — Product Manager",
    description:
      "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
    url: "https://keonlee.com",
    siteName: "Keon Lee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keon Lee — Product Manager",
    description:
      "Chemical engineer turned product manager. Weekflow, Coddle, and real work from Hootsuite and EA.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
