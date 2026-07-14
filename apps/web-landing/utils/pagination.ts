import {
    LucideHome,
    LucideBuilding2,
    LucideCalendar,
    LucidePhone
} from 'lucide-react';

export type NavigationItem = {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isActive: boolean;
    children: NavigationItem[];
};

export const navigations: NavigationItem[] = [
    {
        name: "ຫນ້າຫຼັກ",
        href: "/",
        icon: LucideHome,
        isActive: false,
        children: [],
    },
    {
        name: "ສະໜາມ",
        href: "/court",
        icon: LucideBuilding2,
        isActive: false,
        children: [],
    },
    {
        name: "ການຈອງ",
        href: "/booking",
        icon: LucideCalendar,
        isActive: false,
        children: [],
    },
    {
        name: "ຕິດຕໍ່",
        href: "/contact",
        icon: LucidePhone,
        isActive: false,
        children: [],
    },
];