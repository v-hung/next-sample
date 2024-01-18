"use client"

import { MouseEvent, useRef, useState } from "react"
import ButtonAdmin from "./admin/form/ButtonAdmin"
import Menu from "./ui/Menu"

const Test = () => {

  const [referenceEl, setReferenceEl] = useState<HTMLDivElement | null>(null)

  const handelChange = (e: MouseEvent) => {
    setReferenceEl(e.target as HTMLDivElement)
  }

  return (
    <div className="h-[200vh]">
      {/* <div className="h-[50vh]"></div> */}
      <div className="h-[50vh]"></div>
      <div className="flex gap-4">
        <ButtonAdmin onClick={handelChange}>fsdaf asfdsadf</ButtonAdmin>
        <ButtonAdmin variant="outline" onClick={() => setReferenceEl(null)}>stop</ButtonAdmin>
      </div>
      <Menu referenceEl={referenceEl} onClose={() => setReferenceEl(null)} className="w-60 h-40 bg-red-500">
        fasd
      </Menu>
      <div className="h-[50vh]"></div>
    </div>
  )
}

export default Test