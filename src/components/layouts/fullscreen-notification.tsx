"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { BlurImage } from "../ui/blur-image"

gsap.registerPlugin(useGSAP)

export function FullscreenNotification() {
  const container = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useGSAP(
    (ctx, ctxSafe) => {
      if (!isFullscreen) {
        gsap.to(container.current, {
          display: "block",
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1,
          ease: "expo.inOut",
        })

        gsap.set(container.current, {
          backdropFilter: "blur(10px) brightness(0.85) saturate(1)",
          WebkitBackdropFilter: "blur(10px) brightness(0.85) saturate(1)",
        })
      } else {
        gsap.to(container.current, {
          display: "none",
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "expo.inOut",
        })
      }

      if (ctxSafe && container.current) {
        const onMouseEnter = ctxSafe(() => {
          gsap.to(container.current, {
            scale: 1.05,
          })
        })

        const onMouseLeave = ctxSafe(() => {
          gsap.to(container.current, {
            scale: 1,
          })
        })

        container.current.addEventListener("mouseenter", onMouseEnter)
        container.current.addEventListener("mouseleave", onMouseLeave)
      }
    },
    [isFullscreen]
  )

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", checkFullscreen)
    return () =>
      document.removeEventListener("fullscreenchange", checkFullscreen)
  }, [])

  return (
    <div
      ref={container}
      className="left-1/2 -translate-x-1/2 w-max h-max p-3 hidden opacity-0 scale-0 rounded-2xl  cursor-pointer"
      onClick={() => {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 min-w-10 items-center justify-center">
          <BlurImage
            src="/macos-icon/system-setting-icon.svg"
            alt="spotify"
            width={36}
            height={36}
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-base">Go Full Screen</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">now</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            Enjoy a smoother and more immersive experience in full screen mode.
            Click here to enable it!
          </p>
        </div>
      </div>
    </div>
  )
}
