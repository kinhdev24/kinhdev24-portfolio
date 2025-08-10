"use client"

import { BlurImage } from "@/components/ui/blur-image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export default function Productivity() {
  return (
    <div className="flex-1 py-3 mb-6">
      <p className="mb-4">Productivity</p>

      <div className="grid grid-cols-2 gap-x-4 overflow-y-auto no-scrollbar pr-4 h-full">
        <ProjectCarousel
          index={1}
          items={[
            {
              image: "/images/projects/hivello_mockup.webp",
              title: "Hivello",
              description: "DePIN Manager",
            },
            {
              image: "/images/projects/tracki_mockup.webp",
              title: "TechStack",
              description: "Nextjs, Tailwind, Shadcn, TypeScript",
            },
          ]}
        />
        <ProjectCarousel
          index={2}
          items={[
            {
              image: "/images/projects/growing_mockup.webp",
              title: "Growing",
              description: "Project Management",
            },
            {
              image: "/images/projects/ilotusland_mockup.webp",
              title: "TechStack",
              description: "Nextjs, Tailwind, Shadcn, TypeScript",
            },
          ]}
        />

        <ProjectCarousel
          index={3}
          items={[
            {
              image: "/images/projects/tracki_mockup.webp",
              title: "Tracki",
              description: "Tracking device GPS",
            },
            {
              image: "/images/projects/hivello_mockup.webp",
              title: "TechStack",
              description: "Nextjs, Tailwind, Shadcn, TypeScript",
            },
          ]}
        />

        <ProjectCarousel
          index={4}
          items={[
            {
              image: "/images/projects/ilotusland_mockup.webp",
              title: "Ilotusland",
              description: "Environment Monitoring",
            },
            {
              image: "/images/projects/growing_mockup.webp",
              title: "TechStack",
              description: "Nextjs, Tailwind, Shadcn, TypeScript",
            },
          ]}
        />
        {/* <ProjectCarousel index={2} />
        <ProjectCarousel index={3} />
        <ProjectCarousel index={4} />
        <ProjectCarousel index={5} />
        <ProjectCarousel index={6} /> */}
      </div>
    </div>
  )
}

const indexAutoplayFirst = [2, 3, 6]
const ProjectCarousel = ({
  index = 0,
  items,
}: {
  index?: number
  items?: { image: string; title?: string; description?: string }[]
}) => {
  const plugin = useRef(
    Autoplay({
      delay: indexAutoplayFirst.includes(index) ? 5000 : 8000,
      stopOnInteraction: true,
    })
  )

  return (
    <Carousel
      opts={{
        align: "start",
        duration: 50,
      }}
      orientation="vertical"
      className="w-full "
      plugins={[plugin.current]}
    >
      <CarouselContent className="h-[250px]">
        {items?.map((item, index) => {
          return (
            <CarouselItem key={index}>
              <div className="flex aspect-square items-center justify-center bg-zinc-900/50 relative">
                <BlurImage
                  src={item.image}
                  alt={item.title ?? "Project"}
                  width={1000}
                  height={1000}
                  className="object-cover size-full"
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-zinc-900/50 p-4">
                  <p className="text-sm text-white font-semibold italic">
                    {item.title}
                  </p>
                  <p className="text-sm text-white">{item.description}</p>
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
