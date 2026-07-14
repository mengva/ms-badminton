import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@workspace/ui/components/sidebar"
import SidebarPage from "./sidebar"
import { NavItem } from "@/utils/navigation"

export function AppSidebar({ navigations }: { navigations: NavItem[] }) {
    return (
        <Sidebar>
            {/* <SidebarHeader /> */}
            <SidebarContent>
                <SidebarPage navigations={navigations} />
            </SidebarContent>
            {/* <SidebarFooter /> */}
        </Sidebar>
    )
}