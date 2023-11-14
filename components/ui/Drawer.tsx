"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';

type State = {
  anchor: 'left' | 'right'
  open: boolean
  keepMounted?: boolean
  onClose?: () => void,
  children?: React.ReactNode
}

const Drawer: React.FC<State> = ({anchor, open, onClose, children}) => {
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 w-full h-screen'
            onClick={onClose}
          />
          <motion.div
            initial={{ x: anchor == 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: anchor == 'left' ? '-100%' : '100%' }}
            className='h-full bg-white'
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Drawer