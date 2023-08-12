"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { MessageSquare, ImageIcon, VideoIcon, Music, HistoryIcon, Code, ArrowRight } from "lucide-react"

const tools = [
  {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      bgColor: "bg-violet-500/10",
      color: "text-yellow-500",
  },

  {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      bgColor: "bg-violet-500/10",
      color: "text-red-500",
  },

  {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      bgColor: "bg-violet-500/10",
      color: "text-sky-500",
  },

  {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      bgColor: "bg-violet-500/10",
      color: "text-orange-500",
  },

  {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      bgColor: "bg-violet-500/10",
      color: "text-emerald-500",
  },

  {
      label: "Saved",
      icon: HistoryIcon,
      href: "/saved",
      bgColor: "bg-violet-500/10",
      color: "text-green-500",
  }
];


const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">naslov</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          opis
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)}
          key={tool.href} 
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;