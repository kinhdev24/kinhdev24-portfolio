import { BlurImage } from "@/components/ui/blur-image"
import React from "react"

type SuggestedItem = {
  title: string
  description?: string
  icon?: React.ReactNode
  link?: string
}

const suggestedItems: { category: string; items: SuggestedItem[] }[] = [
  {
    category: "#",
    items: [
      {
        title: "Reactjs",
        description: "Library for building dynamic UIs",
        link: "https://react.dev/",
        icon: (
          <BlurImage
            src="/tech-stacks/reactjs-logo.svg"
            alt="reactjs"
            width={50}
            height={50}
          />
        ),
      },
      {
        title: "Nextjs",
        description: "Framework for scalable web apps",
        link: "https://nextjs.org/",
        icon: (
          <BlurImage
            src="/tech-stacks/nextjs-logo.svg"
            alt="nextjs"
            width={50}
            height={50}
          />
        ),
      },
      {
        title: "Vite",
        description: "Lightning-fast build tool for web",
        link: "https://vitejs.dev/",
        icon: (
          <BlurImage
            src="/tech-stacks/vite-logo.svg"
            alt="vite"
            width={50}
            height={50}
          />
        ),
      },
      {
        title: "Auth0",
        description: "Authentication for web apps",
        link: "https://auth0.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/auth0-logo.svg"
            alt="auth0"
            width={50}
            height={50}
          />
        ),
      },
      {
        title: "Javascript",
        description: "Core programming language of the web",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: (
          <BlurImage
            src="/tech-stacks/js-logo.svg"
            alt="javascript"
            width={50}
            height={50}
          />
        ),
      },
      {
        title: "Typescript",
        description: "JavaScript with static type checking",
        link: "https://www.typescriptlang.org/",
        icon: (
          <BlurImage
            src="/tech-stacks/ts-logo.svg"
            alt="typescript"
            width={50}
            height={50}
          />
        ),
      },
    ],
  },
  {
    category: "Web3 Integrations",
    items: [
      {
        title: "Metamask",
        description: "Browser extension for Ethereum-based wallets",
        link: "https://metamask.io/",
        icon: (
          <BlurImage
            src="/tech-stacks/metamask-logo.svg"
            alt="metamask"
            width={20}
            height={20}
          />
        ),
      },
      {
        title: "Phantom",
        description: "Browser extension for Solana-based wallets",
        link: "https://phantom.app/",
        icon: (
          <BlurImage
            src="/tech-stacks/phantom-logo.svg"
            alt="phantom"
            width={20}
            height={20}
          />
        ),
      },
    ],
  },
  {
    category: "Libraries",
    items: [
      {
        title: "Shadcn UI",
        description: "Customizable UI components for React",
        link: "https://ui.shadcn.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/shadcn-ui-logo.svg"
            alt="shadcn-ui"
            width={30}
            height={30}
          />
        ),
      },
      {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework for styling",
        link: "https://tailwindcss.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/tailwind-css-logo.svg"
            alt="tailwind-css"
            width={40}
            height={40}
          />
        ),
      },
      {
        title: "Material UI",
        description: "React components based on Material Design",
        link: "https://mui.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/mui-logo.svg"
            alt="material-ui"
            width={40}
            height={40}
          />
        ),
      },
      {
        title: "Ant Design",
        description: "Enterprise-grade UI components for React",
        link: "https://ant.design/",
        icon: (
          <BlurImage
            src="/tech-stacks/ant-logo.svg"
            alt="ant-design"
            width={25}
            height={25}
          />
        ),
      },
      {
        title: "Redux",
        description: "State management for React apps",
        link: "https://redux.js.org/",
        icon: (
          <BlurImage
            src="/tech-stacks/redux-logo.svg"
            alt="redux"
            width={40}
            height={40}
          />
        ),
      },
      {
        title: "Zustand",
        description: "State management for React apps",
        link: "https://zustand-demo.pmnd.rs/",
        icon: (
          <BlurImage
            src="/tech-stacks/zustand-logo.svg"
            alt="zustand"
            width={30}
            height={30}
          />
        ),
      },
      {
        title: "React Hook Form",
        description: "Form management for React apps",
        link: "https://react-hook-form.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/react-hook-form-logo.svg"
            alt="react-hook-form"
            width={30}
            height={30}
          />
        ),
      },
      {
        title: "Tanstack",
        description: "High-quality open-source software for web developers.",
        link: "https://tanstack.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/tanstack.png"
            alt="tanstack"
            width={30}
            height={30}
          />
        ),
      },
    ],
  },
  {
    category: "Maps",
    items: [
      {
        title: "Mapbox",
        description: "Platform for custom interactive maps",
        link: "https://www.mapbox.com/",
        icon: (
          <BlurImage
            src="/tech-stacks/mapbox-logo.svg"
            alt="mapbox"
            width={30}
            height={40}
          />
        ),
      },
      {
        title: "React Leaflet",
        description: "React wrapper for Leaflet mapping",
        link: "https://react-leaflet.js.org/",
        icon: (
          <BlurImage
            src="/tech-stacks/react-leaflet.svg"
            alt="react-leaflet"
            width={30}
            height={40}
          />
        ),
      },
    ],
  },
]

export default function Suggested() {
  return (
    <div className="w-[17rem] pt-3 flex flex-col gap-2">
      <p>Suggested</p>
      <div className="flex-1 overflow-y-auto space-y-3 scroll-smooth no-scrollbar">
        {suggestedItems.map((item) => (
          <SuggestedGroup key={item.category} {...item} />
        ))}
      </div>
    </div>
  )
}

const SuggestedGroup = (props: (typeof suggestedItems)[number]) => {
  const { category, items } = props
  return (
    <div>
      <p className="pl-3">{category}</p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            className="flex items-center gap-2 p-2 hover:bg-zinc-500/70 transition-colors duration-300 cursor-pointer"
            key={item.title}
            onClick={() => {
              if (item.link) {
                window.open(item.link, "_blank")
              }
            }}
          >
            <div className="min-w-10 size-10 flex items-center justify-center bg-slate-900/80 rounded-md">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-zinc-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
