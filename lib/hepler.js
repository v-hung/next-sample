export const useAction = async (callback) => {
  try {
    const data = await callback()

    if (data?.error) throw data.error

    return data

  } catch (error) {
    throw typeof error === "string" ? error : "Đã có lỗi xảy ra, vui lòng thử lại sau"
  }
}