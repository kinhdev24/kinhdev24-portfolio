import React from "react"
import MenuActions from "./menu-actions"
import StatusBar from "./status-bar"
import Notch from "./notch"
import { Notifications } from "../notification"

const MENUBAR_HEIGHT = "48px"

const Menubar = () => {
  return (
    <div
      className="h-[var(--menu-bar-height)] flex items-center justify-between p-2 relative"
      style={
        {
          "--menu-bar-height": MENUBAR_HEIGHT,
        } as React.CSSProperties
      }
    >
      <MenuActions />
      <Notch />
      <StatusBar />
    </div>
  )
}

export default Menubar
