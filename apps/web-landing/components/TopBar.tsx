"use client";

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@workspace/ui/components/navigation-menu';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import { LogIn, LogOut, Menu, Monitor, Moon, Settings, Sun, User } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { usePathname } from 'next/navigation';
import { navigations } from '@/utils/pagination';
import ImageLogo from "../public/images/MS.badmintion_logo.png";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function TopBar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Prevent hydration mismatch
        return null;
    }

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname?.startsWith(href);
    };

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-full flex justify-center items-center gap-2">
                                <Image src={ImageLogo} alt="Logo" width={65} height={65} />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="space-x-8 flex items-center">
                            {navigations.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <div key={item.href}>
                                        <Link href={item.href} passHref>
                                            <div
                                                className={`text-sm font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-md
                                                            ${active
                                                        ? 'text-primary bg-primary/10'
                                                        : 'hover:text-primary hover:bg-accent'
                                                    }`}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    {theme === "dark" ? (
                                        <Moon className="h-5 w-5" />
                                    ) : theme === "light" ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Monitor className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">Theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                                    <Sun className="mr-2 h-4 w-4" />
                                    <span>ກາງເວັນ</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                                    <Moon className="mr-2 h-4 w-4" />
                                    <span>ກາງຄືນ</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                                    <Monitor className="mr-2 h-4 w-4" />
                                    <span>ລະບົບ</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">User</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>ໂປຣໄຟລ໌ຜູ້ໃຊ້</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/auth/signin" className="flex items-center gap-2">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        <span>ເຂົ້າສູ່ລະບົບ</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowSignOutDialog(true)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>ອອກຈາກລະບົບ</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <Dialog open={showSignOutDialog} onOpenChange={(open) => setShowSignOutDialog(open)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>ຢືນຢັນອອກຈາກລະບົບ</DialogTitle>
                        <DialogDescription>ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກແຜງຄວບຄຸມ</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowSignOutDialog(false)}
                            className="cursor-pointer"
                        >
                            ຍົກເລີກ
                        </Button>
                        <Button
                            variant="destructive"
                            className="cursor-pointer"
                        >
                            ຢືນຢັນ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </nav>


    );
}