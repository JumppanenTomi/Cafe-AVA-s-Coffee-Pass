import {GeistSans} from "geist/font/sans";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Cafe AVA - Coffee pass",
	description: "Cafe AVA's digital coffee pass.",
};

export default function RootLayout({children,}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
		<body className="bg-background text-foreground">
		<main className="min-h-screen flex flex-col items-center">
			{children}
		</main>
		</body>
		</html>
	);
}
