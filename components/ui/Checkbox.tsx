import React, { InputHTMLAttributes, useId } from 'react'
import { twMerge } from 'tailwind-merge'

type State = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Checkbox = (props: State) => {
  const { className, label, ...rest } = props
  const id = useId()

  return (
    <div className="flex">
      <input id={id} type="checkbox" className={twMerge("shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800", className)}  {...rest} />
      <label htmlFor={id} className="text-sm text-gray-500 ms-3 dark:text-gray-400">{props.label}</label>
    </div>
  )
}

export default Checkbox