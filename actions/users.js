"use server"

export const getUser = async (error = false) => {
  await new Promise(res => setTimeout(() => res(1), 300))

  const user = { id: 1, name: 'Việt Hùng' }

  if (error) {
    return { error: 'Failed to create' }
  }

  return { user }
}