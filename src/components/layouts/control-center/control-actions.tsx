"use client"

import {
  AirdropIcon,
  AirpodsIcon,
  KeyboardLightIcon,
  MoonIcon,
  TvIcon,
  WifiIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { Bluetooth } from "lucide-react"
import { useState } from "react"

const CONTROL_ACTIONS = [
  {
    iconDefault: <WifiIcon className="text-white size-4" />,
    iconActive: <WifiIcon className="text-white size-4" />,
    title: "Wi-Fi",
    off: "Disconnected",
    on: "kinhdev24",
    defaultActive: true,
  },
  {
    iconDefault: <Bluetooth className="text-white size-4" />,
    iconActive: <AirpodsIcon className="text-white size-4" />,
    title: "Bluetooth",
    off: "Off",
    on: "Airpods’s",
    defaultActive: true,
  },
  {
    iconDefault: <AirdropIcon className="text-white size-4" />,
    iconActive: <AirdropIcon className="text-white size-4" />,
    title: "AirDrop",
    off: "Off",
    on: "Kinh's Iphone",
    defaultActive: false,
  },
  {
    iconDefault: <MoonIcon className="text-white size-4" />,
    iconActive: <MoonIcon className="text-white size-4" />,
    title: "Do not Disturb",
    defaultActive: false,
  },
  {
    iconDefault: <KeyboardLightIcon className="text-white size-4" />,
    iconActive: <KeyboardLightIcon className="text-white size-4" />,
    title: "Keyboard Brightness",
    defaultActive: false,
  },
  {
    iconDefault: <TvIcon className="text-white size-4" />,
    iconActive: <TvIcon className="text-white size-4" />,
    title: "Apple TV",
    off: "Off",
    on: "Kinh's TV",
    defaultActive: false,
  },
]

type ControlActionItemProps = {
  iconDefault: React.ReactNode
  iconActive: React.ReactNode
  title: string
  off?: string
  on?: string
  defaultActive: boolean
}

export default function ControlActions() {
  return (
    <div className="grid grid-cols-3 gap-[10px]">
      {CONTROL_ACTIONS.map((action) => (
        <ControlActionItem key={action.title} {...action} />
      ))}
    </div>
  )
}

const ControlActionItem = ({
  iconDefault,
  iconActive,
  title,
  off,
  on,
  defaultActive,
}: ControlActionItemProps) => {
  const [active, setActive] = useState(defaultActive)

  return (
    <div
      className={cn(
        "w-full h-[100px] rounded-[10px] bg-white/10 p-[10px] shadow-2xl py-[14px] px-[10px] transition-colors cursor-pointer"
      )}
      onClick={() => setActive((prev) => !prev)}
    >
      <div
        className={cn(
          "flex items-center justify-center size-[26px] rounded-full transition-colors duration-300",
          active ? "bg-blue-500" : "bg-white/30 hover:bg-white/20"
        )}
      >
        {active ? iconActive : iconDefault}
      </div>
      <div className="flex flex-col gap-[2px] mt-[10px]">
        <p
          className={cn("text-sm font-semibold", !off && !on ? "" : "truncate")}
        >
          {title}
        </p>
        <p className="text-xs text-white/50 font-medium truncate">
          {active ? on : off}
        </p>
      </div>
    </div>
  )
}
