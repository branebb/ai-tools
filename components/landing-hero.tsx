"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";

const font = Roboto({
    weight: "500",
    subsets: ["latin"]
});

export const LandingHero = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className={cn("text-[#252422] font-bold py-40 text-center space-y-8", font.className)}>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-8 font-extrabold">
                <h1> Dobrodošao na mathos AI alati </h1>
                <div className="h-20 text-transparent bg-clip-text bg-[#0047BB]">
                    <TypewriterComponent options={{
                        strings: [
                            "Razgovoraj s mathos AI-em", "Generiraj slike", "Generiraj video", "Generiraj dio koda",
                            "Trajno spremi sve što želiš" 
                        ],
                        autoStart: true,
                        loop: true
                    }}/>
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-[#252422]">
                Istraži i koristi najnovije AI alate razvijene na mathosu
            </div>
            <div>
               <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="outline" className=" text-[#CED9E5] md:text-lg p-4 md:p-6 rounded-full font-semibold bg-[#0047BB] hover:text-hover:text-[#252422]">
                    Započni s radom 
                </Button>
               </Link>
            </div>
            <div className="text-[#252422] text-cs md:text-sm font-normal">
                Sve što ti je potrebno je Google ili mathos račun
            </div>
        </div>
    )
}