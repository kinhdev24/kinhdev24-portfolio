"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import QuickActions from "./quick-actions"
import Suggested from "./suggested"
import Productivity from "./productivity"

export function StartMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className="w-[50rem] h-[70dvh] text-white rounded-none shadow-2xs border-none overflow-hidden bg-zinc-900/60 backdrop-blur-3xl flex gap-2"
        align="start"
      >
        <QuickActions />
        <Suggested />
        <Productivity />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
