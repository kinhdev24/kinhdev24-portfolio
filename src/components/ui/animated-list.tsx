"use client"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export function AnimatedListItem({
  children,
  shouldRemove = false,
  onRemoveComplete,
}: {
  children: React.ReactNode
  shouldRemove?: boolean
  onRemoveComplete?: () => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)

  // Animation vào khi mount
  useEffect(() => {
    const element = itemRef.current
    if (!element) return

    // Set initial state
    gsap.set(element, { scale: 0, opacity: 0 })

    // Animate in
    gsap.to(element, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      transformOrigin: "center center",
    })
  }, [])

  // Animation ra khi shouldRemove = true
  useEffect(() => {
    const element = itemRef.current
    if (!element || !shouldRemove) return

    console.log("Starting remove animation for item") // Debug log

    gsap.to(element, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => {
        console.log("Remove animation complete") // Debug log
        onRemoveComplete?.()
      },
    })
  }, [shouldRemove, onRemoveComplete])

  return (
    <div ref={itemRef} className="mx-auto w-full">
      {children}
    </div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [displayedItems, setDisplayedItems] = useState<
      {
        item: React.ReactNode
        key: string
        shouldRemove: boolean
      }[]
    >([])

    const addIndexRef = useRef(0)
    const addTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    // Tạo key-value map cho children mới
    const newItemsMap = useMemo(() => {
      const map = new Map()
      childrenArray.forEach((child, index) => {
        const key = (child as React.ReactElement).key || `item-${index}`
        map.set(key, child)
      })
      return map
    }, [childrenArray])

    // Xử lý thay đổi children
    useEffect(() => {
      const newKeys = Array.from(newItemsMap.keys())
      const currentItems = displayedItems.filter((item) => !item.shouldRemove)
      const currentKeys = currentItems.map((item) => item.key)

      console.log("Current keys:", currentKeys) // Debug log
      console.log("New keys:", newKeys) // Debug log

      // Tìm items cần remove
      const keysToRemove = currentKeys.filter((key) => !newKeys.includes(key))
      console.log("Keys to remove:", keysToRemove) // Debug log

      // Tìm items cần thêm
      const keysToAdd = newKeys.filter((key) => !currentKeys.includes(key))
      console.log("Keys to add:", keysToAdd) // Debug log

      // Đánh dấu items cần remove
      if (keysToRemove.length > 0) {
        setDisplayedItems((prev) =>
          prev.map((item) =>
            keysToRemove.includes(item.key)
              ? { ...item, shouldRemove: true }
              : item
          )
        )
      }

      // Thêm items mới với delay
      if (keysToAdd.length > 0) {
        // Cancel timeout cũ nếu có
        if (addTimeoutRef.current) {
          clearTimeout(addTimeoutRef.current)
        }

        addIndexRef.current = 0

        const addNextItem = () => {
          if (addIndexRef.current < keysToAdd.length) {
            const keyToAdd = keysToAdd[addIndexRef.current]
            const itemToAdd = newItemsMap.get(keyToAdd)

            setDisplayedItems((prev) => {
              // Kiểm tra item đã tồn tại chưa
              const exists = prev.some((existing) => existing.key === keyToAdd)
              if (exists) return prev

              return [
                {
                  item: itemToAdd,
                  key: keyToAdd,
                  shouldRemove: false,
                },
                ...prev,
              ]
            })

            addIndexRef.current++
            addTimeoutRef.current = setTimeout(addNextItem, delay)
          }
        }

        // Bắt đầu thêm items
        addNextItem()
      }

      return () => {
        if (addTimeoutRef.current) {
          clearTimeout(addTimeoutRef.current)
        }
      }
    }, [newItemsMap, delay])

    // Xử lý khi animation remove hoàn thành
    const handleRemoveComplete = (keyToRemove: string) => {
      console.log("Removing item with key:", keyToRemove) // Debug log
      setDisplayedItems((prev) =>
        prev.filter((item) => item.key !== keyToRemove)
      )
    }

    return (
      <div
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        {displayedItems.map(({ item, key, shouldRemove }) => (
          <AnimatedListItem
            key={key}
            shouldRemove={shouldRemove}
            onRemoveComplete={() => handleRemoveComplete(key)}
          >
            {item}
          </AnimatedListItem>
        ))}
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
