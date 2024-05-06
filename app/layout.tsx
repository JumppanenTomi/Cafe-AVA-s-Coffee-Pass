import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import localFont from "next/font/local";
import CookieCompliance from "@/components/CookieCompliance";
config.autoAddCss = false;

// The default URL for the app.
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  :"http://localhost:3000";
  

// The metadata for the app.
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cafe AVA - Coffee pass",
  description: "Cafe AVA's digital coffee pass.",
};

// The font for the app.
const myFont = localFont({ src: "../public/fonts/avamainfont.ttf" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={myFont.className}>
      <body className='bg-background text-foreground'>
        <main className='flex flex-col items-center min-h-screen'>
          {children}
        </main>
      </body>
      {/* The cookie compliance component that is rendered on every page */}
      <CookieCompliance />
    </html>
  );
}
