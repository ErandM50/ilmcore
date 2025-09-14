import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ilmcore - Accelerating Understanding Through AI",
  description: "ilmcore is transforming education by seamlessly integrating AI into educational institutions, empowering learners and educators with intelligent, adaptive learning solutions.",
  keywords: "AI education, machine learning, educational technology, adaptive learning, intelligent tutoring",
  openGraph: {
    title: "ilmcore - Accelerating Understanding Through AI",
    description: "Transforming education through AI-powered learning solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}