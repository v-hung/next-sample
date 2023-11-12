import db from "@/lib/admin/db"
import { parseDataInString } from "@/lib/ultis/hepler"
import { Setting } from "@prisma/client"

export const getValueSettings = async (settings: Setting[]) => {
  return Promise.all(settings.map(async (v2) => {

    if (v2.type == "file" && v2.value) {
      v2.value = await db.file.findUnique({
        where: {
          id: v2.value
        }
      }) as any
    }

    return {
      ...v2,
      value: parseDataInString(v2.value),
      details: v2.details ? JSON.parse(v2.details) : null
    }
  }))
}

export const getSettingsData = async () => {
  const settings = await db.setting.findMany()

  const data = await getValueSettings(settings)
  return data
}