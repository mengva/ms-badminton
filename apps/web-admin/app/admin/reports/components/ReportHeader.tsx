'use client';

import { DateRangePicker } from "./DateRangePicker";
import { ExportButton } from "./ExportButton";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface ReportHeaderProps {
    title: string;
    onExport: () => void | Promise<void>;
}

export default function ReportHeader({
    title,
    onExport,
}: ReportHeaderProps) {
    const [date, setDate] = useState<DateRange | undefined>();

    return (
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground mt-1">
                    ລາຍງານຂໍ້ມູນແລະສາມາດສ່ງອອກໄດ້
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <DateRangePicker date={date} setDate={setDate} />
                <ExportButton onExport={onExport} />
            </div>
        </div>
    );
}