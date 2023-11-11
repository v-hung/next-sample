import { useEffect, useState } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

const NAME = "admin-menu"

const useAdminMenu = create(
  persist<State & Actions>(
    (set, get) => ({
      open: false,
      width: "16rem",
      toggle: (data) => set({
        open: data ? data : !get().open
      })
    }),
    {
      name: NAME,
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAdminMenu