'use client';

import { Button } from "@workspace/ui/components/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface ExportButtonProps {
    onExport: () => void | Promise<void>;
    title?: string;
    className?: string;
}

export function ExportButton({
    onExport,
    title = "ສ່ງອອກ Excel",
    className,
}: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await onExport();
        } catch (error) {
            console.error("Export failed:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Button
            onClick={handleExport}
            disabled={isExporting}
            className={className}
        >
            {isExporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Download className="mr-2 h-4 w-4" />
            )}
            {isExporting ? "ກຳລັງສ່ງອອກ..." : title}
        </Button>
    );
}