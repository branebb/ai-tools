"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowRight, MessagesSquare, ImagePlus, Clapperboard, Disc3Icon, Code2, Download, Joystick } from "lucide-react"

const tools = [
  {
      label: "Razgovor",
      icon: MessagesSquare,
      href: "/conversation",
      bgColor: "bg-[#0047BB]",
      color: "text-[#EC368D]",
  },

  {
      label: "Generiranje slika",
      icon: ImagePlus,
      href: "/image",
      bgColor: "bg-[#0047BB]",
      color: "text-[#FFE66D]",
  },

  {
      label: "Generiranje videa",
      icon: Clapperboard,
      href: "/video",
      bgColor: "bg-[#0047BB]",
      color: "text-[#A0C1D1]",
  },

  {
      label: "Generiranje glazbe",
      icon: Disc3Icon,
      href: "/music",
      bgColor: "bg-[#0047BB]",
      color: "text-[#EEF5DB]",
  },

  {
      label: "Generiranje koda",
      icon: Code2,
      href: "/code",
      bgColor: "bg-[#0047BB]",
      color: "text-[#F7C4A5]",
  },

  {
      label: "Spremljeno",
      icon: Download,
      href: "/saved",
      bgColor: "bg-[#0047BB]",
      color: "text-[#06D6A0]",
  }
];


const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#252422]">Upravljačka ploča</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center text-[#252422]">
          Istraži sve mogućnosti
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)}
          key={tool.href} 
          className="p-3 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-10 h-10", tool.color)} />
              </div>
              <div className="font-semibold text-[#252422] text-lg">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-8 h-8"/>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;