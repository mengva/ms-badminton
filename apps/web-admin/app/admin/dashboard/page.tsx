"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";

import { Button } from "@workspace/ui/components/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

import {
  MdPeopleAlt,
  MdSportsSoccer,
} from "react-icons/md";

import {
  BsCalendarCheck,
  BsCashCoin,
} from "react-icons/bs";

import {
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

import {
  DollarSign,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";

// ==================== MOCK DATA ====================

const dashboardCards = [
  {
    title: "ລູກຄ້າທັງໝົດ",
    value: "12",
    icon: Users,
    description: "ລູກຄ້າທີ່ໄດ້ລົງທະບຽນ",
  },
  {
    title: "ພະນັກງານທັງໝົດ",
    value: "2",
    icon: Users,
    description: "ພະນັກງານທີ່ໄດ້ລົງທະບຽນ",
  },
  {
    title: "ການຈອງເດິ່ນ",
    value: "4",
    icon: BsCalendarCheck,
    description: "ການຈອງມື້ນີ້",
  },
  {
    title: "ລາຍຮັບ",
    value: "450,000 ກີບ",
    icon: DollarSign,
    description: "ລາຍຮັບມື້ນີ້",
  },
  {
    title: "ເດິ່ນທີ່ໃຊ້ງານ",
    value: "12",
    icon: MdSportsSoccer,
    description: "ມີເດິ່ນ",
  },
  {
    title: "ເເຈ້ງເຂົ້າ",
    value: "4",
    icon: FiLogIn,
    description: "ເເຈ້ງເຂົ້າມື້ນີ້",
  },
  {
    title: "ເເຈ້ງອອກ",
    value: "4",
    icon: FiLogOut,
    description: "ເເຈ້ງອອກມື້ນີ້",
  },
];

const recentBookings = [
  {
    id: "BK001",
    customer: "ຈອນ ໂດ",
    court: "ເດີ່ນ A",
    time: "08:00 AM",
    status: "ສຳເລັດແລ້ວ",
  },
  {
    id: "BK002",
    customer: "ເດວິດ",
    court: "ເດີ່ນ B",
    time: "09:30 AM",
    status: "ລໍຖ້າການອະນຸມັດ",
  },
  {
    id: "BK003",
    customer: "ອາເລັກ",
    court: "ເດີ່ນ C",
    time: "10:00 AM",
    status: "ສຳເລັດແລ້ວ",
  },
];

// ==================== PAGE ====================

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ==================== HEADER ==================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            ແຜງຄວບຄຸມ
          </h1>

          <p className="text-muted-foreground">
            ຍິນດີຕ້ອນຮັບກັບຄືນສູ່ລະບົບການຈັດການ MS.Badminton
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* <Button asChild>
            <Link href="/admin/booking/create">
              ສ້າງການຈອງ
            </Link>
          </Button> */}

          <Button
            variant="outline"
            asChild
          >
            <Link href="/admin/reports/bookings">
              ເບິ່ງລາຍງານການຈອງ
            </Link>
          </Button>
        </div>
      </div>

      {/* ==================== STATISTICS ==================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {dashboardCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {item.value}
                    </h2>

                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ==================== CONTENT ==================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT SIDE */}

        <div className="xl:col-span-2 space-y-6">
          {/* Recent Bookings */}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    ການຈອງທີ່ຜ່ານມາ
                  </CardTitle>

                  <CardDescription>
                    ການຈອງຂອງລູກຄ້າລ່າສຸດ
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href="/admin/booking/records">
                    ເບິ່ງທັງໝົດ
                  </Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                     ລະຫັດການຈອງ
                    </TableHead>

                    <TableHead>
                      ລູກຄ້າ
                    </TableHead>

                    <TableHead>
                      ເດີ່ນ
                    </TableHead>

                    <TableHead>
                      ເວລາ
                    </TableHead>

                    <TableHead>
                      ສະຖານະ
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.id}
                      </TableCell>

                      <TableCell>
                        {booking.customer}
                      </TableCell>

                      <TableCell>
                        {booking.court}
                      </TableCell>

                      <TableCell>
                        {booking.time}
                      </TableCell>

                      <TableCell>
                        <div className="inline-flex items-center rounded-full border px-2 py-1 text-xs">
                          {booking.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Activity */}

          <Card>
            <CardHeader>
              <CardTitle>
                ການດຳເນີນງານຂອງລະບົບ
              </CardTitle>

              <CardDescription>
                ການດຳເນີນງານທີ່ໃຫ້ສົມຄວນໃນລະບົບ
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FiLogIn className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-medium">
                    ລູກຄ້າເຊັກອິນ
                  </p>

                  <p className="text-sm text-muted-foreground">
                    ເດີ່ນ A - 08:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FiLogOut className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-medium">
                    ລູກຄ້າເຊັກເອົ້າແລ້ວ
                  </p>

                  <p className="text-sm text-muted-foreground">
                    ເດີ່ນ B - 09:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BsCashCoin className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-medium">
                    ໄດ້ຮັບເງິນແລ້ວ
                  </p>

                  <p className="text-sm text-muted-foreground">
                    ການຈອງ BK003
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {/* Quick Actions */}

          <Card>
            <CardHeader>
              <CardTitle>
                ການກະທຳດ່ວນ
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3">
              <Button
                className="justify-start"
                asChild
              >
                <Link href="/admin/booking/create">
                  <BsCalendarCheck className="mr-2 size-4" />
                  ການຈອງ
                </Link>
              </Button>

              <Button
                variant="outline"
                className="justify-start"
                asChild
              >
                <Link href="/admin/check-in/open-court">
                  <FiLogIn className="mr-2 size-4" />
                  ເປີດເດິ່ນ
                </Link>
              </Button>

              <Button
                variant="outline"
                className="justify-start"
                asChild
              >
                <Link href="/admin/check-out/close-court">
                  <FiLogOut className="mr-2 size-4" />
                  ປິດເດິ່ນ
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}

          <Card>
            <CardHeader>
              <CardTitle>
                ຄຳນວນ
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-primary" />

                  <span className="text-sm">
                    ການຈອງທີ່ໃຊ້ງານ
                  </span>
                </div>

                <span className="font-bold">
                  24
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />

                  <span className="text-sm">
                    ການເຕີບໂຕຂອງລາຍຮັບ
                  </span>
                </div>

                <span className="font-bold">
                  +18%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MdPeopleAlt className="size-4 text-primary" />

                  <span className="text-sm">
                    ລູກຄ້າໃໝ່
                  </span>
                </div>

                <span className="font-bold">
                  12
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}