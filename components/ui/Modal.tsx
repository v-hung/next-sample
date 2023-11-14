"use client"
import React, { HTMLAttributes } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import ButtonAdmin from '../admin/form/ButtonAdmin';

type State = HTMLAttributes<HTMLDivElement> & {
  anchor: 'left' | 'right'
  open: boolean
  onClose?: () => void,
  children?: React.ReactNode,
  action?: boolean,
  title?: string,
  onSubmit?: () => void,
  contentClass?: string
}

export const Modal: React.FC<State> = (props) => {
  const {anchor, open, onClose, children, action = true, title, onSubmit, className, contentClass, ...rest } = props

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto'
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={twMerge('mt-14 sm:max-w-lg sm:w-full m-3 sm:mx-auto', className)}
            >
              <div className={twMerge("flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]", contentClass)}>
                { action
                  ? <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {title}
                      </h3>
                      <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <span className="sr-only">Close</span>
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                  : null
                }
                
                <div className={action ? 'p-4 overflow-y-auto' : ''}>
                  {children}
                </div>

                { action
                  ? <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                      <ButtonAdmin color='black'>Close</ButtonAdmin>
                      <ButtonAdmin onClick={onSubmit}>Save changes</ButtonAdmin>
                    </div>
                  : null
                }
                
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}