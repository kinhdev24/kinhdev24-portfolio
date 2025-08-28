/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGlobalStore } from "@/stores/global"
import { useEffect, useRef } from "react"
import { useShallow } from "zustand/shallow"
import { NOTCH_HEIGHT } from "./notch"

export default function SpotifyPlayer() {
  const spotifyEmbedControllerRef = useRef<any>(null)

  const { setSpotifyEmbedController, setIsSpotifyPlaying } = useGlobalStore(
    useShallow((state) => ({
      setSpotifyEmbedController: state.setSpotifyEmbedController,
      setIsSpotifyPlaying: state.setIsSpotifyPlaying,
    }))
  )

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      const playlistID = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID
      const element = document.getElementById("embed-iframe-spotify")

      const options = {
        width: "90%",
        height: `${NOTCH_HEIGHT * 2.6}px`,
        theme: "dark",
        view: "list",
        uri: `spotify:playlist:${playlistID}`,
      }

      IFrameAPI.createController(element, options, (EmbedController: any) => {
        spotifyEmbedControllerRef.current = EmbedController
        setSpotifyEmbedController(EmbedController)
      })

      spotifyEmbedControllerRef.current.addListener(
        "playback_update",
        (e: any) => {
          if (e.data.isPaused === false) {
            setIsSpotifyPlaying(true)
          } else {
            setIsSpotifyPlaying(false)
          }
        }
      )
    }
  }, [])
  return (
    <div
      id="embed-iframe-spotify"
      className="h-full w-full bg-transparent"
    ></div>
  )
}
