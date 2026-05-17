"use client"

import React, { createContext, memo } from "react"
import { useEffect, useState } from "react"
import { SidebarProvider, SidebarContent } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import TopbarPage from "./topbar"
import { trpc } from "@/app/trpc"
import LoadingSpinnerComponent from "./loading"

interface AdminLayoutProps {
  children: React.ReactNode
}

type UserRoleDto = "Staff" | "Owner" | "Customer";

interface UserContextDto {
  userRole: UserRoleDto;
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  setUserRole:React.Dispatch<React.SetStateAction<UserRoleDto>>;
}

export const UserRoleContext = createContext<UserContextDto | undefined>(undefined);

const AdminLayoutPage = memo(({ children }: AdminLayoutProps) => {

  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState("Customer" as UserRoleDto)

  const {
    data: response,
    isLoading,
    refetch,
    isRefetching
  } = trpc.app.user.get.getUserRole.useQuery({
    refetchOnWindowFocus: true,
    keepPreviousData: false, // smooth page transition
  });

  useEffect(() => {
    const role = response?.data as UserRoleDto;
    if (role && role !== "Customer") {
      setUserRole(role);
    }
  }, [response?.data]);

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
        (isLoading || userRole === "Customer") ?
          <LoadingSpinnerComponent /> :
          <UserRoleContext.Provider value={{ userRole, refetch, isLoading, isRefetching, setUserRole }}>
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
          </UserRoleContext.Provider>

      }
    </>
  )
})


export default AdminLayoutPage;