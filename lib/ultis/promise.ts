export const usePromise = async ({
  loading, setLoading, callback, successTitle = 'Thành công',
  showSuccessTitle = true, setError
}: {
  loading?: boolean,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<string>>,
  callback: () => Promise<void>,
  successTitle?: string,
  showSuccessTitle?: boolean
}) => {
  try {
    if (loading) return
    if (typeof setLoading == "function")
      setLoading(true)

    await callback()
    
    if (showSuccessTitle) {
      
    }
  } 
  catch (error) {
    let text = error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại sau"

    if (typeof setError == "function") {
      setError(text)
    }
  } 
  finally {
    if (typeof setLoading == "function") {
      setLoading(false)
    }
  }
}

export const useAction = async (callback: () => Promise<any>) => {
  const data = await callback()

  if (data?.error) throw new Error(data.error)

  return data
}