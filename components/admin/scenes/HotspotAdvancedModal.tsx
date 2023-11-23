"use client"
import React, { memo, useRef } from 'react'
import { motion, useDragControls } from "framer-motion";

const HotspotAdvancedModal = () => {
  console.log('f asdf sdaf ')

  const constraintsRef = useRef(null)
  const dragControls = useDragControls()

  return (
    <motion.div ref={constraintsRef} className='absolute left-2 top-2 right-2 bottom-12 z-10 flex flex-col justify-end'>
      <motion.div 
        className="w-96 max-h-full bg-white rounded-md overflow-hidden flex flex-col"
        drag
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragListener={false}
      >
        <div className="flex-none p-4 border-b flex items-center justify-between select-none"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <h3>Thêm điểm nóng nâng cao</h3>
          <span className="icon">close</span>
        </div>
        <div className="flex-grow min-h-0 overflow-auto p-4">
          <div className="h-[100vh]"></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default memo(HotspotAdvancedModal)