import { getAdmin } from '@/actions/admin/admin'
import ProfileContentAdmin from '@/components/admin/content/ProfileContentAdmin'
import db from '@/lib/admin/db'
import { redirect } from 'next/navigation'
import React from 'react'

export type UpdateProfileType = {
  name: string,
  email: string,
  imageId?: string,
  password?: string
}

export default async function page() {
  const data = await getAdmin()

  if (data == null) {
    redirect('/admin/login')
  }

  async function updateProfile ({
    name, email, imageId, password
  }: UpdateProfileType) {
    "use server"
    try {
      await db.admin.update({
        where: {
          id: data?.id
        },
        data: {
          name,
          email,
          imageId: imageId || undefined,
          password: password || undefined
        }
      })
  
    } catch (error) {
      console.log(error)
      throw (typeof error === "string" && error != "") ? error : 'Có lỗi xảy ra vui lòng thử lại sau'
    }
  }

  return <ProfileContentAdmin defaultValue={data} updateProfile={updateProfile} />
}