"use client"

import ButtonAdmin from "@/components/admin/form/ButtonAdmin"
import DatePickerAdmin from "@/components/admin/form/DatePickerAdmin"
import InputAdmin from "@/components/admin/form/InputAdmin"
import RichTextAdmin from "@/components/admin/form/RichTextAdmin"
import SelectAdmin from "@/components/admin/form/SelectAdmin"
import SlugInputAdmin from "@/components/admin/form/SlugInputAdmin"
import SwitchAdmin from "@/components/admin/form/SwitchAdmin"
import Collapsed from "@/components/ui/Collapsed"
import Drawer from "@/components/ui/Drawer"
import Dropdown, { Divide, MenuItem, MenuTitle } from "@/components/ui/Dropdown"
import { Modal } from "@/components/ui/Modal"
import useAlerts from "@/stores/alerts"
import Link from "next/link"
import { useState } from "react"

export default function Home() {

  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 max-w-sm pl-12">
      <ButtonAdmin onClick={() => setOpen(!open)}>Click</ButtonAdmin>
      {/* <Modal open={open} onClose={() => setOpen(false)} action >
        <div className="w-full h-[200vh]"></div>
      </Modal> */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="w-full h-[200vh]"></div>
      </Drawer>
    </div>
  )
}