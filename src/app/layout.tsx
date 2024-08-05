import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ToastProvider from "./ToastProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Share Secrets Securely, One Time Only",
	description: "Protect your sensitive information with our simple, encrypted, single-use sharing system.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" sizes="32x32" />
				<ColorSchemeScript />
			</head>

			<body className={inter.className}>
				<main>
					<MantineProvider
						theme={{
							primaryColor: "golden",
							colors: {
								golden: ["#fff5e4", "#f9ebd4", "#efd5ac", "#e4be7f", "#dcab5a", "#d79e42", "#d49834", "#e2b975", "#a7751e", "#916411"],
							},
						}}
					>
						<ToastProvider>{children}</ToastProvider>
					</MantineProvider>
				</main>
			</body>
		</html>
	);
}
