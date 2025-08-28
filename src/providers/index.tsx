"use client"

import React, { useEffect } from "react"

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.requestFullscreen()
  }, [])
  return <>{children}</>
}

export default AppProviders
