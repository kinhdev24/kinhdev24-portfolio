"use client"

import { BlurImage } from "@/components/ui/blur-image"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import timezone from "dayjs/plugin/timezone"
import { useGlobalStore } from "@/stores/global"
import { useShallow } from "zustand/shallow"

dayjs.extend(timezone)
dayjs.tz.setDefault()

const StatusBar = () => {
  return (
    <div className="flex bg-black/30 items-center justify-center px-3 h-7 rounded-4xl font-semibold text-xs gap-3 backdrop-blur-sm">
      <BlurImage
        src="/macos-icon/wifi-icon.svg"
        width={18}
        height={13}
        alt="Wifi Icon"
      />

      <div className="flex items-center gap-1">
        <BlurImage
          src="/macos-icon/battery-icon.svg"
          width={29}
          height={13}
          alt="Battery Icon"
        />
        <p className="text-xs font-semibold">100%</p>
      </div>
      <ClockRealTime />
    </div>
  )
}

export const ClockRealTime = () => {
  const [time, setTime] = useState<string | null>(null)

  const { setIsControlCenterOpen, isControlCenterOpen } = useGlobalStore(
    useShallow((state) => ({
      setIsControlCenterOpen: state.setIsControlCenterOpen,
      isControlCenterOpen: state.isControlCenterOpen,
    }))
  )

  useEffect(() => {
    setTime(dayjs().format("ddd DD MMM HH:mm"))
    const interval = setInterval(() => {
      setTime(dayjs().format("ddd DD MMM HH:mm"))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="text-xs font-semibold cursor-pointer hover:bg-white/10 rounded-2xl py-1 px-2 transition-colors"
      onClick={() => {
        setIsControlCenterOpen(!isControlCenterOpen)
      }}
    >
      {time ? time : "00:00:00"}
    </div>
  )
}

export default StatusBar
