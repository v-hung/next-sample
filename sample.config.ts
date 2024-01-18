import PassageFormField from "./components/admin/english/PassageFormField"
import PassageView from "./components/admin/english/PassageView"
import { customDataEnglishCreate, customDataEnglishSelect, formatDataEnglishSelect } from "./components/admin/english/english"
import { SettingGroupSampleType, ConfigSampleType, TableSampleType } from "./types/sample"

const tables: TableSampleType[] = [
  {
    name: 'Tài khoản',
    tableName: 'admin',
    slug: 'users',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'email', label: 'Email', type: 'string', show: true, required: true},
      { name: 'image', label: 'Ảnh', type: 'file', show: true, details: { multiple: false, onlyTable: true }},
      { name: 'role', label: 'Quyền', type: 'relation', show: true, required: true, details: {
        typeRelation: 'many-to-one',
        tableNameRelation: 'role',
        titleRelation: 'name'
      }},
      { name: 'password', label: 'Password', type: 'password', show: false, required: true},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
      { name: 'publish', label: 'Xuất bản', type: 'publish', show: true},
    ]
  },
  {
    name: 'Quyền',
    tableName: 'role',
    slug: 'roles',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'permissions', label: 'Quyền', type: 'permissions', show: false, required: true, col: 12},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
    ]
  },
  {
    name: 'Cài đặt',
    tableName: 'setting',
    slug: 'settings',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
    ]
  },
  {
    name: 'Bài test',
    tableName: 'quiz',
    slug: 'quizzes',
    icon: 'quiz',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'title', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'slug', label: 'Slug', type: 'slug', show: true, details: {
        tableNameSlug: 'title'
      }, required: true },
      { name: 'workTime', label: 'Thời gian làm (phút)', type: 'int', show: true, required: true},
      { name: 'passages', label: 'Đoạn văn', type: 'custom', show: true, required: true, details: {
        customComponentEdit: PassageFormField,
        customComponentView: PassageView,
        customDataCreate: customDataEnglishCreate,
        customDataSelect: customDataEnglishSelect,
        formatDataSelect: formatDataEnglishSelect,
        defaultValue: []
      }, col: 12},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
      { name: 'publish', label: 'Xuất bản', type: 'publish', show: true},
    ],
    orderBy: 'sort',
    orderType: 'asc'
  },
]

const settingsGroups: SettingGroupSampleType[] = [
  { name: "Site", settings: [
    { name: 'site title', label: 'Tiêu đề', type: 'string' },
    { name: 'site description', label: 'Mô tả', type: 'string' },
    { name: 'site logo', label: 'logo', type: 'file', details: {
      multiple: false,
      onlyTable: true,
      fileTypes: ['image']
    }},
    { name: 'site favicon', label: 'Favicon', type: 'file', details: {
      multiple: false,
      onlyTable: true,
      fileTypes: ['image']
    }},
    { name: 'banner', label: 'Banner', type: 'file', details: {
      multiple: false,
      onlyTable: true,
      fileTypes: ['image']
    }, col: 4},
    { name: 'main audio', label: 'Nhạc nền', type: 'file', details: {
      multiple: false,
      onlyTable: true,
      fileTypes: ['audio']
    }, col: 4},
    { name: 'so do', label: 'Sơ đồ (google map)', type: 'string', col: 4 },
  ] },
  { name: "Admin", settings: [
    { name: 'admin title', label: 'Tiêu đề trang quản trị', type: 'string' },
    { name: 'admin description', label: 'Mô tả trang quản trị', type: 'string' },
    { name: 'admin logo', label: 'logo trang quản trị', type: 'file', details: {
      multiple: false,
      onlyTable: true,
      fileTypes: ['image']
    } },
    { name: 'preview mode', label: 'Chế độ xem trước', type: 'bool' },
  ] }
]

const sampleConfig: ConfigSampleType = {
  tables: tables,
  settingsGroups: settingsGroups,
  upload: 'local'
}

export default sampleConfig