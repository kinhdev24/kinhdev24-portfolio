"use client"

import { Notifications } from "../notification"
import ControlActions from "./control-actions"
import { LightSlider } from "./light-slider"
import PlayerControl from "./player-control"
import UserProfile from "./user-profile"
import { VolumeSlider } from "./volume-slider"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useGlobalStore } from "@/stores/global"
import { useShallow } from "zustand/shallow"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

const CONTROL_CENTER_WIDTH = 360
export default function ControlCenter() {
  const controlCenterRef = useRef<HTMLDivElement>(null)

  const isControlCenterOpen = useGlobalStore(
    useShallow((state) => state.isControlCenterOpen)
  )

  useGSAP(() => {
    if (!isControlCenterOpen) {
      gsap.to(controlCenterRef.current, {
        // width: 0,
        // height: 0,
        transform: "translateX(120%)",
        duration: 0.3,
        ease: "power2.inOut",
      })

      gsap.to(controlCenterRef.current, {
        display: "none",
        delay: 0.2,
        ease: "power2.inOut",
      })
    }

    if (isControlCenterOpen) {
      gsap.to(controlCenterRef.current, {
        display: "block",
        ease: "power2.inOut",
      })

      gsap.to(controlCenterRef.current, {
        // width: "var(--control-center-width)",
        // height: "max-content",
        transform: "translateX(0)",
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [isControlCenterOpen])

  return (
    <div
      className="absolute right-0 top-[calc(var(--menu-bar-height))] flex flex-col h-full"
      ref={controlCenterRef}
    >
      <div
        className="bg-black/40 backdrop-blur-md rounded-[10px] border p-[10px] border-white/20 space-y-[10px] w-[var(--control-center-width)]"
        style={
          {
            "--control-center-width": `${CONTROL_CENTER_WIDTH}px`,
          } as React.CSSProperties
        }
      >
        <UserProfile />
        <ControlActions />
        <LightSlider />
        <VolumeSlider />
        <PlayerControl />
      </div>
      <div className="w-[var(--control-center-width)]">
        <Notifications className="max-w-[var(--control-center-width)]" />
      </div>
    </div>
  )
}
