"use client"

import useModalStore from "@/stores/web/modal"
import Link, { LinkProps } from "next/link"
import { FC, MouseEvent, ReactNode } from "react"

interface Props extends LinkProps<HTMLButtonElement> {
  children: ReactNode
}

const LinkAuth: FC<Props> = ({ children, ...rest }) => {

  const { setShowLoginModal } = useModalStore()

  const handelClick = (e: MouseEvent) => {
    if (typeof rest.href === 'string' && rest.href.split('/').includes('practice')) {
      setShowLoginModal(true)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <Link {...rest}>{children}</Link>
  )
}

export default LinkAuth