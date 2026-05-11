"use client"

import React, { memo } from "react"
import { useEffect, useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import { usePathname } from "next/navigation"
import TopbarPage from "./topbar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayoutPage = memo(({ children }: AdminLayoutProps) => {
  const pathname = usePathname()

  const [isAuth, setIsAuth] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const auth = pathname.startsWith("/auth");
    setIsAuth(auth);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return null;
  }

  return (
    <>
      {
        isAuth ? (
          <main>
            {children}
          </main>
        ) :
          <>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main>
                  <TopbarPage />
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </>
      }
    </>
  )
})


export default AdminLayoutPage;