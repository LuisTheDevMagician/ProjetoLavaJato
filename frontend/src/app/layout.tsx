import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import {Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estética Automotiva Pinheiro",
  description: "A melhor estética automotiva de Corrente - PI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style:{
              backgroundColor: "#101026",
              color: "#3fffa3",
              borderColor: "#3fffa3",
              borderWidth: "1px",
              borderStyle: "solid",
            },
            duration: 3000,
          }}
        />
        {children}
      </body>
    </html>
  );
}
