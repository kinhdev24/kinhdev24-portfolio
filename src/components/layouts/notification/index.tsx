"use client"

import { AnimatedList } from "@/components/ui/animated-list"
import { BlurImage } from "@/components/ui/blur-image"
import { cn } from "@/lib/utils"
import { useGlobalStore } from "@/stores/global"
import { useEffect, useState } from "react"
import { useShallow } from "zustand/shallow"

interface Item {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  time: string
  onClick?: () => void
}

const fullScreenNotification: Item = {
  name: "Go Full Screen",
  description:
    "Enjoy a smoother and more immersive experience in full screen mode.",
  time: "now",
  icon: (
    <BlurImage
      src="/macos-icon/system-setting-icon.svg"
      alt="spotify"
      width={36}
      height={36}
    />
  ),
  color: "#0091FF",
}

const spotifyNotification: Item = {
  name: "Spotify is playing",
  description: "Spotify is playing",
  time: "now",
  icon: (
    <BlurImage
      src="/app-logo/spotify.png"
      alt="spotify"
      width={36}
      height={36}
    />
  ),
  color: "#0091FF",
}

const Notification = ({ name, description, icon, time, onClick }: Item) => {
  return (
    <figure
      onClick={onClick}
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-2",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 min-w-10 items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function Notifications({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Item[]>([])
  const [isFullScreen, setIsFullScreen] = useState(false)

  const isSpotifyPlaying = useGlobalStore(
    useShallow((state) => state.isSpotifyPlaying)
  )

  useEffect(() => {
    setNotifications(() => {
      let newNotifications: Item[] = [
        fullScreenNotification,
        spotifyNotification,
      ]

      if (isFullScreen) {
        newNotifications = newNotifications.filter(
          (item) => item.name !== "Go Full Screen"
        )
      }

      if (!isSpotifyPlaying) {
        newNotifications = newNotifications.filter(
          (item) => item.name !== "Spotify is playing"
        )
      }

      return newNotifications
    })
  }, [isFullScreen, isSpotifyPlaying])

  useEffect(() => {
    const checkFullscreen = (e: Event) => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", checkFullscreen)
    return () =>
      document.removeEventListener("fullscreenchange", checkFullscreen)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await document.documentElement.requestFullscreen()
      } else {
        // Exit fullscreen
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  return (
    <div
      className={cn("flex w-[368px] flex-col overflow-hidden p-2", className)}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification
            {...item}
            key={idx}
            onClick={() => {
              toggleFullscreen()
            }}
          />
        ))}
      </AnimatedList>
    </div>
  )
}
