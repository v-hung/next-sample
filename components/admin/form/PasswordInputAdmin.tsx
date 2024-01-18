"use client"
import React, { FC, InputHTMLAttributes, useId, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | null | undefined,
}

const PasswordInputAdmin: FC<Props> = (props) => {
  const { className, label, ...rest } = props

  const id = useId()

  const [show, setShow] = useState(false)

  return (
    <div className={className}>
      { label ? 
        <label htmlFor={id} className="inline-block text-sm font-medium mb-2 dark:text-white">
          {label} { props.required && <span className="text-red-500">*</span> }
        </label> 
        : null 
      }
      <div className="relative">
        <input type={show ? 'text' : 'password'} id={id} className="py-3 px-4 pr-8 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" {...rest} />
        <span 
          className='icon absolute right-2 top-1/2 -translate-y-1/2 text-xl cursor-pointer select-none'
          onClick={() => setShow(state => !state)}
        >{show ? 'visibility' : 'visibility_off'}</span>
      </div>
    </div>
  )
}

export default PasswordInputAdmin