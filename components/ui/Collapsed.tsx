import React, { HTMLAttributes } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { twMerge } from 'tailwind-merge'

type Props = HTMLAttributes<HTMLDivElement> & {
  open: boolean,
  keepMounted?: boolean,
}

const Collapsed = (props: Props) => {
  const { open, children, keepMounted, className, ...rest } = props

  return (
    <AnimatePresence>
      {(open || keepMounted) && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={open ? {
            height: "auto",
            opacity: 1,
            display: 'block',
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
                delay: 0.15,
              },
            },
          }: {
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
              },
            },
            transitionEnd: {display: 'none'}
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
              },
            },
          }}
          className={twMerge('overflow-hidden', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Collapsed