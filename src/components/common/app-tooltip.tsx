import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type AppTooltipProps = {
  children: React.ReactNode
  content?: string
} & React.ComponentProps<typeof TooltipContent>

export default function AppTooltip({
  children,
  content,
  ...props
}: AppTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...props} arrow={false}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}
