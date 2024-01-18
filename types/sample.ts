import { SampleColumnsType, SampleFieldAndDetailsType } from "@/actions/admin/sample"

export type TableSampleType = {
  name: string,
  tableName: string,
  slug?: string,
  icon?: string,
  rowsPerPages: number[],
  columns: SampleColumnsType[]
  orderBy?: string,
  orderType?: 'asc' | 'desc'
}

export type SettingGroupSampleType = {
  name: string,
  label?: string,
  settings: ({
    name: string,
    label?: string,
    col?: number
  } & SampleFieldAndDetailsType)[]
}

export type ConfigSampleType = {
  tables: TableSampleType[],
  settingsGroups: SettingGroupSampleType[],
  upload: 'local' | 'vercle'
}