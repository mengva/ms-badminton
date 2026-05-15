"use client"

import React, { memo } from "react"
import { useEffect, useState } from "react"
import { SidebarProvider, SidebarContent } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import { usePathname, useRouter } from "next/navigation"
import TopbarPage from "./topbar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayoutPage = memo(({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const auth = pathname.startsWith("/auth");
    setIsAuth(auth);
  }, [pathname]);


  // const { data: response } = trpc.app.user.auth.isVerifyToken.useQuery();

  // useEffect(() => {
  //   const type = response?.data?.type;
  //   console.log("type", type);
  //   if (type === "ERROR") {
  //     return router.push("/auth/signin");
  //   }
  // }, [response?.data]);

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
          <main className="p-4">
            {children}
          </main>
        ) :
          <>
            <SidebarProvider>
              <AppSidebar />
              <SidebarContent>
                <main>
                  <TopbarPage />
                  <div className="p-4">
                    {children}
                  </div>
                </main>
              </SidebarContent>
            </SidebarProvider>
          </>
      }
    </>
  )
})


export default AdminLayoutPage;