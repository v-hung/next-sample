import { create } from "zustand"

type State = {
  showLoginModal: boolean
}

type Actions = {
  setShowLoginModal: (data: boolean) => void
}

const useModalStore = create<State & Actions>(set => ({
  showLoginModal: false,
  setShowLoginModal: (data) => set({
    showLoginModal: data
  }),
})
)

export default useModalStore