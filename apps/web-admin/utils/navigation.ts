import {
    MdPeopleAlt,
    MdPersonSearch,
    MdSportsSoccer,
    MdCategory,
    MdManageAccounts,
} from "react-icons/md";

import {
    BsCalendarCheck,
    BsCalendarX,
    BsCashCoin,
    BsFillBookmarkCheckFill,
    BsFileEarmarkText,
} from "react-icons/bs";

import {
    FiLogIn,
    FiLogOut,
    FiCheckSquare,
    FiPrinter,
} from "react-icons/fi";

import {
    RiMoneyDollarCircleLine,
    RiFileList3Line,
    RiBankCardLine,
} from "react-icons/ri";

import {
    TbReportAnalytics,
    TbReport,
} from "react-icons/tb";

import { IconType } from "react-icons";
import { LucideLayoutDashboard } from "lucide-react";

// -------------------- Types --------------------
export type NavChild = {
    name: string;
    href: string;
    icon: IconType;
    isActive: boolean;
};

export type NavItem = {
    name: string;
    href: string;
    icon: IconType;
    isActive: boolean;
    children: NavChild[];
};

// -------------------- Navigations --------------------
export const staffNavigations: NavItem[] = [
    {
        name: "ແຜງຄວບຄຸມ",
        href: "/admin/dashboard",
        icon: LucideLayoutDashboard ,
        isActive: false,
        children: [],
    },
    // 1. ຈັດການຂໍ້ມູນພື້ນຖານ
    {
        name: "ຈັດການຂໍ້ມູນພື້ນຖານ",
        href: "/admin/master-data",
        icon: MdManageAccounts,
        isActive: false,
        children: [
            {
                name: "ຈັດການຂໍ້ມູນພະນັກງານ",
                href: "/admin/master-data/staffs",
                icon: MdPeopleAlt,
                isActive: false,
            },
            // {
            //     name: "ຈັດການຂໍ້ມູນລູກຄ້າ",
            //     href: "/admin/master-data/customers",
            //     icon: MdPersonSearch,
            //     isActive: false,
            // },
            {
                name: "ຈັດການຂໍ້ມູນເດີ່ນ",
                href: "/admin/master-data/courts",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ຈັດການຂໍ້ມູນປະເພດເດີ່ນ",
                href: "/admin/master-data/court-types",
                icon: MdCategory,
                isActive: false,
            },
        ],
    },

    // 2. ຈອງເດີ່ນ
    {
        name: "ຈອງເດີ່ນ",
        href: "/admin/booking",
        icon: BsCalendarCheck,
        isActive: false,
        children: [
            {
                name: "ຈອງເດີ່ນ",
                href: "/admin/booking/create",
                icon: BsCalendarCheck,
                isActive: false,
            },
            {
                name: "ຍົກເລີກການຈອງ",
                href: "/admin/booking/cancel",
                icon: BsCalendarX,
                isActive: false,
            },
            {
                name: "ຄ່າມັດຈຳເດີ່ນ",
                href: "/admin/booking/deposit",
                icon: BsCashCoin,
                isActive: false,
            },
            {
                name: "ບັນທຶກ",
                href: "/admin/booking/records",
                icon: BsFillBookmarkCheckFill,
                isActive: false,
            },
        ],
    },

    // 3. ແຈ້ງເຂົ້າ
    {
        name: "ແຈ້ງເຂົ້າ",
        href: "/admin/check-in",
        icon: FiLogIn,
        isActive: false,
        children: [
            {
                name: "ກວດສອບຂໍ້ມູນການຈອງ",
                href: "/admin/check-in/verify-booking",
                icon: FiCheckSquare,
                isActive: false,
            },
            {
                name: "ເປີດເດີ່ນ",
                href: "/admin/check-in/open-court",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ໃບຢືນຢັນການແຈ້ງເຂົ້າ",
                href: "/admin/check-in/confirmation",
                icon: BsFileEarmarkText,
                isActive: false,
            },
        ],
    },

    // 4. ແຈ້ງອອກ
    {
        name: "ແຈ້ງອອກ",
        href: "/admin/check-out",
        icon: FiLogOut,
        isActive: false,
        children: [
            {
                name: "ກວດສອບຂໍ້ມູນແຈ້ງເຂົ້າ",
                href: "/admin/check-out/verify-checkin",
                icon: FiCheckSquare,
                isActive: false,
            },
            {
                name: "ປິດເດີ່ນ",
                href: "/admin/check-out/close-court",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ພິມໃບບິນເເຈ້ງອອກ",
                href: "/admin/check-out/print-bill",
                icon: FiPrinter,
                isActive: false,
            },
        ],
    },

    // 5. ລາຍຮັບລາຍຈ່າຍ
    {
        name: "ລາຍຮັບລາຍຈ່າຍ",
        href: "/admin/finance",
        icon: RiMoneyDollarCircleLine,
        isActive: false,
        children: [
            {
                name: "ຊຳລະການຈອງເດີ່ນ",
                href: "/admin/finance/booking-payment",
                icon: RiBankCardLine,
                isActive: false,
            },
            {
                name: "ຊຳລະຄ່າເດີ່ນ",
                href: "/admin/finance/field-payment",
                icon: BsCashCoin,
                isActive: false,
            },
            {
                name: "ບັນທຶກການຈ່າຍເງິນ",
                href: "/admin/finance/payment-records",
                icon: RiFileList3Line,
                isActive: false,
            },
            {
                name: "ພິມໃບບິນລວມຍອດຊຳລະ",
                href: "/admin/finance/print-bill",
                icon: FiPrinter,
                isActive: false,
            },
        ],
    },

    // 6. ລາຍງານ
    {
        name: "ລາຍງານ",
        href: "/admin/reports",
        icon: TbReportAnalytics,
        isActive: false,
        children: [
            {
                name: "ລາຍງານຂໍ້ມູນພະນັກງານ",
                href: "/admin/reports/staffs",
                icon: MdPeopleAlt,
                isActive: false,
            },
            {
                name: "ລາຍງານຂໍ້ມູນເດີ່ນ",
                href: "/admin/reports/courts",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ລາຍງານການຈອງເດີ່ນ",
                href: "/admin/reports/bookings",
                icon: BsCalendarCheck,
                isActive: false,
            },
            {
                name: "ລາຍງານແຈ້ງເຂົ້າ",
                href: "/admin/reports/check-in",
                icon: FiLogIn,
                isActive: false,
            },
            {
                name: "ລາຍງານແຈ້ງອອກ",
                href: "/admin/reports/check-out",
                icon: FiLogOut,
                isActive: false,
            },
            {
                name: "ລາຍງານການຊຳລະເງິນ",
                href: "/admin/reports/payments",
                icon: TbReport,
                isActive: false,
            },
        ],
    },
];

export const ownerNavigations: NavItem[] = [
    {
        name: "ແຜງຄວບຄຸມ",
        href: "/admin/dashboard",
        icon: LucideLayoutDashboard ,
        isActive: false,
        children: [],
    },
    // 1. ຈັດການຂໍ້ມູນພື້ນຖານ
    {
        name: "ຈັດການຂໍ້ມູນພື້ນຖານ",
        href: "/admin/master-data",
        icon: MdManageAccounts,
        isActive: false,
        children: [
            {
                name: "ຈັດການຂໍ້ມູນພະນັກງານ",
                href: "/admin/master-data/staffs",
                icon: MdPeopleAlt,
                isActive: false,
            },
            // {
            //     name: "ຈັດການຂໍ້ມູນລູກຄ້າ",
            //     href: "/admin/master-data/customers",
            //     icon: MdPersonSearch,
            //     isActive: false,
            // },
            {
                name: "ຈັດການຂໍ້ມູນເຈົ້າຂອງເດີ່ນ",
                href: "/admin/master-data/court-owners",
                icon: MdManageAccounts,
                isActive: false,
            },
            {
                name: "ຈັດການຂໍ້ມູນເດີ່ນ",
                href: "/admin/master-data/courts",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ຈັດການຂໍ້ມູນປະເພດເດີ່ນ",
                href: "/admin/master-data/court-types",
                icon: MdCategory,
                isActive: false,
            },
        ],
    },
    // 6. ລາຍງານ
    {
        name: "ລາຍງານ",
        href: "/admin/reports",
        icon: TbReportAnalytics,
        isActive: false,
        children: [
            {
                name: "ລາຍງານຂໍ້ມູນພະນັກງານ",
                href: "/admin/reports/staffs",
                icon: MdPeopleAlt,
                isActive: false,
            },
            {
                name: "ລາຍງານຂໍ້ມູນເດີ່ນ",
                href: "/admin/reports/courts",
                icon: MdSportsSoccer,
                isActive: false,
            },
            {
                name: "ລາຍງານການຈອງເດີ່ນ",
                href: "/admin/reports/bookings",
                icon: BsCalendarCheck,
                isActive: false,
            },
            {
                name: "ລາຍງານແຈ້ງເຂົ້າ",
                href: "/admin/reports/check-in",
                icon: FiLogIn,
                isActive: false,
            },
            {
                name: "ລາຍງານແຈ້ງອອກ",
                href: "/admin/reports/check-out",
                icon: FiLogOut,
                isActive: false,
            },
            {
                name: "ລາຍງານການຊຳລະເງິນ",
                href: "/admin/reports/payments",
                icon: TbReport,
                isActive: false,
            },
        ],
    },
];