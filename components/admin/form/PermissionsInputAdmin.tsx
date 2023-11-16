"use client"
import { TABLES_SAMPLE } from '@/app/admin/(admin)/[slug]/table'
import Checkbox from '@/components/ui/Checkbox'
import { PermissionsOnRoles } from '@prisma/client'
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, memo, useCallback, useMemo } from 'react'

type Props = {
  label?: string | null,
  name?: string
  required?: boolean | null,
  defaultValue?: PermissionsOnRoles[],
  value?: {
    permissionKey: string,
    permissionTableName: string,
  }[],
  onChange?: (data: any) => void
  className?: string,
}

const permissionKeys = ['browse', 'create', 'edit', 'delete', 'image']

const PermissionsInputAdmin: React.FC<Props> = ({
  label,
  name,
  value,
  required,
  onChange,
  className,
  defaultValue,
}) => {
  const handelChange = useCallback((data: string[], tableName: string) => {
    let arOri = (value || []).slice().filter(v => 
      !permissionKeys.some(v2 => v2 == v.permissionKey && v.permissionTableName == tableName))

    let arrAdd = data.map(v => ({
      permissionKey: v,
      permissionTableName: tableName
    }))

    let newValue = [...arOri, ...arrAdd]

    const syntheticEvent: any = {
      target: {
        value: newValue
      },
    };

    onChange?.(syntheticEvent)
  }, [])
  
  const childs = useRef<any[]>([])

  const setChecked = (e: React.MouseEvent<HTMLButtonElement>, check: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    childs.current.forEach(v => v.forwardSetChecked(check))
  }

  const tablesName = TABLES_SAMPLE.map(v => v.tableName)

  const roleValue = useMemo(() => tablesName.map(tableName =>
    (value || []).filter(v => v.permissionTableName === tableName).map(v => v.permissionKey)
  ), [value, tablesName])

  return (
    <div className={className}>
      { label
        ? <p className="block text-sm font-medium mb-2 dark:text-white">{label} { required && <span className="text-red-500">*</span> }</p>
        : null
      }
      {/* <input type="hidden" name={name} value={JSON.stringify(data)} /> */}
      <div className="flex space-x-2 text-sm">
        <button className='text-blue-500' onClick={(e) => setChecked(e, true)}>Chọn tất cả</button>
        <span>/</span>
        <button className='text-blue-500' onClick={(e) => setChecked(e, false)}>Bỏ chọn tất cả</button>
      </div>

      <div className="grid grid-flow-col auto-cols-max gap-4 mt-4">
        {tablesName.map((tableName, index) =>
          <RoleItems 
            key={tableName} 
            tableName={tableName} 
            value={roleValue[index]}
            setValue={(data) => handelChange(data, tableName)}
          />
        )}
      </div>
    </div>
  )
}

const RoleItems = memo(({
  tableName, value, setValue
}: {
  tableName: string, value: string[], setValue: (data: string[]) => void
}) => {
  const handleSelectAll = () => {
    let tempChecked = value.length == permissionKeys.length ? [] : permissionKeys.map(v => v)

    setValue(tempChecked)
  }

  const handleSelect = (e: React.FormEvent<HTMLInputElement>) => {
    const { value: v, checked: isChecked } = e.target as HTMLInputElement

    let tempChecked = isChecked ? [...value, v] : value.filter(item => item !== v)

    setValue(tempChecked)
  }

  return (
    <div className='flex flex-col space-y-2'>
      <Checkbox label={tableName} checked={value.length == permissionKeys.length} onChange={handleSelectAll} />
      <div className="ml-6 flex flex-col space-y-1">
        {permissionKeys.map(v =>
          <Checkbox key={`${tableName}-${v}`} label={`${v} ${tableName}`} value={v} checked={value.includes(v)} onChange={handleSelect} />
        )}
      </div>
    </div>
  )
})

export default memo(PermissionsInputAdmin)