"use client"

import InputAdmin from "@/components/admin/form/InputAdmin"
import RichTextAdmin from "@/components/admin/form/RichTextAdmin"
import SlugInputAdmin from "@/components/admin/form/SlugInputAdmin"
import SwitchAdmin from "@/components/admin/form/SwitchAdmin"
import Collapsed from "@/components/ui/Collapsed"
import useAlerts from "@/stores/alerts"
import { useState } from "react"

export default function Home() {
  const { addAlert } = useAlerts()

  const [value, setValue] = useState('')

  return (
    <div>
      <button onClick={() => addAlert({type: 'success', message: 'fasd'})}>click</button>
      <RichTextAdmin />
    </div>
  )
}