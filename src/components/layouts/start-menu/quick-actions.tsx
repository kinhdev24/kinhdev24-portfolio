/* eslint-disable jsx-a11y/alt-text */
import AppTooltip from "@/components/common/app-tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WindowButton } from "@/components/ui/button"
import { AlignJustify, Image, Power, Settings, StickyNote } from "lucide-react"

export default function QuickActions() {
  return (
    <div className="flex flex-col justify-between h-full">
      <WindowButton className="min-w-12 h-12">
        <AlignJustify size={20} />
      </WindowButton>

      <div className="flex-1 flex flex-col justify-end">
        <AppTooltip content="Kinh Bach" side="right">
          <WindowButton className="min-w-12 h-12">
            <Avatar>
              <AvatarImage src="/images/user-avatar.jpg" />
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
          </WindowButton>
        </AppTooltip>
        <AppTooltip content="Documents" side="right">
          <WindowButton className="min-w-12 h-12">
            <StickyNote size={20} />
          </WindowButton>
        </AppTooltip>
        <AppTooltip content="Pictures" side="right">
          <WindowButton className="min-w-12 h-12">
            <Image size={20} />
          </WindowButton>
        </AppTooltip>
        <AppTooltip content="Settings" side="right">
          <WindowButton className="min-w-12 h-12">
            <Settings size={20} />
          </WindowButton>
        </AppTooltip>
        <AppTooltip content="Power" side="right">
          <WindowButton className="min-w-12 h-12">
            <Power size={20} />
          </WindowButton>
        </AppTooltip>
      </div>
    </div>
  )
}
