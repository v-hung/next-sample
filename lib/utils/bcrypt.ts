"use server"

import { compare } from "bcrypt";

export const comparePassword = async (pass: string, currentPass: string) => {
  const isCorrectPassword = await compare(pass, currentPass)
  return isCorrectPassword
}