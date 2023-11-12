import useAlerts from '@/stores/alerts';
import { AnimatePresence, useIsPresent, motion } from 'framer-motion';
import React from 'react'

const SnackBar = () => {
  const { alerts } = useAlerts()

  return (
    <div className="fixed top-0 right-0 bottom-0 w-full max-w-3xl flex flex-col space-y-4 items-end z-50 pointer-events-none p-4">
      <AnimatePresence>
        {alerts.map((item) => (
          <Item key={item.id} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default SnackBar

const Item = () => {
  const isPresent = useIsPresent()
  
  const animations = {
    initial: { scale: 0, opacity: 0, x: 0 },
    animate: { scale: 1, opacity: 1, x: 0 },
    exit: { scale: 0, opacity: 0, x: 200 }
  }

  return (
    <motion.div {...animations} style={{ position: isPresent ? "static" : "absolute" }} layout>
      <div className="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
        <span className="font-bold">Warning</span> alert! You should check in on some of those fields below.
      </div>
    </motion.div>
  );
};
