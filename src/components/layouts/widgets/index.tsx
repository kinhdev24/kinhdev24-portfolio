import { ActivityWidget, ClockWidget, PodcastsIcon } from "@/components/icons"
import { BlurImage } from "@/components/ui/blur-image"
import { BlurVideo } from "@/components/ui/blur-video"

export const Widgets = () => {
  return (
    <div
      className="absolute left-2 top-[80px] flex flex-col h-full"
      //   ref={controlCenterRef}
    >
      <div className="w-max grid grid-cols-2 gap-4">
        <ClockWidget className="size-[135px]" />
        <ActivityWidget className="size-[135px]" />
        <div className="col-span-2">
          <div className="w-full h-full bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-[10px] flex flex-col">
            <div className="p-4 relative flex gap-4 items-end">
              <PodcastsIcon className="text-white absolute top-4 right-4" />
              <div className="size-[110px] rounded-[10px] overflow-hidden bg-white/10">
                <BlurImage
                  src="/images/personal/resume_avatar.JPG"
                  alt="user-profile"
                  width={500}
                  height={500}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-white text-[10px] uppercase">
                  Frontend Engineer
                </p>
                <p className="text-white text-sm font-medium">
                  Bach Duong Kinh
                </p>
                <p className="text-white text-xs">Innovate Boldly</p>
              </div>
            </div>
            <div className="p-4 bg-zinc-800/20 flex-1 rounded-b-[10px] grid grid-cols-4 gap-2">
              <BlurImage
                src="/techstack/reactjs.svg"
                width={57}
                height={57}
                alt="React Logo"
              />
              <BlurImage
                src="/techstack/nextjs.svg"
                width={57}
                height={57}
                alt="Nextjs Logo"
              />
              <BlurImage
                src="/techstack/javascript.svg"
                width={57}
                height={57}
                alt="JS Logo"
              />
              <BlurImage
                src="/techstack/typescript.svg"
                width={57}
                height={57}
                alt="TS Logo"
              />
              <BlurImage
                src="/techstack/vite.svg"
                width={57}
                height={57}
                alt="Vite Logo"
              />
              <BlurImage
                src="/techstack/auth0.svg"
                width={57}
                height={57}
                alt="Auth0 Logo"
              />
              <BlurImage
                src="/techstack/tanstack.svg"
                width={57}
                height={57}
                alt="Tanstack Logo"
              />
              <BlurImage
                src="/techstack/mapbox.svg"
                width={57}
                height={57}
                alt="mapbox Logo"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 h-[180px] bg-zinc-800/20 rounded-[10px] overflow-hidden relative">
          <BlurImage
            src="/images/personal/vietnam.jpg"
            alt="hi-vietnam"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 flex items-end justify-start bg-black/50">
            <p className="text-white text-xs font-medium mb-1 opacity-80 pl-3">
              Hoang Sa and Truong Sa archipelagos <br /> belong to Vietnam 🇻🇳
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
