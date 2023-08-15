"use client";

import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessagesSquare, Joystick, ImagePlus, Clapperboard, Disc3Icon, Code2, Download } from "lucide-react"
import { usePathname } from "next/navigation";

const roboto = Roboto({ weight: "400", subsets: ["latin"] })

const routes = [
    {
        label: "Upravljačka ploča",
        icon: Joystick,
        href: "/dashboard",
        color: "text-[#F95738]",
    },

    {
        label: "Razgovor",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-[#EC368D]",
    },

    {
        label: "Generiranje slika",
        icon: ImagePlus,
        href: "/image",
        color: "text-[#FFE66D]",
    },

    {
        label: "Generiranje videa",
        icon: Clapperboard,
        href: "/video",
        color: "text-[#A0C1D1]",
    },
  
    {
        label: "Generiranje glazbe",
        icon: Disc3Icon,
        href: "/music",
        color: "text-[#EEF5DB]",
    },
  
    {
        label: "Generiranje koda",
        icon: Code2,
        href: "/code",
        color: "text-[#F7C4A5]",
    },

    {
        label: "Spremljeno",
        icon: Download,
        href: "/saved",
        color: "text-[#06D6A0]",
    },

];

const Sidebar = () => {
    
    const pathname = usePathname();

    return (
        <div className={cn("space-y-4 py-4 flex flex-col h-full bg-[#0047BB] text-white", roboto.className)}>
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/mathos logo transparent.png" />
                    </div>
                    <h1 className="text-2xl font-bold"> mathos AI alati </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#CED9E5]/10 rounded-lg transition", 
                        pathname === route.href ? "text-white bg-[#CED9E5]/10" : "text-[#CED9E5]")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-7 w-7 mr-4", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;