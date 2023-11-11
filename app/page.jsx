"use client"

import { getUser } from "@/actions/users"
import { useAction } from "@/lib/hepler"
import { useState } from "react"

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = async (e, error = false) => {
    e.preventDefault()

    try {
      if (loading) return
      setLoading(true)

      const {user} = await useAction(() => getUser(error))
      setUser(user)

    } catch (error) {
      const text = (typeof error === "string") ? error : 'Có lỗi xảy ra, vui lòng thử lại sau'
      alert(text)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button 
        className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500"
        onClick={(e) => fetch(e)}
      >Click</button>

      <button 
        className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500 ml-2"
        onClick={(e) => fetch(e, true)}
      >Click</button>

      <p>{loading ? 'true' : 'false'}</p>

      { !loading ? user
        ? <div>
          {user.name}
        </div>
        : <div>null</div>
        : <p>Loading...</p>
      }
    </div>
  )
}
