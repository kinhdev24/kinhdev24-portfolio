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
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, Draggable)

const APP_PER_PAGE = 18

const apps = [
  {
    name: "ReactJS",
    id: 1,
    logo: "/techstack/ReactJS.svg",
    href: "https://react.dev/",
  },
  {
    name: "NextJS",
    id: 2,
    logo: "/techstack/NextJS.svg",
    href: "https://nextjs.org/",
  },
  {
    name: "JavaScript",
    id: 3,
    logo: "/techstack/Javascript.svg",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    id: 4,
    logo: "/techstack/Typescript.svg",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "Vite",
    id: 5,
    logo: "/techstack/Vite.svg",
    href: "https://vitejs.dev/",
  },
  {
    name: "Auth0",
    id: 6,
    logo: "/techstack/Auth0.svg",
    href: "https://auth0.com/",
  },
  {
    name: "TailwindCss",
    id: 7,
    logo: "/techstack/tailwind-css.svg",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Shadcn-ui",
    id: 8,
    logo: "/techstack/Shadcn.svg",
    href: "https://ui.shadcn.com/",
  },
  {
    name: "HeroUI",
    id: 9,
    logo: "/techstack/heroui.svg",
    href: "https://www.heroui.com/",
  },
  {
    name: "Ant Design",
    id: 10,
    logo: "/techstack/antd.svg",
    href: "https://ant.design/",
  },
  {
    name: "MuiUI",
    id: 11,
    logo: "/techstack/mui-ui.svg",
    href: "https://mui.com/",
  },
  {
    name: "Sass",
    id: 12,
    logo: "/techstack/sass.svg",
    href: "https://sass-lang.com/",
  },
  {
    name: "Tanstack",
    id: 13,
    logo: "/techstack/tanstack.svg",
    href: "https://tanstack.com/",
  },
  {
    name: "Zustand",
    id: 14,
    logo: "/techstack/zustand.svg",
    href: "https://zustand-demo.pmnd.rs/",
  },
  {
    name: "Redux",
    id: 15,
    logo: "/techstack/redux.svg",
    href: "https://redux.js.org/",
  },
  {
    name: "React-hook-form",
    id: 16,
    logo: "/techstack/react-hook-form.svg",
    href: "https://react-hook-form.com/",
  },
  {
    name: "Mapbox",
    id: 17,
    logo: "/techstack/mapbox.svg",
    href: "https://www.mapbox.com/",
  },
  {
    name: "Metamask",
    id: 18,
    logo: "/techstack/metamask.svg",
    href: "https://metamask.io/",
  },
  {
    name: "DnD Kit",
    id: 19,
    logo: "/techstack/dnd-kit.svg",
    href: "https://dndkit.com/",
  },
  {
    name: "Dayjs",
    id: 20,
    logo: "/techstack/dayjs.svg",
    href: "https://day.js.org/",
  },
  {
    name: "Eslint",
    id: 21,
    logo: "/techstack/eslint.svg",
    href: "https://eslint.org/",
  },
  {
    name: "Prettier",
    id: 22,
    logo: "/techstack/prettier.svg",
    href: "https://prettier.io/",
  },
  {
    name: "Biome",
    id: 23,
    logo: "/techstack/biome.svg",
    href: "https://biomejs.dev/",
  },
  {
    name: "JWT",
    id: 24,
    logo: "/techstack/jwt.svg",
    href: "https://jwt.io/",
  },
  {
    name: "Git",
    id: 25,
    logo: "/techstack/git-branch.svg",
    href: "https://git-scm.com/",
  },
  {
    name: "Github",
    id: 26,
    logo: "/techstack/github.svg",
    href: "https://github.com/",
  },
  {
    name: "VS Code",
    id: 27,
    logo: "/techstack/vscode.svg",
    href: "https://code.visualstudio.com/",
  },
  {
    name: "Bitbucket",
    id: 28,
    logo: "/techstack/bitbucket.svg",
    href: "https://bitbucket.org/",
  },
  {
    name: "Jira",
    id: 29,
    logo: "/techstack/jira.svg",
    href: "https://www.atlassian.com/software/jira",
  },
  {
    name: "Vercel",
    id: 30,
    logo: "/techstack/vercel.svg",
    href: "https://vercel.com/",
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
      href: string
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

      <Carousel className="">
        <CarouselContent className="flex-1 h-[calc(100dvh-12rem)] w-full mt-12">
          {appsSplit.map((apps, index) => {
            const isFullRow = apps.length % 6 === 0
            return (
              <CarouselItem key={index}>
                <div
                  className={cn(
                    "grid grid-cols-6 gap-4 p-1 w-full",
                    isFullRow ? "justify-between" : "justify-start"
                  )}
                >
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-start flex-col gap-2"
                    >
                      <BlurImage
                        src={app.logo}
                        alt={app.name}
                        width={100}
                        height={100}
                        data-name="stack-icon"
                        className="cursor-pointer"
                        onClick={() => window.open(app.href, "_blank")}
                      />
                      <span className="text-sm font-normal">{app.name}</span>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Launchpad
