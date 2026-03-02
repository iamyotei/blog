import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/main/header";
import Footer from "@/components/main/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Вадим Соколов",
    default: '',
  },
  description: "Блог о программировании на 1С",
  keywords: ['Блог', 'Разработчик 1С', '1С', 'Программирование', 'Доработки конфигураций'],
  authors: [{ name: 'Вадим Соколов' }],
  openGraph: {
    title: '%s - Вадим Соколов',
    description: 'Блог о программировании на 1С',
    url: 'https://vadimsokolov.ru',
    siteName: 'Блог о программировании Вадима Соколова',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${geistSans.variable} antialiased font-sans h-full grid grid-rows-[auto_1fr_auto]`} >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// export function Naim() {
//     return (

//     )
// }
