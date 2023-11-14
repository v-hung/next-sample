"use client"
import useAlerts from "@/stores/alerts"

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
      useAlerts().addAlert({type: 'success', message: successTitle})
    }
  } 
  catch (error) {
    let text = error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại sau"

    useAlerts().addAlert({type: 'error', message: text})

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