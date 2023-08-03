"use client";

import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, HistoryIcon, Code, Settings } from "lucide-react"

const lora = Lora({ weight: "600", subsets: ["latin"] })

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },

    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-yellow-500",
    },

    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-500",
    },

    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-sky-500",
    },

    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-orange-500",
    },

    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-emerald-500",
    },

    {
        label: "History",
        icon: HistoryIcon,
        href: "/history",
        color: "text-green-500",
    },

    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#0047BB] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/mathos logo transparent.png" />
                    </div>
                    <h1 className={cn("text-2xl font-bold", lora.className)}>Mathos AI</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href}
                            key={route.href}
                            className="text-sm group flex p-3 w-full 
                        justify-start font-medium cursor-pointer hover:text-white hover:bg-[#CED9E5]/10
                        rounded-lg transition">
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