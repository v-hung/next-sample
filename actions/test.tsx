"use server"
import sharp from "sharp"

export const uploadTest = async (formData: FormData) => {
  const file = formData.get('file') as File
  const imageSharp = sharp(await file.arrayBuffer())

  await imageSharp.jpeg().toFile('./storage/asdfb.jpg')
  await imageSharp.webp().toFile('./storage/asdfb.webp')

  return {}
}