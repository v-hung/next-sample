"use client"

import ButtonAdmin from "@/components/admin/form/ButtonAdmin"
import DatePickerAdmin from "@/components/admin/form/DatePickerAdmin"
import InputAdmin from "@/components/admin/form/InputAdmin"
import RichTextAdmin from "@/components/admin/form/RichTextAdmin"
import SelectAdmin from "@/components/admin/form/SelectAdmin"
import SlugInputAdmin from "@/components/admin/form/SlugInputAdmin"
import SwitchAdmin from "@/components/admin/form/SwitchAdmin"
import Collapsed from "@/components/ui/Collapsed"
import Dropdown, { Divide, MenuItem, MenuTitle } from "@/components/ui/Dropdown"
import useAlerts from "@/stores/alerts"
import Link from "next/link"
import { useState } from "react"

export default function Home() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-4 max-w-sm h-[500vh] pl-12">
      <div className="h-[50vh]"></div>
      <InputAdmin name='email' id='email' placeholder="Email" startIcon="email" inputClass='bg-gray-100' />

                  <InputAdmin type='password' name='password' id='password' placeholder="Password" startIcon="key" inputClass='bg-gray-100' />
      <DatePickerAdmin />
      {/* <ButtonAdmin endIcon={"expand_more"} onClick={handleClose}>Close</ButtonAdmin> */}
      <Dropdown renderItem={(rest) => (
        <ButtonAdmin {...rest} endIcon={"expand_more"} >Action</ButtonAdmin>
      )} placement="bottom-start">
        <MenuTitle>Settings</MenuTitle>
        <MenuItem LinkComponent={Link} href="/" icon="settings" >adfs</MenuItem>
        <MenuItem LinkComponent={Link} href="/">adfs</MenuItem>
        <MenuItem LinkComponent={Link} href="/">adfs</MenuItem>
        <Divide />
        <MenuItem LinkComponent={Link} href="/">adfs</MenuItem>
        <MenuItem LinkComponent={Link} href="/">adfs</MenuItem>
      </Dropdown>
    </div>
  )
}