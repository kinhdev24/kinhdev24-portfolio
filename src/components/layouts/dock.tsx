"use client"

import { FloatingDock } from "@/components/ui/floating-dock"
import React from "react"
import { BlurImage } from "../ui/blur-image"
import { useGlobalStore } from "@/stores/global"
import { useShallow } from "zustand/shallow"

const DOCK_HEIGHT = "60px"

export function MacosDock() {
  const { toggleLaunchpad } = useGlobalStore(
    useShallow((state) => ({
      toggleLaunchpad: state.toggleLaunchpad,
    }))
  )
  const links = [
    {
      title: "Finder",
      icon: (
        <BlurImage
          src="/macos-icon/system-app-icon.svg"
          width={100}
          height={100}
          alt="System App Icon"
        />
      ),
    },
    {
      title: "Launchpad",
      icon: (
        <BlurImage
          src="/macos-icon/launchpad-icon.svg"
          width={100}
          height={100}
          alt="Launchpad Icon"
        />
      ),
      href: "#",
      onClick: () => toggleLaunchpad(),
    },
    {
      title: "Safari",
      icon: (
        <BlurImage
          className="opacity-80"
          src="/macos-icon/safari-icon.svg"
          width={100}
          height={100}
          alt="Safari Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Messages",
      icon: (
        <BlurImage
          src="/macos-icon/message-icon.svg"
          width={100}
          height={100}
          alt="Message Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Mail",
      icon: (
        <BlurImage
          src="/macos-icon/mail-icon.svg"
          width={100}
          height={100}
          alt="Mail Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Photos",
      icon: (
        <BlurImage
          src="/macos-icon/photos-icon.svg"
          width={100}
          height={100}
          alt="Photos Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Calendar",
      icon: (
        <BlurImage
          src="/macos-icon/calendar-icon.svg"
          width={100}
          height={100}
          alt="Calendar Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Contacts",
      icon: (
        <BlurImage
          src="/macos-icon/contact-icon.svg"
          width={100}
          height={100}
          alt="Contact Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Note",
      icon: (
        <BlurImage
          src="/macos-icon/note-icon.svg"
          width={100}
          height={100}
          alt="Note Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Apple Music",
      icon: (
        <BlurImage
          src="/macos-icon/apple-music-icon.svg"
          width={100}
          height={100}
          alt="Apple Music Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Apple TV",
      icon: (
        <BlurImage
          src="/macos-icon/apple-tv-icon.svg"
          width={120}
          height={120}
          alt="Apple TV Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Podcasts",
      icon: (
        <BlurImage
          src="/macos-icon/podcast-icon.svg"
          width={100}
          height={100}
          alt="Podcasts Icon"
        />
      ),
      href: "#",
    },
    {
      title: "News",
      icon: (
        <BlurImage
          src="/macos-icon/news-icon.svg"
          width={100}
          height={100}
          alt="News Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Face time",
      icon: (
        <BlurImage
          src="/macos-icon/facetime-icon.svg"
          width={100}
          height={100}
          alt="Face Time Icon"
        />
      ),
      href: "#",
    },
    {
      title: "System Setting",
      icon: (
        <BlurImage
          src="/macos-icon/system-setting-icon.svg"
          width={100}
          height={100}
          alt="System Setting Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Folder",
      icon: (
        <BlurImage
          src="/macos-icon/folder-icon.svg"
          width={100}
          height={100}
          alt="Folder Icon"
        />
      ),
      href: "#",
    },
    {
      title: "Trash",
      icon: (
        <BlurImage
          src="/macos-icon/trash-icon.svg"
          width={100}
          height={100}
          alt="Trash Icon"
        />
      ),
      href: "#",
    },
  ]

  return (
    <div
      className="absolute bottom-0 h-[var(--dock-height)] w-full flex justify-center items-center"
      style={
        {
          "--dock-height": DOCK_HEIGHT,
        } as React.CSSProperties
      }
    >
      <FloatingDock items={links} desktopClassName="scale-90" />
    </div>
  )
}
