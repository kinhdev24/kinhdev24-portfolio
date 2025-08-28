"use client"

import { useGlobalStore } from "@/stores/global"
import { useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/shallow"

import { BlurImage } from "@/components/ui/blur-image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { Search } from "lucide-react"

gsap.registerPlugin(useGSAP, Draggable)

const APP_PER_PAGE = 18

const apps = [
  {
    name: "ReactJS",
    id: 1,
    logo: "/techstack/react-logo.svg",
  },
  {
    name: "NextJS",
    id: 2,
    logo: "/techstack/nextjs-logo.svg",
  },
  {
    name: "JavaScript",
    id: 3,
    logo: "/techstack/js-logo.svg",
  },
  {
    name: "TypeScript",
    id: 4,
    logo: "/techstack/ts-logo.svg",
  },
]

const Launchpad = () => {
  const container = useRef<HTMLDivElement>(null)
  const appsContainer = useRef<HTMLDivElement>(null)

  const [appsSplit, setAppsSplit] = useState<
    {
      id: number
      name: string
      logo: string
    }[][]
  >([])

  const { isLaunchpadOpen, toggleLaunchpad } = useGlobalStore(
    useShallow((state) => ({
      isLaunchpadOpen: state.isLaunchpadOpen,
      toggleLaunchpad: state.toggleLaunchpad,
    }))
  )

  useEffect(() => {
    setAppsSplit(
      [...Array(Math.ceil(apps.length / APP_PER_PAGE))].map((_, index) => {
        return apps.slice(index * APP_PER_PAGE, (index + 1) * APP_PER_PAGE)
      })
    )
  }, [])

  useGSAP(() => {
    if (isLaunchpadOpen) {
      gsap.to(container.current, {
        duration: 0.2,
        opacity: 1,
        ease: "power1.inOut",
        display: "block",
      })

      gsap.to(appsContainer.current, {
        duration: 0.2,
        opacity: 1,
        ease: "power1.inOut",
        display: "block",
      })
    }
  }, [isLaunchpadOpen])

  useGSAP((context, contextSafe) => {
    if (contextSafe) {
      const onClickLaunchpad = contextSafe((event: MouseEvent) => {
        const isAppClicked =
          (event.target as HTMLElement)?.dataset?.name === "stack-icon"

        const isInputClicked =
          (event.target as HTMLElement)?.tagName === "INPUT"

        if (container.current && (isAppClicked || isInputClicked)) {
          return
        }

        gsap.to(container.current, {
          duration: 0.2,
          opacity: 0,
          display: "none",
        })
        toggleLaunchpad()
      })

      appsContainer.current?.addEventListener("click", onClickLaunchpad)

      container.current?.addEventListener("click", onClickLaunchpad)
    }
  }, [])

  useEffect(() => {
    if (!isLaunchpadOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        gsap.to(container.current, {
          duration: 0.2,
          opacity: 0,
          display: "none",
        })
        toggleLaunchpad()
      }
    }
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isLaunchpadOpen, toggleLaunchpad])

  return (
    <div
      style={{ opacity: 0, display: "none" }}
      className="fixed inset-0 bg-black/40 backdrop:backdrop-blur-md z-50 backdrop-blur-3xl py-12 px-5 xl:px-[10rem] flex w-full h-dvh flex-col items-center justify-start space-y-6 overflow-hidden"
      ref={container}
    >
      <div className="relative w-[320px] h-max launchpad-search justify-self-center">
        <div className="absolute h-full left-3 flex items-center justify-center">
          <Search size={20} />
        </div>
        <Input className="w-full pl-10" placeholder="Search" />
      </div>

      <Carousel className="flex-1 h-[calc(100dvh-12rem)] w-full mt-12">
        <CarouselContent>
          {appsSplit.map((apps, index) => (
            <CarouselItem key={index}>
              <div
                className="p-1 min-h-[calc(100dvh-12rem)] max-h-[calc(100dvh-12rem)] w-full grid grid-cols-6 gap-4 items-start justify-start"
                style={{ gridAutoRows: "1fr" }}
              >
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="aspect-square flex items-center justify-start flex-col gap-2"
                  >
                    <BlurImage
                      src={app.logo}
                      alt={app.name}
                      width={100}
                      height={100}
                      data-name="stack-icon"
                    />
                    <span className="text-sm font-normal">{app.name}</span>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Launchpad
