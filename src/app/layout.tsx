import "@/styles/globals.css";

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
      <body className="h-screen bg-orange-200 m-10">{children}</body>
    </html>
  );
}
