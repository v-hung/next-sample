"use client"
import React, {ButtonHTMLAttributes, cloneElement, forwardRef} from 'react'
import { twMerge } from 'tailwind-merge'

type State = ButtonHTMLAttributes<HTMLButtonElement> & {
  endIcon?: React.ReactNode | string,
  startIcon?: React.ReactNode | string
}

const ButtonAdmin = forwardRef<HTMLButtonElement, State>((props, ref ) => {
  const { className, children, startIcon, endIcon, ...rest } = props

  return (
    <button ref={ref} type="button" className={twMerge("py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600", className)} {...rest}>
      { typeof startIcon === "string" ? <span className='icon w-4 h-4 text-lg'>{startIcon}</span> : startIcon }
      {children}
      { typeof endIcon === "string" ? <span className='icon w-4 h-4'>{endIcon}</span> : endIcon }
    </button>
  )
})

export default ButtonAdmin