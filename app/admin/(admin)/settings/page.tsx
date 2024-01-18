import SettingContentAdmin from '@/components/admin/content/SettingContentAdmin'
import React from 'react'
import { checkPermissions } from '@/lib/admin/fields'
import { getAdmin } from '@/actions/admin/admin'
import { getSettings } from '@/actions/admin/settings'
import sampleConfig from '@/sample.config'

async function page() {
  const admin = await getAdmin()

  if (!checkPermissions(admin?.role.permissions || [], "setting", "browse")) {
    return <div>Bạn không có quyền truy cập trang này</div>
  }

  const groupSettings = await getSettings()

  return (
    <SettingContentAdmin groupSettings={groupSettings}
      GROUPS={sampleConfig.settingsGroups}
      canCreate={checkPermissions(admin?.role.permissions || [], "setting", "create")}
      canEdit={checkPermissions(admin?.role.permissions || [], "setting", "edit")}
      canDelete={checkPermissions(admin?.role.permissions || [], "setting", "delete")}
    />
  )
}

export default page