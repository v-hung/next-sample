"use client"
import React, {ButtonHTMLAttributes, cloneElement, forwardRef} from 'react'
import { twMerge } from 'tailwind-merge'

type State = ButtonHTMLAttributes<HTMLButtonElement> & {
  endIcon?: React.ReactNode | string,
  startIcon?: React.ReactNode | string,
  variant?: 'solid' | 'outline' | 'text',
  color?: 'blue' | 'red' | 'yellow' | 'green' | 'black' | 'gray'
}

const ButtonAdmin = forwardRef<HTMLButtonElement, State>((props, ref ) => {
  const { className, children, startIcon, endIcon, variant = 'solid', color = 'blue', ...rest } = props

  const variantColor = colors[color]

  const commonClass = `py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
    ${variant == 'solid' ? variantColor.solid : variant == 'outline' ? variantColor.outline : variantColor.text }
  `

  return (
    <button ref={ref} type="button" className={twMerge(commonClass, className)} {...rest}>
      { typeof startIcon === "string" ? <span className='icon w-4 h-4 text-lg'>{startIcon}</span> : startIcon }
      {children}
      { typeof endIcon === "string" ? <span className='icon w-4 h-4'>{endIcon}</span> : endIcon }
    </button>
  )
})

export default ButtonAdmin

const colors: Record<NonNullable<State['color']>, { solid: string, outline: string, text: string }> = {
  'blue': {
    solid: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600',
    text: 'text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400'
  },
  'red': {
    solid: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-red-600 hover:text-red-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-red-500 dark:hover:border-red-600',
    text: 'text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400'
  },
  'yellow': {
    solid: 'bg-yellow-600 text-white hover:bg-yellow-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-yellow-600 hover:text-yellow-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-yellow-500 dark:hover:border-yellow-600',
    text: 'text-yellow-600 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-400'
  },
  'green': {
    solid: 'bg-green-600 text-white hover:bg-green-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-green-600 hover:text-green-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-green-500 dark:hover:border-green-600',
    text: 'text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400'
  },
  'black': {
    solid: 'bg-black-600 text-white hover:bg-black-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-black-600 hover:text-black-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-black-500 dark:hover:border-black-600',
    text: 'text-black-600 hover:text-black-800 dark:text-black-500 dark:hover:text-black-400'
  },
  'gray': {
    solid: 'bg-gray-600 text-white hover:bg-gray-700 border-transparent',
    outline: 'border-gray-200 text-gray-500 hover:border-gray-600 hover:text-gray-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-500 dark:hover:border-gray-600',
    text: 'text-gray-600 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-400'
  }
}