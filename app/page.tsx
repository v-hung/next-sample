"use client"
import { Viewer } from '@photo-sphere-viewer/core'
import React, { useEffect, useRef } from 'react'
import "@photo-sphere-viewer/core/index.css"
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter'

const page = () => {
  const viewerHTML = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!viewerHTML.current) return

    const viewer = new Viewer({
      container: viewerHTML.current,
      adapter: EquirectangularTilesAdapter,
      // panorama:  `/_next/image?url=%2Fstorage%2Fasdfb.webp&w=4048&q=75`,
      panorama: {
        width: 6656,
        cols: 8,
        rows: 4,
        baseUrl: `asset/img/abcd-min 1.png`,
        // baseUrl: `/_next/image?url=%2Fstorage%2Fasdfb.webp&w=4048&q=75`,
        tileUrl: (col: any, row: any) => {
          const num = row * 16 + col + 1;
          return `sphere-tiles/image_part_${('000' + num).slice(-3)}.jpg`;
        },
      },
    })

    return () => {
      if(viewer) {
        viewer?.destroy()
      }
    }
  }, [])

  return (
    <div id="viewer" ref={viewerHTML}  className={`w-full h-screen`} />
  )
}

export default page