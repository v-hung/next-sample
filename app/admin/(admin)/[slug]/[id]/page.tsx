import AdminContentSampleCreateEdit from '@/components/admin/sample/AdminContentSampleCreateEdit'
import React from 'react'
import { getItemDataSample } from '@/actions/admin/sample'
import { checkPermissions } from '@/lib/admin/fields'
import { getAdmin } from '@/actions/admin/admin'
import sampleConfig from '@/sample.config'

type PageState = {
  params: {
    slug: string,
    id: string
  }
}

export default async ({ params: { id, slug } } : PageState) => {
  const table = sampleConfig.tables.find(v => v.slug == slug)
  const tablesName = sampleConfig.tables.map(v => v.tableName)

  if (table == undefined)
    return <div>Trang không tồn tại</div>

  const admin = await getAdmin()

  if (!checkPermissions(admin?.role.permissions || [], table.tableName, "edit")) {
    return <div>Bạn không có quyền truy cập trang này</div>
  }

  const data = await getItemDataSample({id, tableName: table.tableName})

  if (data == null) {
    return <div className="">Không tìm thấy bản ghi</div>
  }

  return (
    <AdminContentSampleCreateEdit data={data} name={table.name} tableName={table.tableName} columns={table.columns} tablesName={tablesName} />
  )
}