import { create } from "zustand";

const useAdminUser = create(set => ({
  user: null,
  save: (data) => set(state => ({
    user: data
  }))
}))

export default useAdminUser