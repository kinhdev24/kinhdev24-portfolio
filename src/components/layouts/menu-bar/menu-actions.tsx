import { BlurImage } from "@/components/ui/blur-image"
import React from "react"

const menuBarItems = [
  {
    key: "Finder",
    children: <div>Finder</div>,
  },
  {
    key: "File",
    children: <div>File</div>,
  },
  {
    key: "Edit",
    children: <div>Edit</div>,
  },
  {
    key: "View",
    children: <div>View</div>,
  },
  {
    key: "Go",
    children: <div>Go</div>,
  },
  {
    key: "Window",
    children: <div>Window</div>,
  },
  {
    key: "Help",
    children: <div>Help</div>,
  },
]

const MenuActions = () => {
  return (
    <div className="flex bg-black/30 items-center justify-center px-2 h-7 rounded-4xl backdrop-blur-sm">
      <div className="px-1 py-0.5">
        <BlurImage
          src="/apple-logo.svg"
          width={14}
          height={17}
          alt="Apple Logo"
        />
      </div>
      <div className="flex items-center gap-2 h-full px-2">
        {menuBarItems.map((item) => {
          return (
            <div key={item.key} className="text-xs font-semibold">
              {item.children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuActions
