import { create } from "zustand"

const useSettings = create((set, get) => ({
  settings: [],
  setSettings: (data) => set({
    settings: data
  }),
  findSettingByName: (name) => {
    return get().settings.find(v => v.name == name)?.value || undefined
  }
}))

export default useSettings