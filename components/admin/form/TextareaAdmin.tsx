"use client"
import React, {FC, InputHTMLAttributes, memo, useId} from 'react'
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string | null | undefined,
  inputClass?: string
}

const TextareaAdmin: FC<Props> = (props) => {
  const { className, label, inputClass, ...rest } = props

  const id = useId()

  return (
    <div className={className}>
      { label ? 
        <label htmlFor={id} className="inline-block text-sm font-medium mb-2 dark:text-white">
          {label} { props.required && <span className="text-red-500">*</span> }
        </label> 
        : null 
      }
      <div className="relative">
        <textarea id={id} className={twMerge('py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600', inputClass)} rows={3} {...rest}></textarea>
      </div>
    </div>
  )
}

export default memo(TextareaAdmin)