import "@/styles/globals.css";

import Providers from "@/components/Providers";

export const metadata = {
  title: "Weather App",
  description: "Weather App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-white p-2">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
