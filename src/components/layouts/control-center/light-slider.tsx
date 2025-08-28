"use client"

import { LightIcon, VolumeIcon } from "@/components/icons"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { TvMinimal } from "lucide-react"
import { useState } from "react"

export function LightSlider() {
  const [active, setActive] = useState(false)

  return (
    <div className="w-full rounded-[10px] bg-white/10 p-3 shadow-md flex items-center justify-between gap-3">
      <div className="flex-1 relative">
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={cn("w-full")}
        />
        <div className="absolute top-1 left-2">
          <LightIcon className="text-gray-900 size-4 opacity-30" />
        </div>
      </div>
      <div
        onClick={() => setActive((prev) => !prev)}
        className={cn(
          "flex items-center justify-center size-[26px] rounded-full transition-colors duration-300",
          active ? "bg-blue-500" : "bg-white/30 hover:bg-white/20"
        )}
      >
        <TvMinimal className="text-white size-4" />
      </div>
    </div>
  )
}
