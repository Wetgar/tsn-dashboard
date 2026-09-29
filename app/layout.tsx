import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Дашборд ТСН «Солнечный»",
  description: "Управление домом: п. Солнечный, ул. Спортивная, д. 11/1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-5 shadow">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl font-bold">🏠 Дашборд ТСН «Солнечный»</h1>
            <p className="text-sm text-blue-100 mt-1">
              Управление домом: п. Солнечный, ул. Спортивная, д. 11/1
            </p>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
