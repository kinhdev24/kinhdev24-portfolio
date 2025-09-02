"use client"

import { BlurVideo } from "./blur-video"

export const BlurVideoExample = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">BlurVideo Component Examples</h2>

      {/* Basic usage */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Video</h3>
        <BlurVideo
          src="/path/to/your/video.mp4"
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Video with poster */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Video with Poster</h3>
        <BlurVideo
          src="/path/to/your/video.mp4"
          poster="/path/to/poster-image.jpg"
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Autoplay video */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Autoplay Video</h3>
        <BlurVideo
          src="/path/to/your/video.mp4"
          autoPlay
          muted
          loop
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Video without controls */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Video without Controls</h3>
        <BlurVideo
          src="/path/to/your/video.mp4"
          controls={false}
          width={400}
          height={300}
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
