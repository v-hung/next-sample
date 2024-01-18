"use client"

import { Placement, autoUpdate, computePosition, flip, offset, shift, size } from "@floating-ui/dom"
import { HTMLAttributes, useEffect, useRef } from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useClickOutside } from "@/lib/utils/clickOutside";
import { twMerge } from "tailwind-merge";

type Props = HTMLMotionProps<'div'> & {
  referenceEl: HTMLElement | null,
  onClose?: (e: Event) => void,
  placement?: Placement
}

const Menu = (props: Props) => {
  const { children, referenceEl, onClose, placement, className, ...rest } = props

  const floatingEl = useRef<HTMLDivElement>(null)

  function updatePosition() {
    if (referenceEl && floatingEl.current) {
      computePosition(referenceEl, floatingEl.current, {
        placement: placement,
        middleware: [
          offset(5), 
          flip(), 
          shift({
            padding: 10
          }),
          size({
            apply({availableWidth, availableHeight, elements}) {
              Object.assign(elements.floating.style, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`,
              });
            },
          }),
        ],
      }).then(({x, y}) => {
        floatingEl.current && Object.assign(floatingEl.current.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
    }
  }

  const cleanup = useRef<() => void>()

  useEffect(() => {
    if (referenceEl) {
      floatingEl.current && (cleanup.current = autoUpdate(
        referenceEl,
        floatingEl.current,
        updatePosition,
      ))
    }
    else if (typeof cleanup.current == "function") {
      cleanup.current()
    }

  }, [referenceEl])

  useClickOutside(floatingEl, onClose, referenceEl)

  return <AnimatePresence>
    { referenceEl && (
      <motion.div
        ref={floatingEl}
        transition={{bounce: 0}}
        initial={{ opacity: .5, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={twMerge(`min-w-[15rem] bg-white shadow-md border rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 !m-0 overflow-auto`, className)}
        {...rest} 
      >{children}</motion.div>
    )}
  </AnimatePresence>
}

export default Menu