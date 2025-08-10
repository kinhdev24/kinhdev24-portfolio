"use client"

import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault()

export const ClockRealTime = () => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    setTime(dayjs().format("HH:mm:ss A"))
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss A"))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <div>{time ? time : "00:00:00"}</div>
}
