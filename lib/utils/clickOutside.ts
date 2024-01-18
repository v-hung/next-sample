import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, cb?: (e: Event) => void, exclude?: HTMLElement | string | null) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if ( (typeof exclude == "string" && document.getElementById(exclude)?.contains(event.target as HTMLElement))
        || (exclude && typeof exclude == "object" && exclude.contains(event.target as HTMLElement))
      ) {
        return
      }

      if (ref.current && !ref.current.contains(event.target as HTMLElement) && !event.defaultPrevented && typeof cb == "function") {
        event.stopPropagation()
        cb(event)
      }
    }
    document.addEventListener("click", handleClickOutside, false)
    document.addEventListener('blur', handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
      document.removeEventListener("blur", handleClickOutside, false)
    };
  }, [ref, exclude])
}

function useResizeObserver<T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref?.current

    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) {
        return;
      }

      const { borderBoxSize, contentBoxSize } = entries[0];

      // Lấy kích thước phù hợp (tùy chọn)
      const size = borderBoxSize?.[0] || contentBoxSize?.[0];

      if (size) {
        callback(element, entries[0]);
      }
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [callback, ref])

  return ref
}

export { useClickOutside, useResizeObserver }