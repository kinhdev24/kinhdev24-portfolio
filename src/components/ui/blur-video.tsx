"use client"

import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface BlurVideoProps {
  src: string
  className?: string
  width?: number | string
  height?: number | string
  poster?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "none" | "metadata" | "auto"
  onLoadStart?: () => void
  onCanPlay?: () => void
  onError?: (error: React.SyntheticEvent<HTMLVideoElement, Event>) => void
  [key: string]: unknown
}

export const BlurVideo = ({
  src,
  className,
  width,
  height,
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  preload = "metadata",
  onLoadStart,
  onCanPlay,
  onError,
  ...rest
}: BlurVideoProps) => {
  const [isLoading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleLoadStart = () => {
    setLoading(true)
    onLoadStart?.()
  }

  const handleCanPlay = () => {
    setLoading(false)
    onCanPlay?.()
  }

  const handleError = (
    error: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setLoading(false)
    onError?.(error)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative">
      <video
        // ref={videoRef}
        className={cn(
          "transition-all duration-300",
          // isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
          className
        )}
        src={src}
        width={width}
        height={height}
        poster={poster}
        // controls={controls}
        // autoPlay={autoPlay}
        autoPlay={true}
        muted={muted}
        loop={loop}
        preload={preload}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadedData={() => setLoading(false)}
        {...rest}
      />

      {/* Loading overlay */}
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-white/80 text-sm">Loading...</span>
          </div>
        </div>
      )} */}

      {/* Play button overlay when not playing and not loading */}
      {!isLoading && !isPlaying && !autoPlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => videoRef.current?.play()}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
          >
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
