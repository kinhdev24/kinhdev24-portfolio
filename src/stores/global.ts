/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLaunchpadOpen: false,
  isSpotifyPlaying: false,
  isControlCenterOpen: true,

  setIsSpotifyPlaying: (isSpotifyPlaying: boolean) => set({ isSpotifyPlaying }),
  setIsLaunchpadOpen: (isLaunchpadOpen) => set({ isLaunchpadOpen }),
  setIsControlCenterOpen: (isControlCenterOpen) => set({ isControlCenterOpen }),
  toggleLaunchpad: () =>
    set((state) => ({ isLaunchpadOpen: !state.isLaunchpadOpen })),

  spotifyEmbedController: null,
  setSpotifyEmbedController: (spotifyEmbedController) =>
    set({ spotifyEmbedController }),
}))

interface GlobalStore {
  isLaunchpadOpen: boolean
  isSpotifyPlaying: boolean
  isControlCenterOpen: boolean
  setIsSpotifyPlaying: (isSpotifyPlaying: boolean) => void
  setIsLaunchpadOpen: (isLaunchpadOpen: boolean) => void
  setIsControlCenterOpen: (isControlCenterOpen: boolean) => void
  toggleLaunchpad: () => void
  spotifyEmbedController: any | null
  setSpotifyEmbedController: (spotifyEmbedController: any) => void
}
