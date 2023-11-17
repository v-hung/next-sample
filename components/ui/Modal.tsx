"use client"
import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import ButtonAdmin from '../admin/form/ButtonAdmin';
import { useClickOutside } from '@/lib/utils/clickOutside';

type State = HTMLAttributes<HTMLDivElement> & {
  open: boolean
  onClose?: () => void,
  action?: boolean,
  title?: string,
  onSubmit?: () => void,
  contentClass?: string,
  className?: string,
  closeTitle?: string,
  submitTitle?: string
}

export const Modal: React.FC<State> = (props) => {
  const {open, onClose, children, action = false, title, onSubmit, className, contentClass,
    closeTitle = 'Close', submitTitle = 'Continue', ...rest
  } = props

  if (typeof window === 'undefined') {
    return null
  }

  const ref = useRef<HTMLDivElement>()

  useClickOutside(ref, () => {
    if (typeof onClose !== "undefined") {
      onClose()
    }
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'initial'
  }, [open])

  return <ModalContext.Provider value={{onClose, closeTitle}}>{
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto flex items-center justify-center bg-black/30 py-8'
          >
              <motion.div
                ref={ref}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className={twMerge('w-full max-w-sm max-h-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]', className)}
                {...rest as any}
              >
                { title
                  ? <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {title}
                      </h3>
                      <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={onClose}
                      >
                        <span className="sr-only">{closeTitle}</span>
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
    )}
  </ModalContext.Provider>
}

export const ModalTitle = (props: HTMLAttributes<HTMLElement>) => {
  const {className, children, ...rest} = props
  const { onClose, closeTitle } = useModalContext()

  return (
    <div className={twMerge("flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700", className)}>
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

export const ModalContent = (props: HTMLAttributes<HTMLElement>) => {
  const {className, children, ...rest} = props
  return (
    <div className={twMerge("flex-grow p-4 overflow-y-auto", className)} {...rest}>
      {children}
    </div>
  )
}

export const ModalAction = (props: HTMLAttributes<HTMLElement>) => {
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

const ModalContext = React.createContext<ContextType>(null);

export const useModalContext = () => {
  const context = React.useContext(ModalContext);

  if (context == null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context
}