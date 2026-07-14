"use client"

import React, { createContext, memo } from "react"
import { useEffect, useState } from "react"
import { SidebarProvider, SidebarContent } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import TopbarPage from "./topbar"
import { trpc } from "@/app/trpc"
import LoadingSpinnerComponent from "./loading"
import { NavItem, ownerNavigations, staffNavigations } from "@/utils"
import NotFound from "@/app/not-found"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

type UserRoleDto = "Staff" | "Owner" | "Customer";

interface UserContextDto {
  userRole: UserRoleDto;
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  setUserRole: React.Dispatch<React.SetStateAction<UserRoleDto>>;
}

export const UserRoleContext = createContext<UserContextDto | undefined>(undefined);

const AdminLayoutPage = memo(({ children }: AdminLayoutProps) => {

  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState("Customer" as UserRoleDto);
  const [navigations, setNavigations] = useState([] as NavItem[]);
  const path = usePathname();

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
    const role = response?.data as UserRoleDto
    if (!role) return
    setUserRole(role)
    setNavigations(role === "Staff" ? staffNavigations : role === "Owner" ? ownerNavigations : [])
  }, [response?.data])

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return null;
  }

  if (navigations.length === 0 || userRole === "Customer") {
    return <LoadingSpinnerComponent />
  }

  const handleCheckUserPermission = (navigations: NavItem[]) => {
    return navigations.some(nav => {
      if (nav.children.length > 0) {
        return nav.children.some(child => path.startsWith(child.href));
      }
      return path.startsWith(nav.href);
    });
  }

  if (userRole === "Owner") {
    const isOwnerRoute = handleCheckUserPermission(ownerNavigations);
    if (!isOwnerRoute) {
      return <NotFound />
    }
  }

  if (userRole === "Staff") {
    const isStaffRoute = handleCheckUserPermission(staffNavigations);
    if (!isStaffRoute) {
      return <NotFound />
    }
  }

  return (
    <>
      {
        (isLoading) ?
          <LoadingSpinnerComponent /> :
          <UserRoleContext.Provider value={{ userRole, refetch, isLoading, isRefetching, setUserRole }}>
            <SidebarProvider>
              <AppSidebar navigations={navigations} />
              <SidebarContent>
                <main>
                  <TopbarPage userRole={userRole}/>
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