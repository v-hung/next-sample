"use client"
import { HTMLAttributes, useContext, createContext, useState, useId, Dispatch, SetStateAction, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Collapsed from './Collapsed'

export const AccordionGroup = (props: HTMLAttributes<HTMLElement>) => {
  const { ...rest } = props
  
  const [groupId, setGroupId] = useState<string | null>(null)

  return (
    <AccrdionGroupContext.Provider value={{groupId, setGroupId}} {...rest} />
  )
}

type AccordionType = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  expanded?: boolean
  onChange?: (isExpanded: boolean) => void
}

export const Accordion = (props: AccordionType) => {
  const { className, expanded, onChange, children, ...rest } = props
  const id = useId()
  
  return (
    <AccrdionContext.Provider value={{id, expanded, onChange}}>
      <div className="bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700" id={id}>
        {children}
      </div>
    </AccrdionContext.Provider>
  )
}

type AccordionTitleProps = HTMLAttributes<HTMLElement> & {
  renderItem?: (active: boolean) => ReactNode
}

export const AccordionTitle = (props: AccordionTitleProps) => {
  const { className, children, renderItem, ...rest } = props

  const { id, expanded, onChange } = useAccrdionContext()
  const { groupId, setGroupId } = useAccrdionGroupContext()
  const active = expanded ?? id == groupId
  
  return (
    <button type='button' className={twMerge(`outline-none inline-flex items-center gap-x-3 w-full font-semibold text-start  py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none  dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400 ${active ? 'text-blue-600 dark:text-blue-500' : 'text-gray-800 dark:text-gray-200'}`, className)}
      onClick={() => onChange ? onChange(!active) : setGroupId(active ? null : id) }
    >
      {children}
      { renderItem && renderItem(active) }
      <span className="icon w-4 h-4 text-xl">{active ? 'remove' : 'add'}</span>
    </button>
  )
}

export const AccordionContent = (props: HTMLAttributes<HTMLElement>) => {
  const { className, children, ...rest } = props
  
  const { id, expanded } = useAccrdionContext()
  const { groupId } = useAccrdionGroupContext()
  const active = expanded ?? id == groupId

  return (
    <Collapsed keepMounted open={active}>
      <div className={twMerge("pb-4 px-5", className)}>{children}</div>
    </Collapsed>
  )
}

/**
 * context modal
 */

type ContextType = {
  groupId: string | null
  setGroupId: Dispatch<SetStateAction<string | null>>
} | null

const AccrdionGroupContext = createContext<ContextType>(null);

export const useAccrdionGroupContext = () => {
  const context = useContext(AccrdionGroupContext);

  if (context == null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context
}

type AccrdionContextType = {
  id: string | null
  expanded?: boolean,
  onChange?: (isExpanded: boolean) => void
} | null

const AccrdionContext = createContext<AccrdionContextType>(null);

export const useAccrdionContext = () => {
  const context = useContext(AccrdionContext);

  if (context == null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context
}