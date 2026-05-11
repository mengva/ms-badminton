import localFont from "next/font/local";
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { TRPCProvider } from "./trpc";
import { Metadata } from "next";
import AdminLayoutPage from "@/components/admin-layout";

const customizeFont = localFont({
  src: "../../../packages/src/fonts/Phetsarath_OT.ttf",
  variable: "--Phetsarath_OT",
});

export const metadata: Metadata = {
  title: "Web Admin",
  description: "Admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={customizeFont.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div id="web" className="w-full h-screen fixed inset-0 overflow-y-auto">
            <TRPCProvider>
              <Providers>
                <AdminLayoutPage>
                  {children}
                  <Toaster position="bottom-right" />
                </AdminLayoutPage>
              </Providers>
            </TRPCProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
