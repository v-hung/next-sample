"use server"

import { User } from "@prisma/client";
import { removeSpace } from "@/lib/utils/validator"
import bcrypt from 'bcrypt'
import { exclude } from "@/lib/utils/hepler";
import db from "@/lib/admin/db";
import { auth, signIn, signOut } from "@/auth.config";
import { z } from "zod";
import { AuthError } from "next-auth";

export type UserType = Omit<User, "password">| null

export async function getCurrentUser() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    const userWithoutPassword: UserType = exclude(currentUser, ['password'])

    return userWithoutPassword

  } catch (error: any) {
    return null
  }
}

export const register = async (data: {
  name: string, email: string, password: string
}) => {
  "use server"
  try {
    if (!z.string().email().safeParse(data.email).success) throw "Email không hợp lệ"
    if (!z.string().min(6).safeParse(data.password).success) throw "Mật khẩu không hợp lệ"

    const name = removeSpace(data.name)
    if (!z.string().min(6).max(32).safeParse(data.name).success) throw "Tên không hợp lệ"

    await db.user.create({
      data: {
        email: data.email,
        name: name,
        password: await bcrypt.hash(data.password, 10),
      }
    })
  } catch (error) {
    console.log(error)
    return { error: (typeof error === "string" && error != "") ? error : 'Có lỗi xảy ra vui lòng thử lại sau' }
  }
}

export async function login(...props: Parameters<typeof signIn>): Promise<ReturnType<typeof signIn>> {
  try {
    return await signIn(...props)
  } catch (error) {
    console.log({error})
    let text = 'Có lỗi xảy ra vui lòng thử lại sau'

    if (error instanceof AuthError) {
      text = error.cause?.err?.message || text
    }

    return { error: text }
  }
}

export const logout = () => signOut()