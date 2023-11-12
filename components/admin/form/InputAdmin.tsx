"use client"
import React, {FC, InputHTMLAttributes, useId} from 'react'

type State = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | null | undefined,
}

const InputAdmin: FC<State> = (props) => {
  const { className, label, ...rest } = props

  const id = useId()

  return (
    <div className={className}>
      { label ? 
        <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">
          {label} { props.required && <span className="text-red-500">*</span> }
        </label> 
        : null 
      }
      <input type="text" id={id} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" {...rest} />
    </div>
  )
}

export default InputAdmin