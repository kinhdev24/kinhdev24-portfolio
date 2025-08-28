"use client"

/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils"
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ListCollapse } from "lucide-react"

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string
    icon: React.ReactNode
    href?: string
    onClick?: () => void
  }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (navRef.current && itemRefs.current.length > 0) {
      if (open) {
        // Show animation
        gsap.set(navRef.current, { display: "flex" })
        gsap.fromTo(
          itemRefs.current,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          }
        )
      } else {
        // Hide animation
        gsap.to(itemRefs.current, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            if (navRef.current) {
              gsap.set(navRef.current, { display: "none" })
            }
          },
        })
      }
    }
  }, [open, items.length])

  return (
    <div className={cn("relative block md:hidden", className)}>
      <div
        ref={navRef}
        className="absolute inset-x-0 bottom-full mb-2 flex-col gap-2 hidden"
      >
        {items.map((item, idx) => (
          <div
            key={item.title}
            ref={(el) => {
              if (el) {
                itemRefs.current[idx] = el
              }
            }}
          >
            <a
              href={item.href}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
            >
              <div className="h-4 w-4">{item.icon}</div>
            </a>
          </div>
        ))}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <ListCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string
    icon: React.ReactNode
    href?: string
    onClick?: () => void
  }[]
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(Infinity)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.current = e.pageX
    updateIconSizes()
  }

  const handleMouseLeave = () => {
    mouseX.current = Infinity
    updateIconSizes()
  }

  const updateIconSizes = () => {
    if (!containerRef.current) return

    const icons = containerRef.current.querySelectorAll("[data-icon-container]")

    icons.forEach((icon) => {
      const iconElement = icon as HTMLElement
      const iconInner = iconElement.querySelector("[data-icon]") as HTMLElement
      const bounds = iconElement.getBoundingClientRect()
      const distance = mouseX.current - bounds.x - bounds.width / 2

      // Calculate transforms based on distance
      const clampedDistance = Math.max(-150, Math.min(150, distance))
      const normalizedDistance = clampedDistance / 150 // -1 to 1

      // Size calculations (40 to 80 range for container, 20 to 40 for icon)
      const containerSize = 40 + 40 * (1 - Math.abs(normalizedDistance))
      const iconSize = 40 + 40 * (1 - Math.abs(normalizedDistance))

      gsap.to(iconElement, {
        width: containerSize,
        height: containerSize,
        duration: 0.3,
        ease: "power2.out",
      })

      if (iconInner) {
        gsap.to(iconInner, {
          width: iconSize,
          height: iconSize,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto hidden h-13 items-end gap-2 rounded-2xl glass3d px-2 pb-2 md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  )
}

function IconContainer({
  title,
  icon,
  href,
  onClick,
}: {
  title: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tooltipRef.current) {
      if (hovered) {
        gsap.fromTo(
          tooltipRef.current,
          {
            opacity: 0,
            y: 10,
            display: "block",
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          }
        )
      } else {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          y: 2,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            if (tooltipRef.current) {
              gsap.set(tooltipRef.current, { display: "none" })
            }
          },
        })
      }
    }
  }, [hovered])

  return (
    <div
      data-icon-container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className="relative flex items-center justify-center rounded-full cursor-pointer"
      style={{ width: 40, height: 40 }}
    >
      <div
        ref={tooltipRef}
        className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white hidden"
        style={{ transform: "translateX(-50%)" }}
      >
        {title}
      </div>
      <div
        data-icon
        className="flex items-center justify-center"
        style={{ width: 50, height: 50 }}
      >
        {icon}
      </div>
    </div>
  )
}
