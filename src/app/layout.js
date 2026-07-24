import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "साहित्य सृजन व संवाद",
  description: "कला संस्कृति चिंतन का पोर्टल",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className="min-h-screen flex flex-col bg-white text-zinc-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}