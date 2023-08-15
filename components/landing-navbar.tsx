"use client";

import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Roboto({
    weight: "500",
    subsets: ["latin"]
});

export const LandingNavbar = () => {

    const { isSignedIn } = useAuth();

    return (
        <nav className={cn("p-4 bg-transparent flex items-center justify-between", font.className)}>
            <Link href="/" className="flex items-center">
                <div className="relative h-12 w-12 mr-6">
                    <Image fill alt="Logo" src="/mathos logo transparent.png" />
                </div>
                <h1 className="text-4xl font-bold text-[#252422]">
                    mathos AI alati
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]">
                        Započni istraživati
                    </Button>
                </Link>
            </div>
        </nav>
    )

}