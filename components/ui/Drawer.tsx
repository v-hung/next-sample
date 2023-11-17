"use client"
import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import ButtonAdmin from '../admin/form/ButtonAdmin';
import { useClickOutside } from '@/lib/utils/clickOutside';

type State = {
  anchor?: 'left' | 'right'
  open: boolean
  onClose?: () => void,
  children?: React.ReactNode,
  className?: string,
  title?: string,
  onSubmit?: () => void,
  contentClass?: string,
  closeTitle?: string,
  submitTitle?: string,
  action?: boolean
}

export const Drawer: React.FC<State> = (props) => {
  if (typeof window === 'undefined') {
    return null
  }

  const {open, onClose, children, action = false, anchor = 'left', 
    title, onSubmit, className, contentClass,
    closeTitle = 'Close', submitTitle = 'Continue', ...rest
  } = props

  const ref = useRef<HTMLDivElement>()

  useClickOutside(ref, () => {
    if (typeof onClose !== "undefined") {
      onClose()
    }
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'initial'
  }, [open])

  return (
    <DrawerContext.Provider value={{onClose}}>{
      createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed top-0 left-0 w-full h-screen bg-black/30 z-[60]'
            >
              <motion.div
                ref={ref}
                initial={{ x: anchor == 'left' ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: anchor == 'left' ? '-100%' : '100%' }}
                transition={{ type: 'tween' }}
                className={twMerge(`max-w-xs w-full h-full flex flex-col bg-white border-s dark:bg-gray-800 dark:border-gray-700 ${anchor == 'right' ? 'float-right' : ''}`, className)}
                {...rest as any}
              >
                { title 
                  ? <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Offcanvas title
                      </h3>
                      <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" 
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <span className="icon">close</span>
                      </button>
                    </div>
                  : null
                }

                {children}

                { action
                  ? <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                      <ButtonAdmin color='white'>{closeTitle}</ButtonAdmin>
                      <ButtonAdmin onClick={onSubmit}>{submitTitle}</ButtonAdmin>
                    </div>
                  : null
                }
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    }</DrawerContext.Provider>
  )
}

export const DrawerTitle = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, children, ...rest} = props
  const { onClose, closeTitle } = useDrawerContext()

  return (
    <div className={twMerge("flex justify-between items-center py-3 px-4 border-b dark:border-gray-700", className)}>
      <h3 className="font-bold text-gray-800 dark:text-white" {...rest}>
        {children}
      </h3>
      <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={onClose}
      >
        <span className="sr-only">{closeTitle}</span>
        <span className="icon">close</span>
      </button>
    </div>
  )
}

export const DrawerContent = (props: HTMLAttributes<HTMLElement>) => {
  const {className, children, ...rest} = props
  return (
    <div className={twMerge("flex-grow min-h-0 p-4 overflow-y-auto", className)} {...rest}>
      {children}
    </div>
  )
}

export const DrawerAction = (props: HTMLAttributes<HTMLElement>) => {
  const {className, children, ...rest} = props
  return (
    <div className={twMerge("flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-gray-700", className)} {...rest}>
      {children}
    </div>
  )
}


/**
 * context modal
 */

type ContextType = {
  onClose?: () => void,
  closeTitle?: string
} | null

const DrawerContext = React.createContext<ContextType>(null);

export const useDrawerContext = () => {
  const context = React.useContext(DrawerContext);

  if (context == null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context
}