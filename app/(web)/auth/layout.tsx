import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const layout = async ({
  searchParams, children
}: {
  searchParams: never,
  children: ReactNode
}) => {
  const user = await auth()

  if (user) {
    const url = (searchParams as any)?.url || '/'
    redirect(url)
  }

  return <>{children}</>
}

export default layout