// app/not-found.tsx
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

export default function NotFound() {
    return (
        <div className="min-h-screen from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-5xl! font-bold text-primary">404</span>
                    </div>
                    <CardTitle className="text-3xl! font-bold">ບໍ່ພົບໜ້າເວັບ</CardTitle>
                    <CardDescription className="text-base">
                        ຂໍອະໄພ, ພວກເຮົາບໍ່ສາມາດຊອກຫາໜ້າເວັບທີ່ທ່ານກຳລັງຊອກຫາໄດ້.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild className="flex-1">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                ກັບໄປທີ່ໜ້າຫຼັກ
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                ກັບຄືນ
                            </Link>
                        </Button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        ຫຼື ການຄົ້ນຫາສິ່ງທີ່ທ່ານຕ້ອງການ.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}