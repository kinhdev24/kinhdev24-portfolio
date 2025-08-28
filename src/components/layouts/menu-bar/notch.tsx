"use client"

import React, { useEffect, useRef, useState } from "react"
import MusicPlay from "@/assets/json/music-play.json"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import { BlurImage } from "@/components/ui/blur-image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useGlobalStore } from "@/stores/global"
import { useShallow } from "zustand/shallow"
import SpotifyPlayer from "./spotify-player"

gsap.registerPlugin(useGSAP)

export const NOTCH_HEIGHT = 34
export const NOTCH_WIDTH = 192

const Notch = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const notchContainer = useRef<HTMLDivElement>(null)
  const notchDefault = useRef<HTMLDivElement>(null)
  const notchControl = useRef<HTMLDivElement>(null)

  const { isSpotifyPlaying } = useGlobalStore(
    useShallow((state) => ({
      isSpotifyPlaying: state.isSpotifyPlaying,
    }))
  )

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpotifyPlaying) {
        lottieRef.current.setSpeed(0.5)
      } else {
        lottieRef.current.setSpeed(0)
      }
    }
  }, [isSpotifyPlaying])

  // useEffect(() => {
  //   window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  //     const playlistID = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID
  //     const element = document.getElementById("embed-iframe-spotify")

  //     const options = {
  //       width: "90%",
  //       height: `${NOTCH_HEIGHT * 2.6}px`,
  //       theme: "dark",
  //       view: "list",
  //       uri: `spotify:playlist:${playlistID}`,
  //     }

  //     IFrameAPI.createController(element, options, (EmbedController: any) => {
  //       spotifyEmbedControllerRef.current = EmbedController
  //       setSpotifyEmbedController(EmbedController)
  //     })

  //     spotifyEmbedControllerRef.current.addListener(
  //       "playback_update",
  //       (e: any) => {
  //         if (e.data.isPaused === false) {
  //           setIsPlaying(true)
  //         } else {
  //           setIsPlaying(false)
  //         }
  //       }
  //     )
  //   }
  // }, [])

  useGSAP((ctx, ctxSafe) => {
    let timer: NodeJS.Timeout | null = null

    const onMouseEnter =
      ctxSafe?.(() => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        timer = setTimeout(() => {
          gsap.to(notchContainer.current, {
            width: `${NOTCH_WIDTH * 2.5}px`,
            height: `${NOTCH_HEIGHT * 3.5}px`,
            duration: 0.1,
            ease: "power2.inOut",
            delay: 0.05,
          })

          gsap.to(notchDefault.current, {
            display: "none",
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          })

          gsap.to(notchControl.current, {
            display: "flex",
            opacity: 1,
            duration: 0.3,
            delay: 0.1,
            ease: "power2.inOut",
          })
        }, 500)
      }) ?? (() => {})

    const onMouseLeave =
      ctxSafe?.(() => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        gsap.to(notchContainer.current, {
          width: `${NOTCH_WIDTH}px`,
          height: `${NOTCH_HEIGHT}px`,
          duration: 0.1,
          ease: "power2.inOut",
        })

        gsap.to(notchDefault.current, {
          display: "flex",
          opacity: 1,
          duration: 0.1,
          ease: "power2.inOut",
          delay: 0.2,
        })

        gsap.to(notchControl.current, {
          display: "none",
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        })
      }) ?? (() => {})

    if (notchContainer.current) {
      notchContainer.current.addEventListener("mouseenter", onMouseEnter)
      notchContainer.current.addEventListener("mouseleave", onMouseLeave)
    }

    return () => {
      if (notchContainer.current) {
        notchContainer.current.removeEventListener("mouseenter", onMouseEnter)
        notchContainer.current.removeEventListener("mouseleave", onMouseLeave)
      }
    }
  })

  return (
    <>
      <div
        ref={notchContainer}
        className="absolute top-0 left-1/2 -translate-x-1/2 
             w-[var(--NOTCH-WIDTH)] h-[var(--NOTCH-HEIGHT)] 
             bg-black rounded-b-2xl z-10 
             hover:scale-105 duration-300
             before:content-[''] before:absolute before:top-0 before:-left-[var(--CORNER-SIZE)] 
             before:w-[calc(var(--CORNER-SIZE)*2)] before:h-[var(--CORNER-SIZE)] 
             before:bg-no-repeat before:bg-[length:50%_100%] 
             before:bg-[radial-gradient(circle_at_0_100%,transparent_calc(var(--CORNER-SIZE)-1px),black_var(--CORNER-SIZE))] 
             after:content-[''] after:absolute after:top-0 after:left-full 
             after:w-[calc(var(--CORNER-SIZE)*2)] after:h-[var(--CORNER-SIZE)] 
             after:bg-no-repeat after:bg-[length:50%_100%] 
             after:bg-[radial-gradient(circle_at_100%_100%,transparent_calc(var(--CORNER-SIZE)-1px),black_var(--CORNER-SIZE))]"
        style={
          {
            "--NOTCH-HEIGHT": `${NOTCH_HEIGHT}px`,
            "--NOTCH-WIDTH": `${NOTCH_WIDTH}px`,
            "--CORNER-SIZE": `10px`,
          } as React.CSSProperties
        }
      >
        <div
          ref={notchDefault}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* <div className="absolute top-1/2 left-2 transform -translate-y-1/2"></div> */}
          <BlurImage
            src="/app-logo/spotify.png"
            alt="spotify"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            width={18}
            height={18}
          />

          <div className="relative w-3 h-3 bg-gray-800 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>

          <Lottie
            lottieRef={lottieRef}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            animationData={MusicPlay}
            loop={true}
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div
          ref={notchControl}
          className="items-center justify-center opacity-0 h-full overflow-hidden"
        >
          <SpotifyPlayer />
        </div>
      </div>
    </>
  )
}

export default Notch
