import { ChevronUp, MessageSquare, Volume2, Wifi } from "lucide-react"
import React from "react"
import { IoIosSearch } from "react-icons/io"
import { LiaBatteryThreeQuartersSolid } from "react-icons/lia"
import AppTooltip from "../common/app-tooltip"
import { BlurImage } from "../ui/blur-image"
import { WindowButton } from "../ui/button"
import { Input } from "../ui/input"
import { ClockRealTime } from "./clock"
import { StartMenu } from "./start-menu"

const TASKBAR_HEIGHT = "40px"

export default function Taskbar() {
  return (
    <div
      className="bg-zinc-900/60 backdrop-blur-sm h-[var(--taskbar-height)] shadow text-white overflow-hidden flex items-center justify-between"
      style={
        {
          "--taskbar-height": TASKBAR_HEIGHT,
        } as React.CSSProperties
      }
    >
      <div className="flex h-full">
        <AppTooltip content="Start">
          <StartMenu>
            <WindowButton className="min-w-12">
              <BlurImage
                src="/window-logo.png"
                alt="window logo"
                width={25}
                height={25}
              />
            </WindowButton>
          </StartMenu>
        </AppTooltip>

        <div className="relative w-[320px]">
          <div className="absolute h-full left-3 text-black flex items-center justify-center">
            <IoIosSearch size={20} className="rotate-90" />
          </div>
          <Input
            className="text-base h-full pl-10 focus-visible:ring-indigo-600 rounded-none bg-white text-black placeholder:text-black"
            placeholder="Type here to search"
          />
        </div>

        <AppTooltip content="Cortana">
          <WindowButton className="min-w-12">
            <div className="size-3 bg-transparent rounded-full outline-4 outline-white"></div>
          </WindowButton>
        </AppTooltip>

        <AppTooltip content="Task View">
          <WindowButton className="min-w-12">
            <BlurImage
              src="/window-icons/task-view.svg"
              alt="window logo"
              width={20}
              height={20}
            />
          </WindowButton>
        </AppTooltip>

        <AppTooltip content="File Explorer">
          <WindowButton active className="min-w-12">
            <BlurImage
              src="/images/folder-icon.png"
              alt="window logo"
              width={20}
              height={20}
            />
          </WindowButton>
        </AppTooltip>
      </div>

      <div className="flex h-full pr-2">
        <WindowButton className="p-0">
          <ChevronUp />
        </WindowButton>
        <WindowButton>
          <LiaBatteryThreeQuartersSolid size={24} />
        </WindowButton>
        <WindowButton>
          <Wifi size={20} />
        </WindowButton>
        <WindowButton>
          <Volume2 size={20} />
        </WindowButton>
        <WindowButton>
          <ClockRealTime />
        </WindowButton>
        <WindowButton className="ml-3">
          <MessageSquare size={18} />
        </WindowButton>
      </div>
    </div>
  )
}
