"use client"

import { ShutDownIcon } from "@/components/icons/shut-down"
import { BlurImage } from "@/components/ui/blur-image"
import { Separator } from "@/components/ui/separator"
import { useGlobalStore } from "@/stores/global"
import { ChevronRight } from "lucide-react"
import { useShallow } from "zustand/shallow"

export default function UserProfile() {
  const setIsControlCenterOpen = useGlobalStore(
    useShallow((state) => state.setIsControlCenterOpen)
  )

  return (
    <div className="w-full rounded-[10px] bg-white/10 p-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-white/20 p-[2px]">
          <BlurImage
            src="/images/emoji-avatar.webp"
            alt="user-profile"
            width={500}
            height={500}
            className="rounded-full"
          />
        </div>

        <div>
          <p className="text-sm font-semibold">Kinh Bach</p>
          <p className="text-xs text-white/50 font-medium">
            kinhdev24@gmail.com
          </p>
        </div>
      </div>

      <div className="p-[10px] rounded-[10px] gap-3 bg-white/10 shadow-2xl flex items-center justify-center">
        <ShutDownIcon className="text-white size-4 hover:text-white/50 transition-colors" />
        <Separator orientation="vertical" className="min-h-5" />
        <ChevronRight
          className="text-white size-6 hover:text-white/50 transition-colors"
          onClick={() => setIsControlCenterOpen(false)}
        />
      </div>
    </div>
  )
}
