"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

type State = {
  anchor?: 'left' | 'right'
  open: boolean
  onClose?: () => void,
  children?: React.ReactNode,
  className?: string,
  title?: string,
  contentClass?: string,
  
}

const Drawer: React.FC<State> = ({
  anchor = 'left', open, onClose, children, className, contentClass
}) => {

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed top-0 left-0 w-full h-screen bg-black/30'
          onClick={onClose}
        >
          <motion.div
            initial={{ x: anchor == 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: anchor == 'left' ? '-100%' : '100%' }}
            transition={{ type: 'tween' }}
            className={twMerge(`max-w-xs w-full h-full z-[60] bg-white border-s dark:bg-gray-800 dark:border-gray-700 ${anchor == 'right' ? 'float-right' : ''}`, className)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Offcanvas title
              </h3>
              <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" 
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className={twMerge(`flex-grow p-4 overflow-y-auto`, contentClass)}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Drawer