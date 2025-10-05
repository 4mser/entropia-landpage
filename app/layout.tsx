import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react"
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entropía | Ciencia y Tecnología",
  description: "Entropía Technologies: Innovación en ciencia y tecnología para crear soluciones efectivas y sostenibles.",
  keywords: ["Entropía",
    "Ciencia",
    "Tecnología",
    "Innovación",
    "Soluciones Efectivas",
    "Sostenibilidad",
    "IA",
    "Neurociencia",
    "Biotecnología",
    "Redes Neuronales",
    "Investigación",
    "Desarrollo Tecnológico",
    "Software a Medida",
    "Análisis de Datos",
    "Neurotecnología",
    "Tecnologías Biológicas",
    "Mejora Cognitiva",
    "Soluciones Sostenibles",
    "Investigación Científica",
    "Tecnología Avanzada",
    "Innovación Tecnológica",
    "Transformación Digital",
    "Desarrollo de Software",
    "Optimización de Recursos",
    "Tecnología de Vanguardia",
    "Investigación Aplicada",
    "Soluciones Tecnológicas",
    "Ciencia Aplicada",
    "Tecnología y Sociedad",
    "Investigación y Desarrollo",
    "Ciencia y Tecnología",
    "Transformación Empresarial",
    "IA Avanzada",
    "Análisis Predictivo",
    "Big Data",
    "Tecnología de Datos",
    "Ciencia de Datos",
    "Tecnología de la Información",
    "Transformación Digital Empresarial",
    "Estrategia Digital",
    "Innovación Empresarial",
    "Investigación y Tecnología",
    "Desarrollo de Productos",
    "Soluciones Empresariales",
    "Tecnología Empresarial",
    "Transformación Digital Sostenible",
    "Ciencia y Tecnología Sostenible",
    "Innovación Sostenible",
  ],
  authors: [{ name: "Entropía Technologies", url: "https://entropiatech.cl" }],
  creator: "Entropía Technologies",
  publisher: "Entropía Technologies",
  category: "technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Entropía | Ciencia y Tecnología",
    description: "Entropía Technologies: Innovación en ciencia y tecnología para crear soluciones efectivas y sostenibles.",
    url: "https://entropiatech.cl",
    siteName: "Entropía",
    locale: "es-CL",
    images: [
      {
        url: "https://entropiatech.cl/entropialogo.png",
        width: 1200,
        height: 630,
        alt: "Entropía Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entropía | Ciencia y Tecnología",
    description: "Entropía Technologies: Innovación en ciencia y tecnología para crear soluciones efectivas y sostenibles.",
    images: ["https://entropiatech.cl/entropialogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
        <CustomCursor />
        <div className="fixed h-[100vh] -z-10 inset-0 grid-pattern md:opacity-55"></div>
        <div className="fixed h-[100vh] -z-10 inset-0 vignette-pattern "></div>

        <Analytics/>
      </body>
    </html>
  );
}
