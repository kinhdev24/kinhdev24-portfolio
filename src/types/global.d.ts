/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void
  }
}
