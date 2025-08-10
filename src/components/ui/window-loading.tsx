"use client"

import { BlurImage } from "./blur-image"
import { Spinner } from "./kibo-ui/spinner"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

export default function WindowLoading() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(container.current, {
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      delay: 4,
      onComplete: () => {
        gsap.to(container.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          display: "none",
        })
      },
    })
  })

  return (
    <div
      className="absolute inset-0 bg-[#2769c7] py-[8%] flex items-center justify-between flex-col text-white z-50"
      ref={container}
    >
      <BlurImage
        src="/window-logo.png"
        alt="window logo"
        width={150}
        height={150}
      />
      <div className="flex items-center gap-2 flex-col">
        <Spinner variant="circle" size={30} />
        <p className="text-xl">please wait...</p>
      </div>
    </div>
  )
}
