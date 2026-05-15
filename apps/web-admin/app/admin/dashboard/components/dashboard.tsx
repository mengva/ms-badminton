"use client";

import {
    MdSportsSoccer,
    MdPeopleAlt,
    MdTrendingUp,
    MdTrendingDown,
} from "react-icons/md";
import {
    BsCalendarCheck,
    BsCashCoin,
    BsCalendarX,
    BsThreeDotsVertical,
} from "react-icons/bs";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

// ─────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────
const revenueData = [
    { month: "ມ.ກ",  revenue: 12400000, bookings: 38 },
    { month: "ກ.ພ",  revenue: 18200000, bookings: 52 },
    { month: "ມີ.ນ", revenue: 15800000, bookings: 45 },
    { month: "ເມ.ສ", revenue: 22100000, bookings: 63 },
    { month: "ພ.ພ",  revenue: 19600000, bookings: 57 },
    { month: "ມິ.ຖ", revenue: 27400000, bookings: 78 },
    { month: "ກ.ລ",  revenue: 31200000, bookings: 89 },
];

const courtStatusData = [
    { name: "ວ່າງ",      value: 4, color: "#22c55e" },
    { name: "ກຳລັງໃຊ້",  value: 7, color: "#7c6cff" },
    { name: "ຈອງແລ້ວ",   value: 3, color: "#f59e0b" },
    { name: "ປິດ",        value: 2, color: "#6b6590" },
];

const recentBookings = [
    { id: "BK-0091", customer: "ທ. ສົມສີ", court: "ເດີ່ນ A1", time: "08:00 - 10:00", status: "confirmed", amount: 120000 },
    { id: "BK-0090", customer: "ນ. ແກ້ວ",  court: "ເດີ່ນ B2", time: "10:00 - 12:00", status: "checked-in", amount: 100000 },
    { id: "BK-0089", customer: "ທ. ວິໄລ",  court: "ເດີ່ນ A2", time: "13:00 - 15:00", status: "pending", amount: 120000 },
    { id: "BK-0088", customer: "ນ. ມາລີ",  court: "ເດີ່ນ C1", time: "15:00 - 17:00", status: "cancelled", amount: 80000 },
    { id: "BK-0087", customer: "ທ. ບຸນທອງ", court: "ເດີ່ນ B1", time: "17:00 - 19:00", status: "confirmed", amount: 100000 },
];

const recentActivity = [
    { icon: FiLogIn,  label: "ແຈ້ງເຂົ້າ",   name: "ທ. ສົມສີ",   court: "ເດີ່ນ A1", time: "2 ນທ ກ່ອນ",  color: "#22c55e" },
    { icon: BsCalendarCheck, label: "ຈອງ", name: "ນ. ແກ້ວ",   court: "ເດີ່ນ B2", time: "15 ນທ ກ່ອນ", color: "#7c6cff" },
    { icon: FiLogOut, label: "ແຈ້ງອອກ",    name: "ທ. ວິໄລ",   court: "ເດີ່ນ A2", time: "1 ຊມ ກ່ອນ",  color: "#f59e0b" },
    { icon: BsCalendarX, label: "ຍົກເລີກ", name: "ນ. ມາລີ",   court: "ເດີ່ນ C1", time: "2 ຊມ ກ່ອນ",  color: "#ef4444" },
    { icon: BsCashCoin, label: "ຊຳລະ",     name: "ທ. ບຸນທອງ", court: "ເດີ່ນ B1", time: "3 ຊມ ກ່ອນ",  color: "#06b6d4" },
];

// ─────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────
type StatCardProps = {
    title: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    trend: number;
    accent: string;
    delay?: string;
};

function StatCard({ title, value, sub, icon: Icon, trend, accent, delay = "0ms" }: StatCardProps) {
    const up = trend >= 0;
    return (
        <Card
            className="relative overflow-hidden border-white/[0.07] bg-white/[0.03] backdrop-blur-sm animate-fade-up"
            style={{ animationDelay: delay }}
        >
            {/* Accent glow */}
            <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{ background: accent }}
            />
            {/* Top accent bar */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] rounded-t" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b6590]">{title}</p>
                        <p className="mt-1.5 text-[26px] font-bold leading-none tracking-tight text-[#e8e4ff]">{value}</p>
                        <p className="mt-1.5 text-[12px] text-[#6b6590]">{sub}</p>
                    </div>
                    <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: `${accent}22`, border: `1px solid ${accent}33` }}
                    >
                        <Icon className="h-5 w-5" style={{ color: accent }} />
                    </span>
                </div>

                {/* Trend */}
                <div className="mt-4 flex items-center gap-1.5">
                    {up ? (
                        <MdTrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                        <MdTrendingDown className="h-3.5 w-3.5 text-red-400" />
                    )}
                    <span className={cn("text-[12px] font-medium", up ? "text-emerald-400" : "text-red-400")}>
                        {up ? "+" : ""}{trend}%
                    </span>
                    <span className="text-[12px] text-[#6b6590]">ຈາກເດືອນກ່ອນ</span>
                </div>
            </CardContent>
        </Card>
    );
}

// ─────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; class: string }> = {
    confirmed:  { label: "ຢືນຢັນ",    class: "bg-[#7c6cff]/20 text-[#b8aaff] border-[#7c6cff]/30" },
    "checked-in": { label: "ເຂົ້າແລ້ວ", class: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
    pending:    { label: "ລໍຖ້າ",     class: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
    cancelled:  { label: "ຍົກເລີກ",   class: "bg-red-500/15 text-red-400 border-red-500/25" },
};

// ─────────────────────────────────────────
// Custom tooltip for chart
// ─────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-white/[0.08] bg-[#131525] px-4 py-3 shadow-xl">
            <p className="mb-1.5 text-[12px] font-medium text-[#c4b8ff]">{label}</p>
            {payload.map((p: any) => (
                <p key={p.name} className="text-[12px] text-[#8a85a8]">
                    {p.name === "revenue"
                        ? `ລາຍຮັບ: ${(p.value / 1000000).toFixed(1)}M ກີບ`
                        : `ການຈອງ: ${p.value} ຄັ້ງ`}
                </p>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────
// Dashboard Page
// ─────────────────────────────────────────
export default function DashboardPage() {
    const today = new Date().toLocaleDateString("lo-LA", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    return (
        <div className="min-h-screen bg-[#0d0f1a] px-6 py-6">

            {/* ── Page header ── */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1
                        className="text-[24px] font-bold tracking-tight text-[#e8e4ff]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        ແຜງຄວບຄຸມ
                    </h1>
                    <p className="mt-0.5 text-[13px] text-[#6b6590]">{today}</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[8px] border-white/[0.1] bg-white/[0.04] text-[12px] text-[#a096c8] hover:bg-white/[0.08] hover:text-[#c4b8ff]"
                    >
                        <BsCalendarCheck className="mr-1.5 h-3.5 w-3.5" />
                        ສະຫຼຸບເດືອນນີ້
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-[8px] bg-gradient-to-r from-[#7c6cff] to-[#b06cff] text-[12px] font-medium text-white border-0 hover:opacity-90"
                    >
                        <BsCalendarCheck className="mr-1.5 h-3.5 w-3.5" />
                        ຈອງເດີ່ນ
                    </Button>
                </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard
                    title="ລາຍຮັບທັງໝົດ"
                    value="31.2M"
                    sub="ກີບ ເດືອນນີ້"
                    icon={RiMoneyDollarCircleLine}
                    trend={14.2}
                    accent="#7c6cff"
                    delay="0ms"
                />
                <StatCard
                    title="ການຈອງ"
                    value="89"
                    sub="ຄັ້ງ ເດືອນນີ້"
                    icon={BsCalendarCheck}
                    trend={12.5}
                    accent="#06b6d4"
                    delay="60ms"
                />
                <StatCard
                    title="ເດີ່ນທັງໝົດ"
                    value="16"
                    sub="7 ກຳລັງໃຊ້ງານ"
                    icon={MdSportsSoccer}
                    trend={0}
                    accent="#f59e0b"
                    delay="120ms"
                />
                <StatCard
                    title="ພະນັກງານ"
                    value="12"
                    sub="ຄົນ"
                    icon={MdPeopleAlt}
                    trend={8.3}
                    accent="#22c55e"
                    delay="180ms"
                />
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                {/* Revenue chart — spans 2 cols */}
                <Card className="xl:col-span-2 border-white/[0.07] bg-white/[0.03]">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.07] px-5 py-4">
                        <div>
                            <CardTitle className="text-[14px] font-semibold text-[#c4b8ff]">
                                ລາຍຮັບ ແລະ ການຈອງ
                            </CardTitle>
                            <p className="mt-0.5 text-[11px] text-[#6b6590]">7 ເດືອນຜ່ານມາ</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px]">
                            <span className="flex items-center gap-1.5 text-[#6b6590]">
                                <span className="h-2 w-2 rounded-full bg-[#7c6cff]" /> ລາຍຮັບ
                            </span>
                            <span className="flex items-center gap-1.5 text-[#6b6590]">
                                <span className="h-2 w-2 rounded-full bg-[#06b6d4]" /> ການຈອງ
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-5">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor="#7c6cff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7c6cff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="bkGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 11, fill: "#6b6590" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis hide />
                                <Tooltip content={<ChartTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#7c6cff"
                                    strokeWidth={2}
                                    fill="url(#revGrad)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#06b6d4"
                                    strokeWidth={2}
                                    fill="url(#bkGrad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Court status */}
                <Card className="border-white/[0.07] bg-white/[0.03]">
                    <CardHeader className="border-b border-white/[0.07] px-5 py-4">
                        <CardTitle className="text-[14px] font-semibold text-[#c4b8ff]">
                            ສະຖານະເດີ່ນ
                        </CardTitle>
                        <p className="mt-0.5 text-[11px] text-[#6b6590]">ທັງໝົດ 16 ເດີ່ນ</p>
                    </CardHeader>
                    <CardContent className="p-5">
                        {/* Bar chart */}
                        <ResponsiveContainer width="100%" height={100}>
                            <BarChart data={courtStatusData} barSize={28}>
                                <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                                    {courtStatusData.map((entry, i) => (
                                        <rect key={i} fill={entry.color} />
                                    ))}
                                </Bar>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10, fill: "#6b6590" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                                    content={({ active, payload }) =>
                                        active && payload?.length ? (
                                            <div className="rounded-lg border border-white/[0.08] bg-[#131525] px-3 py-2 text-[12px] text-[#c4b8ff]">
                                                {payload[0].payload.name}: {payload[0].value} ເດີ່ນ
                                            </div>
                                        ) : null
                                    }
                                />
                            </BarChart>
                        </ResponsiveContainer>

                        {/* Legend */}
                        <div className="mt-4 space-y-2.5">
                            {courtStatusData.map((s) => (
                                <div key={s.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                                        <span className="text-[12.5px] text-[#8a85a8]">{s.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.06]">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${(s.value / 16) * 100}%`, background: s.color }}
                                            />
                                        </div>
                                        <span className="w-4 text-right text-[12px] font-medium text-[#c4b8ff]">{s.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Bottom grid ── */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">

                {/* Recent bookings table — 2 cols */}
                <Card className="xl:col-span-2 border-white/[0.07] bg-white/[0.03]">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.07] px-5 py-4">
                        <CardTitle className="text-[14px] font-semibold text-[#c4b8ff]">
                            ການຈອງລ່າສຸດ
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-[7px] px-3 text-[11px] text-[#6b6590] hover:bg-white/[0.05] hover:text-[#a096c8]"
                        >
                            ເບິ່ງທັງໝົດ →
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.04]">
                                    {["ID", "ລູກຄ້າ", "ເດີ່ນ", "ເວລາ", "ຈຳນວນ", "ສະຖານະ"].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left text-[10.5px] font-medium uppercase tracking-[0.07em] text-[#6b6590]">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b, i) => (
                                    <tr
                                        key={b.id}
                                        className={cn(
                                            "border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]",
                                            i === recentBookings.length - 1 && "border-0"
                                        )}
                                    >
                                        <td className="px-5 py-3.5 text-[12px] font-medium text-[#7c6cff]">{b.id}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="bg-[#7c6cff]/20 text-[9px] text-[#9d8fff]">
                                                        {b.customer.slice(-2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-[12.5px] text-[#c4b8ff]">{b.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-[12px] text-[#8a85a8]">{b.court}</td>
                                        <td className="px-5 py-3.5 text-[12px] text-[#8a85a8]">{b.time}</td>
                                        <td className="px-5 py-3.5 text-[12px] font-medium text-[#c4b8ff]">
                                            {b.amount.toLocaleString()} ກີບ
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Badge
                                                className={cn(
                                                    "rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium",
                                                    STATUS_MAP[b.status]?.class
                                                )}
                                            >
                                                {STATUS_MAP[b.status]?.label}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Recent activity */}
                <Card className="border-white/[0.07] bg-white/[0.03]">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.07] px-5 py-4">
                        <CardTitle className="text-[14px] font-semibold text-[#c4b8ff]">
                            ກິດຈະກຳລ່າສຸດ
                        </CardTitle>
                        <BsThreeDotsVertical className="h-4 w-4 text-[#6b6590]" />
                    </CardHeader>
                    <CardContent className="divide-y divide-white/[0.04] p-0">
                        {recentActivity.map((a, i) => {
                            const Icon = a.icon;
                            return (
                                <div key={i} className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]">
                                    {/* Icon bubble */}
                                    <span
                                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                        style={{ background: `${a.color}22`, border: `1px solid ${a.color}33` }}
                                    >
                                        <Icon className="h-3.5 w-3.5" style={{ color: a.color }} />
                                    </span>

                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-[12.5px] text-[#c4b8ff]">
                                            <span className="font-medium">{a.name}</span>
                                            <span className="text-[#6b6590]"> · {a.label}</span>
                                        </p>
                                        <p className="mt-0.5 text-[11.5px] text-[#6b6590]">{a.court}</p>
                                    </div>

                                    <span className="shrink-0 text-[11px] text-[#4a4660]">{a.time}</span>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}