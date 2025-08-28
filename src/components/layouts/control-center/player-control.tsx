"use client"

import NextIcon from "@/components/icons/next-icon"
import PauseIcon from "@/components/icons/pause-icon"
import { BlurImage } from "@/components/ui/blur-image"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { Music, PlayIcon } from "lucide-react"
import { useEffect, useState } from "react"

type SpotifyPlaylist = {
  name: string
  images: string
  owner: string
  open_link: string
}

export default function PlayerControl() {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null)

  useEffect(() => {
    const playlistCookie = Cookies.get("spotify-playlist")
    if (playlistCookie) {
      const playlist = JSON.parse(playlistCookie)
      setPlaylist(playlist)
    } else {
      getPlaylist()
    }
  }, [])

  const getPlaylist = async () => {
    try {
      const response = await fetch(
        `/api/spotify-playlist?playlistId=${process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID}`
      )
      const data = await response.json()
      setPlaylist(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full rounded-[10px] bg-white/10 p-3 shadow-md flex items-center justify-between gap-3">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          if (playlist?.open_link) {
            window.open(playlist.open_link, "_blank")
          }
        }}
      >
        <div className="size-[40px] rounded-[4px] overflow-hidden bg-white/20 flex items-center justify-center">
          {!playlist?.images && (
            <Music className="text-white size-6 opacity-30" />
          )}
          {!!playlist?.images && (
            <BlurImage
              src={playlist?.images || ""}
              alt={playlist?.name || ""}
              width={500}
              height={500}
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm font-medium truncate">
            {playlist?.name || "Spotify Playlist"}
          </p>
          <p className="text-white/50 text-xs font-medium truncate">
            {playlist?.owner || "Spotify"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" disabled>
          <PlayIcon className="text-white size-4 fill-white" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <NextIcon className="text-white size-4" />
        </Button>
      </div>
    </div>
  )
}
